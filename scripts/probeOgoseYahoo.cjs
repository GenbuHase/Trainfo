const YahooClient = require('./common/yahoo/YahooClient.cjs');

async function probe() {
  const client = new YahooClient();

  // 1. 坂戸駅 (22041)
  console.log('Fetching Sakado (22041)...');
  const sakadoData = await client.fetchNextData('https://transit.yahoo.co.jp/timetable/22041/');
  console.log('Sakado directionDetail:', JSON.stringify(sakadoData.directionDetail, null, 2));
  console.log('Sakado railNameDiaInfo:', JSON.stringify(sakadoData.railNameDiaInfo, null, 2));

  // 2. 越生駅 (21993)
  console.log('\nFetching Ogose (21993)...');
  const ogoseData = await client.fetchNextData('https://transit.yahoo.co.jp/timetable/21993/');
  console.log('Ogose directionDetail:', JSON.stringify(ogoseData.directionDetail, null, 2));
  console.log('Ogose railNameDiaInfo:', JSON.stringify(ogoseData.railNameDiaInfo, null, 2));

  // 3. 坂戸駅 2801 の平日 (kind=1) 時刻表から列車詳細を取得して全停車駅を一覧化
  console.log('\nFetching timetable for Sakado (22041) group 2801 kind 1...');
  // 3. 坂戸駅 2801 の平日 (kind=1) 時刻表から列車詳細を取得して全停車駅を一覧化
  console.log('\nFetching timetable for Sakado (22041) group 2801 kind 1...');
  const ttData = await client.fetchNextData('https://transit.yahoo.co.jp/timetable/22041/2801?kind=1');
  const ttItem = ttData.timetableItem;
  console.log('Got timetable, extracting first train...');
  let firstTrain = null;
  let firstH = null;
  for (const h of ttItem.hourTimeTable) {
    if (h.minTimeTable && h.minTimeTable.length > 0) {
      firstH = h.hour;
      firstTrain = h.minTimeTable[0];
      break;
    }
  }

  if (firstTrain) {
    console.log('First train:', firstH, firstTrain.minute, firstTrain.trainId);
    const detailUrl = `https://transit.yahoo.co.jp/timetable/22041/2801/${firstTrain.trainId}?kind=1&hh=${firstH}&mm=${firstTrain.minute}`;
    console.log('Fetching train detail:', detailUrl);
    const trainData = await client.fetchNextData(detailUrl);
    const tr = trainData.timetableStationTrainResult;
    const stopStations = tr.timetable.stopStation || [];
    console.log('--- Sample Stop Station Object ---', JSON.stringify(stopStations[0], null, 2));
    console.log('--- All Stopping Stations of Ogose Line ---');
    stopStations.forEach((st, idx) => {
      console.log(`${idx + 1}.`, st);
    });
  }
}

probe().catch(console.error);

