const fs = require('fs');
const path = require('path');
const { LINES_STATIONS_CONFIG } = require('./common/tobuLinesStationConfigs.cjs');

const probed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/tobu_yahoo_probed.json'), 'utf8'));

// 路線設定
const LINE_METAS = {
  tobu_skytree: {
    name: '東武スカイツリーライン',
    railName: '東武スカイツリーライン',
    defaultCars: 10,
    outGid: '2661',
    inGid: '2660',
  },
  tobu_isesaki: {
    name: '東武伊勢崎線',
    railName: '東武伊勢崎線',
    defaultCars: 8,
    outGid: '7671',
    inGid: '7670',
  },
  tobu_kameido: {
    name: '東武亀戸線',
    railName: '東武亀戸線',
    defaultCars: 2,
    outGid: '2681',
    inGid: '2680',
  },
  tobu_daishi: {
    name: '東武大師線',
    railName: '東武大師線',
    defaultCars: 2,
    outGid: '2691',
    inGid: '2690',
  },
  tobu_sano: {
    name: '東武佐野線',
    railName: '東武佐野線',
    defaultCars: 3,
    outGid: '2701',
    inGid: '2700',
  },
  tobu_koizumi: {
    name: '東武小泉線',
    railName: '東武小泉線',
    defaultCars: 2,
    outGid: '2721',
    inGid: '2720',
  },
  tobu_kiryu: {
    name: '東武桐生線',
    railName: '東武桐生線',
    defaultCars: 3,
    outGid: '2711',
    inGid: '2710',
  },
  tobu_nikko: {
    name: '東武日光線',
    railName: '東武日光線',
    defaultCars: 6,
    outGid: '2741',
    inGid: '2740',
  },
  tobu_utsunomiya: {
    name: '東武宇都宮線',
    railName: '東武宇都宮線',
    defaultCars: 4,
    outGid: '2751',
    inGid: '2750',
  },
  tobu_kinugawa: {
    name: '東武鬼怒川線',
    railName: '東武鬼怒川線',
    defaultCars: 6,
    outGid: '2761',
    inGid: '2760',
  },
  tobu_urban_park: {
    name: '東武アーバンパークライン',
    railName: '東武アーバンパークライン',
    defaultCars: 6,
    outGid: '2771', // 大宮〜柏: 2771/2770, 柏〜船橋: 2781/2780
    inGid: '2770',
  },
  yagan: {
    name: '野岩鉄道会津鬼怒川線',
    railName: '野岩鉄道会津鬼怒川線',
    defaultCars: 2,
    outGid: '4701',
    inGid: '4700',
  },
  aizu: {
    name: '会津鉄道会津線',
    railName: '会津鉄道会津線',
    defaultCars: 2,
    outGid: '4640',
    inGid: '4641',
  },
};

const COMMON_TRAIN_TYPE_MAP = {
  '普通': 'local',
  '各駅停車': 'local',
  '区間準急': 'section_semi',
  '準急': 'semiExp',
  '区間急行': 'section_exp',
  '急行': 'express',
  '快速急行': 'rapidExp',
  '快速': 'rapid',
  '区間快速': 'section_rapid',
  'ＴＨライナー': 'th_liner',
  'THライナー': 'th_liner',
  'ライナー': 'th_liner',
  '特急': 'limitedExp',
  'スペーシア': 'limitedExp',
  'リバティ': 'limitedExp',
  'けごん': 'limitedExp',
  'きぬ': 'limitedExp',
  'りょうもう': 'limitedExp',
  '日光': 'limitedExp',
  'きぬがわ': 'limitedExp',
  '会津': 'limitedExp',
  'ＳＬ大樹': 'sl_taiju',
  'SL大樹': 'sl_taiju',
  'ＳＬふたら': 'sl_taiju',
  'SLふたら': 'sl_taiju',
  'ＡＩＺＵマウントエクスプレス': 'aizu_mount_exp',
  'AIZUマウントエクスプレス': 'aizu_mount_exp',
  'お座敷': 'aizu_ozeto',
  '展望列車': 'aizu_ozeto',
  '会津浪漫': 'aizu_ozeto',
};

for (const [lineId, stationsConfig] of Object.entries(LINES_STATIONS_CONFIG)) {
  const meta = LINE_METAS[lineId];
  const stationsList = [];

  for (let i = 0; i < stationsConfig.length; i++) {
    const cfg = stationsConfig[i];
    const p = probed[cfg.name];
    if (!p) {
      throw new Error(`Probe data missing for ${cfg.name}`);
    }

    let inGid = null;
    let outGid = null;

    // 起点・終点の境界ルール
    const isFirst = (i === 0);
    const isLast = (i === stationsConfig.length - 1);

    if (lineId === 'tobu_urban_park') {
      // 大宮(0)〜豊四季(22): 2771/2770
      // 柏(23): in: 2770, out: 2781
      // 新柏(24)〜船橋(34): 2781/2780
      if (i < 23) {
        outGid = '2771';
        inGid = isFirst ? null : '2770';
      } else if (i === 23) {
        inGid = '2770';
        outGid = '2781';
      } else {
        outGid = isLast ? null : '2781';
        inGid = '2780';
      }
    } else if (lineId === 'tobu_skytree' && cfg.name === '押上') {
      // 押上は半蔵門線直通の分岐起点（下り2670のみ）
      inGid = null;
      outGid = '2670';
    } else if (lineId === 'tobu_koizumi' && cfg.name === '太田') {
      // 太田〜東小泉支線起点
      inGid = null;
      outGid = '2731';
    } else {
      let lineOutGid = meta.outGid;
      let lineInGid = meta.inGid;
      if (!isFirst) {
        inGid = lineInGid;
      }
      if (!isLast) {
        outGid = lineOutGid;
      }
    }

    // 会津若松駅・西若松駅（只見線直通）特殊対応
    if (lineId === 'aizu' && cfg.name === '西若松') {
      outGid = '700';
      inGid = '4641';
    }
    if (lineId === 'aizu' && cfg.name === '会津若松') {
      inGid = '701';
      outGid = null;
    }

    stationsList.push({
      id: cfg.id,
      name: cfg.name,
      yahooStationId: p.stationId,
      inGroupId: inGid,
      outGroupId: outGid,
    });
  }

  // baseSectionSeconds の生成
  const baseSectionSeconds = {};
  for (let i = 1; i < stationsConfig.length; i++) {
    baseSectionSeconds[i] = 150; // 平均2.5分
  }

  const configContent = `// ${meta.name} Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: '${lineId}',
  name: '${meta.name}',
  stationsFilePath: 'src/data/lines/${lineId}/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/${lineId}/stationTimetables.json',
    globalTimetable: 'src/data/lines/${lineId}/globalTimetable.json',
  },
  stations: ${JSON.stringify(stationsList, null, 2)},
  stationNameAliases: {},
  trainTypeMap: ${JSON.stringify(COMMON_TRAIN_TYPE_MAP, null, 2)},
  preserveAllStopsTypes: ['th_liner', 'sl_taiju', 'aizu_mount_exp', 'aizu_ozeto'],
  defaultCars: ${meta.defaultCars},
  baseSectionSeconds: ${JSON.stringify(baseSectionSeconds, null, 2)},
};
`;

  const configDir = path.resolve(__dirname, `lines/${lineId}`);
  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(path.join(configDir, 'config.cjs'), configContent, 'utf8');
  console.log(`✅ Generated config for ${lineId} (${stationsList.length} stations)`);
}

console.log('\n🎉 All 13 configs successfully generated!');
