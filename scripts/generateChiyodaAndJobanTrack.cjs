const fs = require('fs');
const path = require('path');

function buildAdjGraph(elements) {
  const adj = new Map();
  function addEdge(u, v) {
    if (!adj.has(u)) adj.set(u, new Set());
    if (!adj.has(v)) adj.set(v, new Set());
    adj.get(u).add(v);
    adj.get(v).add(u);
  }

  for (const e of elements) {
    if (e.type === 'way' && e.nodes) {
      for (let i = 0; i < e.nodes.length - 1; i++) {
        addEdge(e.nodes[i], e.nodes[i + 1]);
      }
    }
  }
  return adj;
}

function bfsPath(adj, startId, goalId) {
  const queue = [startId];
  const visited = new Map();
  visited.set(startId, null);

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === goalId) {
      const p = [];
      let cur = curr;
      while (cur !== null) {
        p.push(cur);
        cur = visited.get(cur);
      }
      return p.reverse();
    }

    const neighbors = adj.get(curr) || [];
    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.set(next, curr);
        queue.push(next);
      }
    }
  }
  return null;
}

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// 150m以上離れている区間を等分割補間して滑らかにする
function subdivideCoordinates(coords, maxStep = 150) {
  const result = [coords[0]];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const d = distMeters(p1, p2);
    if (d > maxStep) {
      const steps = Math.ceil(d / maxStep);
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        result.push([
          p1[0] + (p2[0] - p1[0]) * t,
          p1[1] + (p2[1] - p1[1]) * t,
        ]);
      }
    }
    result.push(p2);
  }
  return result;
}

// -------------------------------------------------------------
// 1. 東京メトロ千代田線
// -------------------------------------------------------------
const chiyodaOsm = JSON.parse(fs.readFileSync('scripts/cache/osm_chiyoda_full.json', 'utf8'));
const cNodeMap = new Map();
chiyodaOsm.elements.filter(e => e.type === 'node').forEach(n => cNodeMap.set(n.id, n));
const cAdj = buildAdjGraph(chiyodaOsm.elements);

