/**
 * safe_track_updater.cjs
 * trackGeometry.ts ファイルをセグメント単位で安全に更新するモジュール
 */

const fs = require('fs');

/**
 * trackGeometry.ts から指定された (fromStationId, toStationId) のセグメントを見つけ、
 * coordinates を更新して書き戻す安全な関数
 */
function updateSegmentCoordinates(filePath, fromStationId, toStationId, updateCoordsFn) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // セグメント配列の開始 '[' を探す
  const arrayStart = content.indexOf('= [');
  if (arrayStart === -1) {
    throw new Error(`Array start not found in ${filePath}`);
  }

  // 各セグメントオブジェクトの正確な位置を深度カウントで抽出
  let pos = arrayStart + 2;
  let targetSeg = null;

  while (pos < content.length) {
    const objStart = content.indexOf('{', pos);
    if (objStart === -1) break;

    // 対応する閉じる '}' を探す
    let depth = 0;
    let inString = false;
    let quoteChar = '';
    let objEnd = -1;

    for (let i = objStart; i < content.length; i++) {
      const ch = content[i];
      if (inString) {
        if (ch === quoteChar && content[i - 1] !== '\\') {
          inString = false;
        }
      } else {
        if (ch === '"' || ch === "'") {
          inString = true;
          quoteChar = ch;
        } else if (ch === '{') {
          depth++;
        } else if (ch === '}') {
          depth--;
          if (depth === 0) {
            objEnd = i;
            break;
          }
        }
      }
    }

    if (objEnd === -1) break;

    const blockText = content.substring(objStart, objEnd + 1);

    // fromStationId と toStationId を確認
    const fromMatch = /"fromStationId"\s*:\s*"([^"]+)"/.exec(blockText);
    const toMatch = /"toStationId"\s*:\s*"([^"]+)"/.exec(blockText);

    if (fromMatch && toMatch && fromMatch[1] === fromStationId && toMatch[1] === toStationId) {
      targetSeg = {
        objStart,
        objEnd,
        blockText,
      };
      break;
    }

    pos = objEnd + 1;
  }

  if (!targetSeg) {
    return false; // セグメントが見つからない
  }

  // 対象セグメントの coordinates 配列を抽出
  const coordsStart = targetSeg.blockText.indexOf('"coordinates"');
  if (coordsStart === -1) return false;

  const bracketStart = targetSeg.blockText.indexOf('[', coordsStart);
  let depth = 0;
  let bracketEnd = -1;
  for (let i = bracketStart; i < targetSeg.blockText.length; i++) {
    if (targetSeg.blockText[i] === '[') depth++;
    else if (targetSeg.blockText[i] === ']') {
      depth--;
      if (depth === 0) {
        bracketEnd = i;
        break;
      }
    }
  }

  if (bracketEnd === -1) return false;

  const oldCoordsBody = targetSeg.blockText.substring(bracketStart, bracketEnd + 1);

  // 座標をパース
  const coords = [];
  const cRegex = /\[\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\]/g;
  let m;
  while ((m = cRegex.exec(oldCoordsBody)) !== null) {
    coords.push([parseFloat(m[1]), parseFloat(m[2])]);
  }

  // ユーザー定義関数で座標を更新
  const newCoords = updateCoordsFn(coords);

  // 新しい coordinates 文字列を生成
  const newCoordsBody = '[\n' + newCoords.map(c => `      [\n        ${c[0]},\n        ${c[1]}\n      ]`).join(',\n') + '\n    ]';

  // targetSeg.blockText を置換
  const newBlockText = targetSeg.blockText.substring(0, bracketStart) + newCoordsBody + targetSeg.blockText.substring(bracketEnd + 1);

  // 全体 content を置換
  const newContent = content.substring(0, targetSeg.objStart) + newBlockText + content.substring(targetSeg.objEnd + 1);

  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

module.exports = { updateSegmentCoordinates };
