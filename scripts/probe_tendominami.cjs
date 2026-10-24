const YahooClient = require('./common/yahoo/YahooClient.cjs');
const path = require('path');

async function main() {
  const client = new YahooClient({
    cacheDir: path.resolve(__dirname, 'cache/yahoo/ou_probe'),
    delayMs: 200,
  });
  const url = 'https://transit.yahoo.co.jp/timetable/search?q=' + encodeURIComponent('天童南');
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' });
  console.log('final', res.url, res.status);
  const props = await client.fetchNextData(res.url, {
    cacheKey: 'tt_tendominami_final',
    subDir: 'tt_direct',
  });
  console.log('keys', Object.keys(props));
  if (props.directionDetail) {
    console.log('station', props.directionDetail.stationName);
    console.log('url hint', props.stationId, props.query);
    for (const r of props.directionDetail.directionItem?.routeInfos || []) {
      if ((r.railName || '').includes('奥羽')) console.log(r.railName, JSON.stringify(r.railGroup));
    }
  }
  if (props.stationFeatures) {
    for (const f of props.stationFeatures) {
      const d = f.TransitSearchInfo?.Detail;
      if (!d) continue;
      console.log(d.StationId, d.DisplayStationName, d.RailName);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
