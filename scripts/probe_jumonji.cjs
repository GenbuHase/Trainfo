const YahooClient = require('./common/yahoo/YahooClient.cjs');
const path = require('path');

async function main() {
  const client = new YahooClient({
    cacheDir: path.resolve(__dirname, 'cache/yahoo/ou_probe'),
    delayMs: 200,
  });
  const props = await client.fetchNextData('https://transit.yahoo.co.jp/timetable/21213/', {
    cacheKey: 'tt_21213',
    subDir: 'tt_direct',
  });
  const text = JSON.stringify(props);
  const idx = text.indexOf('十文字');
  console.log('idx', idx);
  if (idx >= 0) console.log(text.slice(Math.max(0, idx - 200), idx + 200));
  const ids = [...text.matchAll(/timetable\/(\d+)/g)].map(m => m[1]);
  console.log('timetable ids', [...new Set(ids)].slice(0, 30));
  const keys = Object.keys(props);
  console.log('top keys', keys);
  const dd = props.directionDetail || {};
  console.log('station', dd.stationName, 'stationId', props.stationId, 'rail', props.railName);
  const routes = dd.directionItem?.routeInfos || [];
  for (const r of routes) {
    if ((r.railName || '').includes('奥羽')) {
      console.log(r.railName, JSON.stringify(r.railGroup));
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
