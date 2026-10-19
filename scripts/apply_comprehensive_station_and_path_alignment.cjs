/**
 * apply_comprehensive_station_and_path_alignment.cjs
 * 駅位置補正と、接続する軌道パスの幾何平滑化（折れ曲がり・アプローチ補正）を
 * 完全かつ安全に一括適用するスクリプト
 */

const fs = require('fs');
const path = require('path');
const { updateSegmentCoordinates } = require('./safe_track_updater.cjs');

const LINES_DIR = path.join(__dirname, '../src/data/lines');

// 駅座標の置換ヘルパー
function updateStationLocation(lineId, stationId, newLat, newLng) {
  const filePath = path.join(LINES_DIR, lineId, 'stations.ts');
  if (!fs.existsSync(filePath)) return false;

  let content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`(["']?id["']?\\s*:\\s*['"]${stationId}['"][\\s\\S]*?)(["']?lat["']?\\s*:\\s*)([0-9.]+)([\\s\\S]*?)(["']?lng["']?\\s*:\\s*)([0-9.]+)`);
  const match = regex.exec(content);
  if (!match) return false;

  const updated = match[1] + match[2] + newLat + match[4] + match[5] + newLng;
  content = content.replace(match[0], updated);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

// 統合補正ルール一覧
const RULES = [
  // 1. 和光市 (TJ-11)
  {
    name: '和光市 (東武東上線)',
    lineId: 'tojo',
    stationId: 'TJ-11',
    targetCoord: [35.7883529, 139.6128678],
    segments: [
      {
        from: 'TJ-10',
        to: 'TJ-11',
        smoothFn: (coords) => {
          // 末尾の旧点54（西側出っ張り点）を除去・最適化し、同一直線で新和光市駅ホームへ滑らかに進入
          const res = [...coords];
          const last = res.length - 1;
          res[last - 1] = [35.788061, 139.613396];
          res[last] = [35.7883529, 139.6128678];
          return res;
        },
      },
      {
        from: 'TJ-11',
        to: 'TJ-12',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7883529, 139.6128678];
          return res;
        },
      },
    ],
  },

  // 2. 小竹向原 (SI-37: 西武有楽町線)
  {
    name: '小竹向原 (西武有楽町線)',
    lineId: 'seibu_yurakucho',
    stationId: 'SI-37',
    targetCoord: [35.7429781, 139.6807045],
    segments: [
      {
        from: 'SI-37',
        to: 'SI-38',
        smoothFn: (coords) => {
          // 先頭にメトロ共通ホームを配置し、中間点を通って新桜台トンネルへ滑らかに結ぶ
          const res = [...coords];
          res[0] = [35.7429781, 139.6807045];
          // 点0と点1の間に有楽町線トンネル平行中間点を挿入
          res.splice(1, 0, [35.743367, 139.679685]);
          return res;
        },
      },
    ],
  },

  // 3. 小竹向原 (F-06: 副都心線)
  {
    name: '小竹向原 (副都心線)',
    lineId: 'fukutoshin',
    stationId: 'F-06',
    targetCoord: [35.7429781, 139.6807045],
    segments: [
      {
        from: 'F-05',
        to: 'F-06',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.7429781, 139.6807045];
          return res;
        },
      },
      {
        from: 'F-06',
        to: 'F-07',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7429781, 139.6807045];
          return res;
        },
      },
    ],
  },

  // 4. 東京 (JO-19: 横須賀線総武地下ホーム)
  {
    name: '東京(総武地下) (横須賀線)',
    lineId: 'yokosuka',
    stationId: 'JO-19',
    targetCoord: [35.6818223, 139.7655658],
    segments: [
      {
        from: 'JO-19',
        to: 'JO-18',
        smoothFn: (coords) => {
          // 先頭点0を総武地下ホームに置き換え、点1を丸の内地下トンネル中間点に更新
          const res = [...coords];
          res[0] = [35.6818223, 139.7655658];
          res[1] = [35.680860, 139.766130];
          return res;
        },
      },
    ],
  },

  // 5. 松本 (OIE-01: 大糸東線)
  {
    name: '松本 (大糸東線)',
    lineId: 'oito_east',
    stationId: 'OIE-01',
    targetCoord: [36.230739, 137.9643862],
    segments: [
      {
        from: 'OIE-01',
        to: 'OIE-02',
        smoothFn: (coords) => {
          // 先頭点0を松本駅に、点1を北北西への自然な発車点に更新
          const res = [...coords];
          res[0] = [36.230739, 137.9643862];
          res[1] = [36.231250, 137.964040];
          return res;
        },
      },
    ],
  },

  // 6. 拝島 (HA-04: 八高線)
  {
    name: '拝島 (八高線)',
    lineId: 'hachiko',
    stationId: 'HA-04',
    targetCoord: [35.7211908, 139.3434833],
    segments: [
      {
        from: 'HA-03',
        to: 'HA-04',
        smoothFn: (coords) => {
          const res = [...coords];
          const last = res.length - 1;
          res[last - 1] = [35.721040, 139.343838];
          res[last] = [35.7211908, 139.3434833];
          return res;
        },
      },
      {
        from: 'HA-04',
        to: 'HA-05',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7211908, 139.3434833];
          res[1] = [35.721420, 139.343550];
          return res;
        },
      },
    ],
  },

  // 7. 拝島 (JC-55: 五日市線)
  {
    name: '拝島 (五日市線)',
    lineId: 'itsukaichi',
    stationId: 'JC-55',
    targetCoord: [35.7211908, 139.3434833],
    segments: [
      {
        from: 'JC-55',
        to: 'JC-81',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7211908, 139.3434833];
          return res;
        },
      },
    ],
  },

  // 8. 立川 (JC-19: 青梅線)
  {
    name: '立川 (青梅線)',
    lineId: 'ome',
    stationId: 'JC-19',
    targetCoord: [35.697771, 139.413715],
    segments: [
      {
        from: 'JC-19',
        to: 'JC-51',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.697771, 139.413715];
          res.splice(1, 0, [35.697920, 139.413380]); // 渡り線中間点を補間
          return res;
        },
      },
    ],
  },

  // 9. 長野 (SRK-01: 北しなの線)
  {
    name: '長野 (北しなの線)',
    lineId: 'kita_shinano',
    stationId: 'SRK-01',
    targetCoord: [36.643211, 138.1884854],
    segments: [
      {
        from: 'SRK-01',
        to: 'SRK-02',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [36.643211, 138.1884854];
          res.splice(1, 0, [36.643550, 138.189050]); // 滑らかな発車補間点
          return res;
        },
      },
    ],
  },

  // 10. 高崎 (HA-24: 八高線)
  {
    name: '高崎 (八高線)',
    lineId: 'hachiko',
    stationId: 'HA-24',
    targetCoord: [36.3223687, 139.0126097],
    segments: [
      {
        from: 'HA-23',
        to: 'HA-24',
        smoothFn: (coords) => {
          const res = [...coords];
          const last = res.length - 1;
          res[last] = [36.3223687, 139.0126097];
          return res;
        },
      },
    ],
  },

  // 11. 犀潟 (HK-12: ほくほく線)
  {
    name: '犀潟 (ほくほく線)',
    lineId: 'hokuhoku',
    stationId: 'HK-12',
    targetCoord: [37.210345, 138.305154],
    segments: [
      {
        from: 'HK-11',
        to: 'HK-12',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [37.210345, 138.305154];
          return res;
        },
      },
    ],
  },

  // 12. 六日町 (HK-01: ほくほく線)
  {
    name: '六日町 (ほくほく線)',
    lineId: 'hokuhoku',
    stationId: 'HK-01',
    targetCoord: [37.0670998, 138.8759378],
    segments: [
      {
        from: 'HK-01',
        to: 'HK-02',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [37.0670998, 138.8759378];
          res[1] = [37.067470, 138.876010];
          return res;
        },
      },
    ],
  },

  // 13. 小出 (TD-36: 只見線)
  {
    name: '小出 (只見線)',
    lineId: 'tadami',
    stationId: 'TD-36',
    targetCoord: [37.2335257, 138.9534583],
    segments: [
      {
        from: 'TD-35',
        to: 'TD-36',
        smoothFn: (coords) => {
          const res = [...coords];
          const last = res.length - 1;
          // 点58 [37.2343542, 138.9531183] から中間点 [37.233940, 138.953288] を経由して小出駅ホーム [37.2335257, 138.9534583] へ同一直線で進入
          res[last - 1] = [37.233940, 138.953288];
          res[last] = [37.2335257, 138.9534583];
          return res;
        },
      },
    ],
  },

  // 14. 直江津 (ETM-10: 妙高はねうま, ETH-13: 日本海ひすい)
  {
    name: '直江津 (妙高はねうま)',
    lineId: 'myoko_haneuma',
    stationId: 'ETM-10',
    targetCoord: [37.170251, 138.242265],
    segments: [
      {
        from: 'ETM-09',
        to: 'ETM-10',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [37.170251, 138.242265];
          return res;
        },
      },
    ],
  },
  {
    name: '直江津 (日本海ひすい)',
    lineId: 'nihonkai_hisui',
    stationId: 'ETH-13',
    targetCoord: [37.170251, 138.242265],
    segments: [
      {
        from: 'ETH-12',
        to: 'ETH-13',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [37.170251, 138.242265];
          return res;
        },
      },
    ],
  },

  // 15. 塩尻 (CO-61: 中央本線)
  {
    name: '塩尻 (中央本線)',
    lineId: 'chuo_main',
    stationId: 'CO-61',
    targetCoord: [36.1144795, 137.9475995],
    segments: [
      {
        from: 'CO-60',
        to: 'CO-61',
        smoothFn: (coords) => {
          const res = [...coords];
          const last = res.length - 1;
          res[last - 1] = [36.114220, 137.947750];
          res[last] = [36.1144795, 137.9475995];
          return res;
        },
      },
    ],
  },

  // 16. 新藤原 (YAG-01: 野岩鉄道)
  {
    name: '新藤原 (野岩鉄道)',
    lineId: 'yagan',
    stationId: 'YAG-01',
    targetCoord: [36.8524603, 139.7329134],
    segments: [
      {
        from: 'YAG-01',
        to: 'YAG-02',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [36.8524603, 139.7329134];
          res[1] = [36.852750, 139.732980];
          return res;
        },
      },
    ],
  },

  // 17. 会津高原尾瀬口 (AIZ-01: 会津鉄道)
  {
    name: '会津高原尾瀬口 (会津鉄道)',
    lineId: 'aizu',
    stationId: 'AIZ-01',
    targetCoord: [37.0900108, 139.7053594],
    segments: [
      {
        from: 'AIZ-01',
        to: 'AIZ-02',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [37.0900108, 139.7053594];
          return res;
        },
      },
    ],
  },

  // 18. 東武動物公園 (TSK-30: 東武日光線)
  {
    name: '東武動物公園 (東武日光線)',
    lineId: 'tobu_nikko',
    stationId: 'TSK-30',
    targetCoord: [36.0246822, 139.7267148],
    segments: [
      {
        from: 'TSK-30',
        to: 'TN-01',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [36.0246822, 139.7267148];
          return res;
        },
      },
    ],
  },

  // 19. 下今市 (TN-23: 東武日光線)
  {
    name: '下今市 (東武日光線)',
    lineId: 'tobu_nikko',
    stationId: 'TN-23',
    targetCoord: [36.7256575, 139.6926346],
    segments: [
      {
        from: 'TN-22',
        to: 'TN-23',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [36.7256575, 139.6926346];
          return res;
        },
      },
      {
        from: 'TN-23',
        to: 'TN-24',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [36.7256575, 139.6926346];
          return res;
        },
      },
    ],
  },

  // 20. 羽沢横浜国大 (SO-51: 相鉄新横浜線)
  {
    name: '羽沢横浜国大 (相鉄新横浜線)',
    lineId: 'sotetsu_shin_yokohama',
    stationId: 'SO-51',
    targetCoord: [35.4812978, 139.5862267],
    segments: [
      {
        from: 'SO-52',
        to: 'SO-51',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.4812978, 139.5862267];
          return res;
        },
      },
      {
        from: 'SO-51',
        to: 'SO-08',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.4812978, 139.5862267];
          return res;
        },
      },
    ],
  },

  // 21. 上野 (JU-02: 宇都宮線)
  {
    name: '上野 (宇都宮線)',
    lineId: 'utsunomiya',
    stationId: 'JU-02',
    targetCoord: [35.7134394, 139.7764768],
    segments: [
      {
        from: 'JU-02',
        to: 'JU-03',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7134394, 139.7764768];
          res[1] = [35.7135518, 139.7765525];
          res[2] = [35.7140785, 139.7769091];
          return res;
        },
      },
    ],
  },

  // 22. 尾久 (JU-03: 宇都宮線)
  {
    name: '尾久 (宇都宮線)',
    lineId: 'utsunomiya',
    stationId: 'JU-03',
    targetCoord: [35.7469489, 139.7536899],
    segments: [
      {
        from: 'JU-02',
        to: 'JU-03',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.7469489, 139.7536899];
          return res;
        },
      },
      {
        from: 'JU-03',
        to: 'JU-04',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7469489, 139.7536899];
          return res;
        },
      },
    ],
  },

  // 23. 赤羽 (JU-04: 宇都宮線)
  {
    name: '赤羽 (宇都宮線)',
    lineId: 'utsunomiya',
    stationId: 'JU-04',
    targetCoord: [35.7780922, 139.7206948],
    segments: [
      {
        from: 'JU-03',
        to: 'JU-04',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.7780922, 139.7206948];
          return res;
        },
      },
      {
        from: 'JU-04',
        to: 'JU-05',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7780922, 139.7206948];
          return res;
        },
      },
    ],
  },

  // 24. 浦和 (JS-23: 湘南新宿ライン)
  {
    name: '浦和 (湘南新宿ライン)',
    lineId: 'shonan_shinjuku',
    stationId: 'JS-23',
    targetCoord: [35.8589661, 139.6571243],
    segments: [
      {
        from: 'JS-24',
        to: 'JS-23',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.8589661, 139.6571243];
          return res;
        },
      },
      {
        from: 'JS-23',
        to: 'JS-22',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.8589661, 139.6571243];
          return res;
        },
      },
    ],
  },

  // 25. 大宮 (JU-07: 宇都宮線, JS-24: 湘南新宿ライン)
  {
    name: '大宮 (宇都宮線)',
    lineId: 'utsunomiya',
    stationId: 'JU-07',
    targetCoord: [35.9063522, 139.6242153],
    segments: [
      {
        from: 'JU-06',
        to: 'JU-07',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.9063522, 139.6242153];
          return res;
        },
      },
      {
        from: 'JU-07',
        to: 'JU-08',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.9063522, 139.6242153];
          return res;
        },
      },
    ],
  },
  {
    name: '大宮 (湘南新宿ライン)',
    lineId: 'shonan_shinjuku',
    stationId: 'JS-24',
    targetCoord: [35.9063522, 139.6242153],
    segments: [
      {
        from: 'JS-24',
        to: 'JS-23',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.9063522, 139.6242153];
          return res;
        },
      },
    ],
  },

  // 26. 横浜 (JS-08: 湘南新宿ライン)
  {
    name: '横浜 (湘南新宿ライン)',
    lineId: 'shonan_shinjuku',
    stationId: 'JS-08',
    targetCoord: [35.4657932, 139.6222892],
    segments: [
      {
        from: 'JS-15',
        to: 'JS-08',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.4657932, 139.6222892];
          return res;
        },
      },
      {
        from: 'JS-08',
        to: 'JS-03',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.4657932, 139.6222892];
          return res;
        },
      },
    ],
  },

  // 27. 戸塚 (JS-03: 湘南新宿ライン)
  {
    name: '戸塚 (湘南新宿ライン)',
    lineId: 'shonan_shinjuku',
    stationId: 'JS-03',
    targetCoord: [35.400582, 139.5342993],
    segments: [
      {
        from: 'JS-08',
        to: 'JS-03',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.400582, 139.5342993];
          return res;
        },
      },
      {
        from: 'JS-03',
        to: 'JS-01',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.400582, 139.5342993];
          return res;
        },
      },
    ],
  },

  // 28. 大船 (JS-01: 湘南新宿ライン)
  {
    name: '大船 (湘南新宿ライン)',
    lineId: 'shonan_shinjuku',
    stationId: 'JS-01',
    targetCoord: [35.3543387, 139.5313165],
    segments: [
      {
        from: 'JS-03',
        to: 'JS-01',
        smoothFn: (coords) => {
          // 東海道線大船駅進入曲線に完全同期
          const res = [...coords];
          const last = res.length - 1;
          res[last - 2] = [35.35455075, 139.53138635];
          res[last - 1] = [35.3544263, 139.5313362];
          res[last] = [35.3543387, 139.5313165];
          return res;
        },
      },
    ],
  },

  // 29. 常磐緩行線 松戸 (JL-22)
  {
    name: '松戸 (常磐緩行線)',
    lineId: 'joban_local',
    stationId: 'JL-22',
    targetCoord: [35.7845283, 139.9004334],
    segments: [
      {
        from: 'JL-21',
        to: 'JL-22',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.7845283, 139.9004334];
          return res;
        },
      },
      {
        from: 'JL-22',
        to: 'JL-23',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.7845283, 139.9004334];
          return res;
        },
      },
    ],
  },

  // 30. 常磐緩行線 柏 (JL-28)
  {
    name: '柏 (常磐緩行線)',
    lineId: 'joban_local',
    stationId: 'JL-28',
    targetCoord: [35.8623843, 139.9709425],
    segments: [
      {
        from: 'JL-27',
        to: 'JL-28',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.8623843, 139.9709425];
          return res;
        },
      },
      {
        from: 'JL-28',
        to: 'JL-29',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.8623843, 139.9709425];
          return res;
        },
      },
    ],
  },

  // 31. 常磐緩行線 我孫子 (JL-30)
  {
    name: '我孫子 (常磐緩行線)',
    lineId: 'joban_local',
    stationId: 'JL-30',
    targetCoord: [35.8729998, 140.0107446],
    segments: [
      {
        from: 'JL-29',
        to: 'JL-30',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.8729998, 140.0107446];
          return res;
        },
      },
      {
        from: 'JL-30',
        to: 'JL-31',
        smoothFn: (coords) => {
          const res = [...coords];
          res[0] = [35.8729998, 140.0107446];
          res[1] = [35.872850, 140.011550];
          return res;
        },
      },
    ],
  },

  // 32. 常磐緩行線 取手 (JL-32)
  {
    name: '取手 (常磐緩行線)',
    lineId: 'joban_local',
    stationId: 'JL-32',
    targetCoord: [35.8956226, 140.0627766],
    segments: [
      {
        from: 'JL-31',
        to: 'JL-32',
        smoothFn: (coords) => {
          const res = [...coords];
          res[res.length - 1] = [35.8956226, 140.0627766];
          return res;
        },
      },
    ],
  },
];