const chiyodaStationDefs = [
  {
    id: 'C-01', number: 1, name: '代々木上原', nameKana: 'よよぎうえはら', nameEn: 'Yoyogi-uehara',
    nodeId: 9339029496,
    transfers: ['小田急小田原線'],
    address: '東京都渋谷区西原三丁目8-5',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp', 'limitedExp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-02', number: 2, name: '代々木公園', nameKana: 'よよぎこうえん', nameEn: 'Yoyogi-koen',
    nodeId: 1926239440,
    transfers: ['小田急小田原線（代々木八幡駅）'],
    address: '東京都渋谷区富ヶ谷一丁目3-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-03', number: 3, name: '明治神宮前〈原宿〉', nameKana: 'めいじじんぐうまえ', nameEn: "Meiji-jingumae 'Harajuku'",
    nodeId: 6205951379,
    transfers: ['東京メトロ副都心線', 'JR山手線（原宿駅）'],
    address: '東京都渋谷区神宮前一丁目18-22',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-04', number: 4, name: '表参道', nameKana: 'おもてさんどう', nameEn: 'Omote-sando',
    nodeId: 6219132767,
    transfers: ['東京メトロ銀座線', '東京メトロ半蔵門線'],
    address: '東京都港区北青山三丁目6-12',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp', 'limitedExp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-05', number: 5, name: '乃木坂', nameKana: 'のぎざか', nameEn: 'Nogizaka',
    nodeId: 1926239435,
    transfers: [],
    address: '東京都港区南青山一丁目25-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-06', number: 6, name: '赤坂', nameKana: 'あかさか', nameEn: 'Akasaka',
    nodeId: 1926239474,
    transfers: [],
    address: '東京都港区赤坂五丁目4-7',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-07', number: 7, name: '国会議事堂前', nameKana: 'こっかいぎじどうまえ', nameEn: 'Kokkai-gijidomae',
    nodeId: 2758163097,
    transfers: ['東京メトロ丸ノ内線', '東京メトロ銀座線（溜池山王駅）', '東京メトロ南北線（溜池山王駅）'],
    address: '東京都千代田区永田町一丁目7-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-08', number: 8, name: '霞ケ関', nameKana: 'かすみがせき', nameEn: 'Kasumigaseki',
    nodeId: 2758163108,
    transfers: ['東京メトロ丸ノ内線', '東京メトロ日比谷線'],
    address: '東京都千代田区霞が関二丁目1-2',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp', 'limitedExp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-09', number: 9, name: '日比谷', nameKana: 'ひびや', nameEn: 'Hibiya',
    nodeId: 6193465458,
    transfers: ['東京メトロ日比谷線', '都営三田線', 'JR山手線（有楽町駅）', 'JR京浜東北線（有楽町駅）', '東京メトロ有楽町線（有楽町駅）'],
    address: '東京都千代田区有楽町一丁目5-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-10', number: 10, name: '二重橋前〈丸の内〉', nameKana: 'にじゅうばしまえ', nameEn: "Nijubashimae 'Marunouchi'",
    nodeId: 2769291151,
    transfers: ['JR各線（東京駅）', '東京メトロ丸ノ内線（東京駅）'],
    address: '東京都千代田区丸の内二丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-11', number: 11, name: '大手町', nameKana: 'おおてまち', nameEn: 'Otemachi',
    nodeId: 6284705925,
    transfers: ['東京メトロ丸ノ内線', '東京メトロ東西線', '東京メトロ半蔵門線', '都営三田線', 'JR各線（東京駅）'],
    address: '東京都千代田区大手町一丁目6-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp', 'limitedExp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-12', number: 12, name: '新御茶ノ水', nameKana: 'しんおちゃのみず', nameEn: 'Shin-ochanomizu',
    nodeId: 1926239458,
    transfers: ['JR中央線（御茶ノ水駅）', 'JR総武線各駅停車（御茶ノ水駅）', '東京メトロ丸ノ内線（淡路町駅）', '都営新宿線（小川町駅）'],
    address: '東京都千代田区神田駿河台三丁目2',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-13', number: 13, name: '湯島', nameKana: 'ゆしま', nameEn: 'Yushima',
    nodeId: 6190974823,
    transfers: [],
    address: '東京都文京区湯島三丁目41-3',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-14', number: 14, name: '根津', nameKana: 'ねづ', nameEn: 'Nezu',
    nodeId: 1926239464,
    transfers: [],
    address: '東京都文京区根津一丁目3-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-15', number: 15, name: '千駄木', nameKana: 'せんだぎ', nameEn: 'Sendagi',
    nodeId: 1926239451,
    transfers: [],
    address: '東京都文京区千駄木二丁目32-5',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-16', number: 16, name: '西日暮里', nameKana: 'にしにっぽり', nameEn: 'Nishi-nippori',
    nodeId: 3708277001,
    transfers: ['JR山手線', 'JR京浜東北線', '日暮里・舎人ライナー'],
    address: '東京都荒川区西日暮里五丁目22-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-17', number: 17, name: '町屋', nameKana: 'まちや', nameEn: 'Machiya',
    nodeId: 2440290619,
    transfers: ['京成本線', '都電荒川線'],
    address: '東京都荒川区町屋一丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'C-18', number: 18, name: '北千住', nameKana: 'きたせんじゅ', nameEn: 'Kita-senju',
    nodeId: 6237957752,
    transfers: ['JR常磐線快速', '東武スカイツリーライン', '東京メトロ日比谷線', 'つくばエクスプレス'],
    address: '東京都足立区千住旭町42-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp', 'limitedExp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-19', number: 19, name: '綾瀬', nameKana: 'あやせ', nameEn: 'Ayase',
    nodeId: 6222059019,
    transfers: ['JR常磐線'],
    address: '東京都足立区綾瀬三丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'C-20', number: 20, name: '北綾瀬', nameKana: 'きたあやせ', nameEn: 'Kita-ayase',
    nodeId: 2176856089,
    transfers: [],
    address: '東京都足立区谷中二丁目6-21',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
];

// -------------------------------------------------------------
// 2. JR常磐線（各駅停車）
// -------------------------------------------------------------
const jobanOsm = JSON.parse(fs.readFileSync('scripts/cache/osm_joban_full.json', 'utf8'));
const jNodeMap = new Map();
jobanOsm.elements.filter(e => e.type === 'node').forEach(n => jNodeMap.set(n.id, n));
const jAdj = buildAdjGraph(jobanOsm.elements);

const jobanStationDefs = [
  {
    id: 'JL-19', number: 19, name: '綾瀬', nameKana: 'あやせ', nameEn: 'Ayase',
    nodeId: 6222059019,
    transfers: ['東京メトロ千代田線'],
    address: '東京都足立区綾瀬三丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JL-20', number: 20, name: '亀有', nameKana: 'かめあり', nameEn: 'Kameari',
    nodeId: 7179667423,
    transfers: [],
    address: '東京都葛飾区亀有三丁目25-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-21', number: 21, name: '金町', nameKana: 'かなまち', nameEn: 'Kanamachi',
    nodeId: 6795710539,
    transfers: ['京成金町線（京成金町駅）'],
    address: '東京都葛飾区金町六丁目4-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-22', number: 22, name: '松戸', nameKana: 'まつど', nameEn: 'Matsudo',
    nodeId: 6089167852,
    transfers: ['JR常磐線快速', '新京成線'],
    address: '千葉県松戸市松戸1181',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JL-23', number: 23, name: '北松戸', nameKana: 'きたまつど', nameEn: 'Kita-Matsudo',
    nodeId: 7179713464,
    transfers: [],
    address: '千葉県松戸市北松戸二丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-24', number: 24, name: '馬橋', nameKana: 'まばし', nameEn: 'Mabashi',
    nodeId: 7179796619,
    transfers: ['流鉄流山線'],
    address: '千葉県松戸市馬橋119',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-25', number: 25, name: '新松戸', nameKana: 'しんまつど', nameEn: 'Shin-Matsudo',
    nodeId: 3726206206,
    transfers: ['JR武蔵野線', '流鉄流山線（幸谷駅）'],
    address: '千葉県松戸市幸谷572-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JL-26', number: 26, name: '北小金', nameKana: 'きたこがね', nameEn: 'Kita-Kogane',
    nodeId: 7179735214,
    transfers: [],
    address: '千葉県松戸市小金きよしケ丘一丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-27', number: 27, name: '南柏', nameKana: 'みなみかしわ', nameEn: 'Minami-Kashiwa',
    nodeId: 7179735216,
    transfers: [],
    address: '千葉県柏市南柏一丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-28', number: 28, name: '柏', nameKana: 'かしわ', nameEn: 'Kashiwa',
    nodeId: 3654391412,
    transfers: ['JR常磐線快速', '東武アーバンパークライン'],
    address: '千葉県柏市柏一丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JL-29', number: 29, name: '北柏', nameKana: 'きたかしわ', nameEn: 'Kita-Kashiwa',
    nodeId: 1923163784,
    transfers: [],
    address: '千葉県柏市根戸字松葉町1906',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-30', number: 30, name: '我孫子', nameKana: 'あびこ', nameEn: 'Abiko',
    nodeId: 6089154720,
    transfers: ['JR常磐線快速', 'JR成田線（我孫子支線）'],
    address: '千葉県我孫子市本町二丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '6・7番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JL-31', number: 31, name: '天王台', nameKana: 'てんのうだい', nameEn: 'Tenno-dai',
    nodeId: 6089154748,
    transfers: ['JR常磐線快速'],
    address: '千葉県我孫子市柴崎台一丁目19-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JL-32', number: 32, name: '取手', nameKana: 'とりで', nameEn: 'Toride',
    nodeId: 5651645061,
    transfers: ['JR常磐線快速', '関東鉄道常総線'],
    address: '茨城県取手市中央町1-1',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'semiExp', 'express', 'commuter_semi', 'commuter_exp'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
];

// 出力ディレクトリの作成
fs.mkdirSync('src/data/lines/chiyoda', { recursive: true });
fs.mkdirSync('src/data/lines/joban', { recursive: true });

// --- 千代田線 stations.ts 生成 ---
const chiyodaStations = chiyodaStationDefs.map(s => {
  const node = cNodeMap.get(s.nodeId);
  return {
    id: s.id,
    lineId: 'chiyoda',
    number: s.number,
    name: s.name,
    nameKana: s.nameKana,
    nameEn: s.nameEn,
    lat: node ? node.lat : 0,
    lng: node ? node.lon : 0,
    transfers: s.transfers,
    address: s.address,
    facilities: s.facilities,
    stoppingTypes: s.stoppingTypes,
    platforms: s.platforms,
    isMajor: s.isMajor,
  };
});

fs.writeFileSync('src/data/lines/chiyoda/stations.ts',
`// 東京メトロ千代田線 駅メタデータ定義
import type { Station } from '../../../types';

export const CHIYODA_STATIONS: Station[] = ${JSON.stringify(chiyodaStations, null, 2)};
`, 'utf8');
console.log('Written src/data/lines/chiyoda/stations.ts');

// --- 千代田線 trackGeometry.ts 生成 ---
const chiyodaSegments = [];
// 本線: C-01 -> C-19
for (let i = 0; i < 18; i++) {
  const fromDef = chiyodaStationDefs[i];
  const toDef = chiyodaStationDefs[i + 1];
  const path = bfsPath(cAdj, fromDef.nodeId, toDef.nodeId);
  const rawCoords = path.map(nId => {
    const n = cNodeMap.get(nId);
    return [n.lat, n.lon];
  });
  const coords = subdivideCoordinates(rawCoords, 150);
  chiyodaSegments.push({
    fromStationId: fromDef.id,
    toStationId: toDef.id,
    fromName: fromDef.name,
    toName: toDef.name,
    coordinates: coords,
  });
}
// 支線: C-19 -> C-20 (綾瀬 -> 北綾瀬)
const branchPath = bfsPath(cAdj, 6222059019, 2176856089);
const rawBranchCoords = branchPath.map(nId => {
  const n = cNodeMap.get(nId);
  return [n.lat, n.lon];
});
const branchCoords = subdivideCoordinates(rawBranchCoords, 150);
chiyodaSegments.push({
  fromStationId: 'C-19',
  toStationId: 'C-20',
  fromName: '綾瀬',
  toName: '北綾瀬',
  coordinates: branchCoords,
});

fs.writeFileSync('src/data/lines/chiyoda/trackGeometry.ts',
`// 東京メトロ千代田線 線路ジオメトリデータ
import type { TrackSegment } from '../../../types';

export const CHIYODA_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(chiyodaSegments, null, 2)};
`, 'utf8');
console.log('Written src/data/lines/chiyoda/trackGeometry.ts');

// --- 常磐線 trackGeometry.ts 生成 ---
const jobanSegments = [];
for (let i = 0; i < jobanStationDefs.length - 1; i++) {
  const fromDef = jobanStationDefs[i];
  const toDef = jobanStationDefs[i + 1];
  const path = bfsPath(jAdj, fromDef.nodeId, toDef.nodeId);
  const rawCoords = path.map(nId => {
    const n = jNodeMap.get(nId);
    return [n.lat, n.lon];
  });
  const coords = subdivideCoordinates(rawCoords, 150);
  jobanSegments.push({
    fromStationId: fromDef.id,
    toStationId: toDef.id,
    fromName: fromDef.name,
    toName: toDef.name,
    coordinates: coords,
  });
}

fs.writeFileSync('src/data/lines/joban/trackGeometry.ts',
`// JR常磐線 線路ジオメトリデータ
import type { TrackSegment } from '../../../types';

export const JOBAN_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(jobanSegments, null, 2)};
`, 'utf8');
console.log('Written src/data/lines/joban/trackGeometry.ts');

console.log('All files regenerated with smooth subdivision!');
