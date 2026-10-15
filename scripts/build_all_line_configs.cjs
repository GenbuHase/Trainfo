const fs = require('fs');
const path = require('path');

const verified = JSON.parse(fs.readFileSync('scripts/cache/verified_station_details.json', 'utf8'));

// 2点間の距離(km)計算
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const LINE_SPECS = {
  tokaido: {
    name: 'JR東海道線',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => ({
      inGroupId: isFirst ? null : '1170',
      outGroupId: isLast ? null : '1171',
    }),
  },
  ito: {
    name: 'JR伊東線',
    defaultCars: 6,
    getGroupIds: (name, isFirst, isLast) => ({
      inGroupId: isFirst ? null : '1290',
      outGroupId: isLast ? null : '1291',
    }),
  },
  yokosuka: {
    name: 'JR横須賀線',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => ({
      inGroupId: isFirst ? null : '1160',
      outGroupId: isLast ? null : '1161',
    }),
  },
  sobu_rapid: {
    name: 'JR総武快速線',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => ({
      inGroupId: isFirst ? null : '940',
      outGroupId: isLast ? null : '941',
    }),
  },
  utsunomiya: {
    name: 'JR宇都宮線',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => {
      if (name === '東京') return { inGroupId: null, outGroupId: '7910' };
      if (name === '上野') return { inGroupId: '7911', outGroupId: '601' };
      return {
        inGroupId: isFirst ? null : '600',
        outGroupId: isLast ? null : '601',
      };
    },
  },
  takasaki: {
    name: 'JR高崎線',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => {
      if (name === '東京') return { inGroupId: null, outGroupId: '7910' };
      if (name === '上野') return { inGroupId: '7911', outGroupId: '1011' };
      if (['尾久', '赤羽', '浦和', 'さいたま新都心'].includes(name)) {
        return { inGroupId: '600', outGroupId: '1011' };
      }
      return {
        inGroupId: isFirst ? null : '1010',
        outGroupId: isLast ? null : '1011',
      };
    },
  },
  shonan_shinjuku: {
    name: 'JR湘南新宿ライン',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => ({
      inGroupId: isFirst ? null : '1051',
      outGroupId: isLast ? null : '1050',
    }),
  },
  ueno_tokyo: {
    name: 'JR上野東京ライン',
    defaultCars: 15,
    getGroupIds: (name, isFirst, isLast) => {
      if (isFirst) return { inGroupId: null, outGroupId: '600' }; // 大宮
      if (isLast) return { inGroupId: '1170', outGroupId: null };  // 大船
      if (['さいたま新都心', '浦和', '赤羽', '尾久'].includes(name)) {
        return { inGroupId: '601', outGroupId: '600' };
      }
      if (name === '上野') {
        return { inGroupId: '601', outGroupId: '7911' };
      }
      if (name === '東京') {
        return { inGroupId: '7910', outGroupId: '1171' };
      }
      // 新橋〜戸塚
      return { inGroupId: '1170', outGroupId: '1171' };
    },
  },
};

const trainTypeMap = {
  '各駅停車': 'local',
  '普通': 'local',
  '快速': 'rapid',
  '特別快速': 'special_rapid',
  '通勤快速': 'commuter_rapid',
  '快速アクティー': 'rapid_acty',
  '快速ラビット': 'rapid_rabbit',
  '快速アーバン': 'rapid_urban',
  '特急': 'limitedExp',
  '成田エクスプレス': 'limitedExp',
  '踊り子': 'limitedExp',
  'サフィール踊り子': 'limitedExp',
  '湘南': 'limitedExp',
  '草津・四万': 'limitedExp',
  'あかぎ': 'limitedExp',
  'しおさい': 'limitedExp',
};

for (const [lineId, spec] of Object.entries(LINE_SPECS)) {
  const stationsFile = `src/data/lines/${lineId}/stations.ts`;
  const content = fs.readFileSync(stationsFile, 'utf8');

  // 駅リストパース
  const stationBlocks = content.split(/\{\s*"id":/).slice(1);
  const stations = [];
  const coords = [];

  for (const block of stationBlocks) {
    const idMatch = block.match(/^\s*"([^"]+)"/);
    const nameMatch = block.match(/"name":\s*"([^"]+)"/);
    const latMatch = block.match(/"lat":\s*([0-9\.\-]+)/);
    const lngMatch = block.match(/"lng":\s*([0-9\.\-]+)/);

    if (idMatch && nameMatch) {
      stations.push({
        id: idMatch[1],
        name: nameMatch[1],
      });
      coords.push({
        lat: latMatch ? parseFloat(latMatch[1]) : 0,
        lng: lngMatch ? parseFloat(lngMatch[1]) : 0,
      });
    }
  }

  // stations 設定構築
  const stationsConfig = stations.map((s, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === stations.length - 1;
    const { inGroupId, outGroupId } = spec.getGroupIds(s.name, isFirst, isLast);
    const yahooStationId = verified[s.name]?.id;
    if (!yahooStationId) {
      console.error(`Missing yahooStationId for ${s.name} in line ${lineId}`);
    }
    return {
      id: s.id,
      name: s.name,
      yahooStationId,
      inGroupId,
      outGroupId,
    };
  });

  // baseSectionSeconds 構築 (距離から算出: 時速約60〜70km想定、最低90秒)
  const baseSectionSeconds = {};
  for (let i = 0; i < coords.length - 1; i++) {
    const dist = getDistanceKm(coords[i].lat, coords[i].lng, coords[i+1].lat, coords[i+1].lng);
    // 距離(km) / 60(km/h) * 3600秒 = 秒数
    let sec = Math.round(dist / 65 * 3600);
    if (sec < 90) sec = 90;
    baseSectionSeconds[i + 1] = sec;
  }

  const configObj = {
    lineId,
    name: spec.name,
    stationsFilePath: stationsFile,
    outputPaths: {
      stationTimetables: `src/data/lines/${lineId}/stationTimetables.json`,
      globalTimetable: `src/data/lines/${lineId}/globalTimetable.json`,
    },
    stations: stationsConfig,
    trainTypeMap,
    defaultCars: spec.defaultCars,
    baseSectionSeconds,
  };

  const outDir = `scripts/lines/${lineId}`;
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'config.cjs');
  fs.writeFileSync(outPath, `// ${spec.name} Yahoo! 路線情報スクレイパー設定\nmodule.exports = ${JSON.stringify(configObj, null, 2)};\n`, 'utf8');
  console.log(`[${lineId}] Generated config at: ${outPath} (${stationsConfig.length} stations)`);
}

console.log('\n🎉 ALL 8 LINE CONFIGS GENERATED SUCCESSFULLY!');
