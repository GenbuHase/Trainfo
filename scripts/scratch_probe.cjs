const YahooClient = require('./common/yahoo/YahooClient.cjs');

const STATIONS = {
  tokyu_shin_yokohama: [
    { code: '23212', name: '新横浜' },
    { code: '29939', name: '新綱島' },
    { code: '23297', name: '日吉' },
  ],
  sotetsu_shin_yokohama: [
    { code: '23212', name: '新横浜' },
    { code: '29682', name: '羽沢横浜国大' },
    { code: '23267', name: '西谷' },
  ],
  sotetsu_main: [
    { code: '23368', name: '横浜' },
    { code: '23299', name: '平沼橋' },
    { code: '23268', name: '西横浜' },
    { code: '23247', name: '天王町' },
    { code: '23314', name: '星川' },
    { code: '23375', name: '和田町' },
    { code: '23121', name: '上星川' },
    { code: '23267', name: '西谷' },
    { code: '23241', name: '鶴ヶ峰' },
    { code: '23310', name: '二俣川' },
    { code: '23136', name: '希望ヶ丘' },
    { code: '23329', name: '三ツ境' },
    { code: '23218', name: '瀬谷' },
    { code: '23360', name: '大和' },
    { code: '23171', name: '相模大塚' },
    { code: '23176', name: 'さがみ野' },
    { code: '23105', name: 'かしわ台' },
    { code: '23088', name: '海老名' },
  ],
  sotetsu_izumino: [
    { code: '23310', name: '二俣川' },
    { code: '23336', name: '南万騎が原' },
    { code: '23371', name: '緑園都市' },
    { code: '23361', name: '弥生台' },
    { code: '23070', name: 'いずみ野' },
    { code: '23069', name: 'いずみ中央' },
    { code: '29256', name: 'ゆめが丘' },
    { code: '23191', name: '湘南台' },
  ]
};

async function probeGroups() {
  const client = new YahooClient({ delayMs: 150 });
  // collect unique codes
  const uniqueStations = new Map();
  for (const list of Object.values(STATIONS)) {
    for (const s of list) {
      uniqueStations.set(s.code, s.name);
    }
  }

  const results = {};
  for (const [code, name] of uniqueStations.entries()) {
    console.log(`Fetching ${name} (${code})...`);
    try {
      const data = await client.fetchNextData(`https://transit.yahoo.co.jp/timetable/${code}/`);
      const routes = data.directionDetail?.directionItem?.routeInfos || [];
      results[code] = {
        name,
        stationName: data.directionDetail?.stationName,
        routes: routes.map(r => ({
          railName: r.railName,
          railGroup: r.railGroup
        }))
      };
    } catch (e) {
      console.error(`Failed ${name} (${code}):`, e.message);
    }
  }

  const fs = require('fs');
  fs.writeFileSync('scripts/scratch_groups.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved to scripts/scratch_groups.json');
}

probeGroups().catch(console.error);