function main() {
  console.log('======================================================');
  console.log(` 駅座標補正＆接続パス幾何平滑化 一括処理を開始 (全${RULES.length}ルール)`);
  console.log('======================================================');

  let stationUpdatedCount = 0;
  let segmentUpdatedCount = 0;

  for (const rule of RULES) {
    // 1. stations.ts の駅座標を更新
    const [newLat, newLng] = rule.targetCoord;
    const stOk = updateStationLocation(rule.lineId, rule.stationId, newLat, newLng);
    if (stOk) {
      stationUpdatedCount++;
      console.log(`  📍 [駅更新] ${rule.name} -> [${newLat}, ${newLng}]`);
    } else {
      console.warn(`  ⚠️ [駅スキップ/未検出] ${rule.name}`);
    }

    // 2. trackGeometry.ts の接続セグメントを更新＆平滑化
    const trackPath = path.join(LINES_DIR, rule.lineId, 'trackGeometry.ts');
    for (const seg of rule.segments) {
      const segOk = updateSegmentCoordinates(trackPath, seg.from, seg.to, seg.smoothFn);
      if (segOk) {
        segmentUpdatedCount++;
        console.log(`     線路平滑化: [${rule.lineId}] ${seg.from} -> ${seg.to}`);
      } else {
        console.warn(`     ⚠️ 線路未検出: [${rule.lineId}] ${seg.from} -> ${seg.to}`);
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(` 完了サマリー: 駅更新 ${stationUpdatedCount} 箇所, セグメント更新 ${segmentUpdatedCount} 箇所`);
  console.log(`======================================================`);
}

main();
