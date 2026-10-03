// 有楽町線・副都心線 共用区間（和光市〜小竹向原）の系統分離判定モジュール

const yurakuchoExclusiveStations = [
  '東池袋', '護国寺', '江戸川橋', '飯田橋', '市ケ谷', '麹町', '永田町', '桜田門',
  '有楽町', '銀座一丁目', '新富町', '月島', '豊洲', '辰巳', '新木場'
];

const fukutoshinExclusiveStations = [
  '雑司が谷', '西早稲田', '東新宿', '新宿三丁目', '北参道', '明治神宮前', '渋谷',
  '中目黒', '祐天寺', '学芸大学', '都立大学', '自由が丘', '田園調布', '多摩川', '新丸子', '武蔵小杉',
  '元住吉', '日吉', '綱島', '大倉山', '菊名', '妙蓮寺', '白楽', '東白楽', '反町', '横浜',
  'みなとみらい', '馬車道', '日本大通り', '元町・中華街', '新横浜', '羽沢横浜国大', '西谷', '二俣川',
  '大和', '海老名', '湘南台'
];

// 深夜の有楽町線池袋止まり列車（和光市23:46発 池袋24:05着）
const yurakuchoTerminatingTrains = ['114836', '77201'];

/**
 * 有楽町線から除外すべき列車かどうか（trueなら除外）
 * @param {Object} trainDetail
 * @returns {boolean}
 */
function shouldExcludeFromYurakucho(trainDetail) {
  const stops = (trainDetail.stopStation || []).map(s => s.stationName);
  
  // 副都心線固有の駅を含む列車は除外
  if (stops.some(st => fukutoshinExclusiveStations.some(ex => st.includes(ex)))) {
    return true;
  }

  // 有楽町線固有の駅を含む列車は保持
  if (stops.some(st => yurakuchoExclusiveStations.some(ex => st.includes(ex)))) {
    return false;
  }

  // 有楽町線池袋止まり列車は保持
  if (yurakuchoTerminatingTrains.includes(trainDetail.trainId)) {
    return false;
  }

  // どちらにも属さない不明列車は除外
  return true;
}

/**
 * 副都心線から除外すべき列車かどうか（trueなら除外）
 * @param {Object} trainDetail
 * @returns {boolean}
 */
function shouldExcludeFromFukutoshin(trainDetail) {
  const stops = (trainDetail.stopStation || []).map(s => s.stationName);

  // 有楽町線固有の駅を含む列車は除外
  if (stops.some(st => yurakuchoExclusiveStations.some(ex => st.includes(ex)))) {
    return true;
  }

  // 有楽町線池袋止まり列車は除外
  if (yurakuchoTerminatingTrains.includes(trainDetail.trainId)) {
    return true;
  }

  // 副都心線固有の駅を含む列車は保持
  if (stops.some(st => fukutoshinExclusiveStations.some(ex => st.includes(ex)))) {
    return false;
  }

  // どちらにも属さない不明列車は除外
  return true;
}

module.exports = {
  yurakuchoExclusiveStations,
  fukutoshinExclusiveStations,
  yurakuchoTerminatingTrains,
  shouldExcludeFromYurakucho,
  shouldExcludeFromFukutoshin,
};
