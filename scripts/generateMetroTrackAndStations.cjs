const fs = require('fs');
const path = require('path');

// BFS 最短経路探索
function bfsPath(adj, startId, goalId) {
  const queue = [startId];
  const visited = new Map();
  visited.set(startId, null);

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === goalId) {
      const path = [];
      let p = curr;
      while (p !== null) {
        path.push(p);
        p = visited.get(p);
      }
      return path.reverse();
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

// グラフ構築
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

// ==========================================
// 1. 有楽町線 (Yurakucho Line)
// ==========================================
const yOsm = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_yurakucho_full.json'), 'utf8'));
const yNodeMap = new Map();
yOsm.elements.filter(e => e.type === 'node').forEach(n => yNodeMap.set(n.id, n));
const yAdj = buildAdjGraph(yOsm.elements);

const yDefs = [
  {
    id: 'Y-01', number: 1, name: '和光市', nameKana: 'わこうし', nameEn: 'Wakoshi',
    nodeId: 3645998146,
    transfers: ['東武東上線', '東京メトロ副都心線'],
    address: '埼玉県和光市本町4-6',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-02', number: 2, name: '地下鉄成増', nameKana: 'ちかてつなります', nameEn: 'Chikatetsu-narimasu',
    nodeId: 7775821589,
    transfers: ['東武東上線（成増駅）', '東京メトロ副都心線'],
    address: '東京都練馬区旭町三丁目26-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-03', number: 3, name: '地下鉄赤塚', nameKana: 'ちかてつあかつか', nameEn: 'Chikatetsu-akatsuka',
    nodeId: 7775801427,
    transfers: ['東武東上線（下赤塚駅）', '東京メトロ副都心線'],
    address: '東京都練馬区北町八丁目37-16',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-04', number: 4, name: '平和台', nameKana: 'へいわだい', nameEn: 'Heiwadai',
    nodeId: 7775791257,
    transfers: ['東京メトロ副都心線'],
    address: '東京都練馬区平和台四丁目26-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-05', number: 5, name: '氷川台', nameKana: 'ひかわだい', nameEn: 'Hikawadai',
    nodeId: 7775824110,
    transfers: ['東京メトロ副都心線'],
    address: '東京都練馬区氷川台三丁目38-18',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-06', number: 6, name: '小竹向原', nameKana: 'こたけむかいはら', nameEn: 'Kotake-mukaihara',
    nodeId: 7369566822,
    transfers: ['西武有楽町線', '東京メトロ副都心線'],
    address: '東京都練馬区小竹町二丁目16-1',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-07', number: 7, name: '千川', nameKana: 'せんかわ', nameEn: 'Senkawa',
    nodeId: 7775808131,
    transfers: ['東京メトロ副都心線'],
    address: '東京都豊島区要町三丁目10-6',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-08', number: 8, name: '要町', nameKana: 'かなめちょう', nameEn: 'Kanamecho',
    nodeId: 6213383386,
    transfers: ['東京メトロ副都心線'],
    address: '東京都豊島区要町一丁目1-10',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-09', number: 9, name: '池袋', nameKana: 'いけぶくろ', nameEn: 'Ikebukuro',
    nodeId: 6224948699,
    transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東武東上線', '西武池袋線', '東京メトロ丸ノ内線', '東京メトロ副都心線'],
    address: '東京都豊島区西池袋一丁目1-25',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-10', number: 10, name: '東池袋', nameKana: 'ひがしいけぶくろ', nameEn: 'Higashi-ikebukuro',
    nodeId: 6277315766,
    transfers: ['都電荒川線(東池袋四丁目停留場)'],
    address: '東京都豊島区東池袋四丁目4-4',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-11', number: 11, name: '護国寺', nameKana: 'ごこくじ', nameEn: 'Gokokuji',
    nodeId: 1926376085,
    transfers: [],
    address: '東京都文京区大塚五丁目40-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-12', number: 12, name: '江戸川橋', nameKana: 'えどがわばし', nameEn: 'Edogawabashi',
    nodeId: 1926376082,
    transfers: [],
    address: '東京都文京区関口一丁目19-6',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-13', number: 13, name: '飯田橋', nameKana: 'いいだばし', nameEn: 'Iidabashi',
    nodeId: 6268844072,
    transfers: ['JR中央・総武線各駅停車', '東京メトロ東西線', '東京メトロ南北線', '都営大江戸線'],
    address: '東京都新宿区神楽坂一丁目13',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-14', number: 14, name: '市ケ谷', nameKana: 'いちがや', nameEn: 'Ichigaya',
    nodeId: 1926376077,
    transfers: ['JR中央・総武線各駅停車', '東京メトロ南北線', '都営新宿線'],
    address: '東京都新宿区市谷田町一丁目',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-15', number: 15, name: '麹町', nameKana: 'こうじまち', nameEn: 'Kojimachi',
    nodeId: 1926376088,
    transfers: [],
    address: '東京都千代田区麹町三丁目2',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-16', number: 16, name: '永田町', nameKana: 'ながたちょう', nameEn: 'Nagatacho',
    nodeId: 6179529804,
    transfers: ['東京メトロ銀座線・丸ノ内線(赤坂見附駅)', '東京メトロ半蔵門線', '東京メトロ南北線'],
    address: '東京都千代田区永田町一丁目11-28',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-17', number: 17, name: '桜田門', nameKana: 'さくらだもん', nameEn: 'Sakuradamon',
    nodeId: 1926376080,
    transfers: [],
    address: '東京都千代田区霞が関二丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-18', number: 18, name: '有楽町', nameKana: 'ゆうらくちょう', nameEn: 'Yurakucho',
    nodeId: 1926376078,
    transfers: ['JR山手線', 'JR京浜東北線', '東京メトロ日比谷線・千代田線・都営三田線(日比谷駅)'],
    address: '東京都千代田区有楽町一丁目11-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-19', number: 19, name: '銀座一丁目', nameKana: 'ぎんざいっちょうめ', nameEn: 'Ginza-itchome',
    nodeId: 1926376086,
    transfers: ['東京メトロ銀座線・丸ノ内線・日比谷線(銀座駅)'],
    address: '東京都中央区銀座一丁目7-12',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-20', number: 20, name: '新富町', nameKana: 'しんとみちょう', nameEn: 'Shintomicho',
    nodeId: 6274908262,
    transfers: ['東京メトロ日比谷線(築地駅)'],
    address: '東京都中央区築地一丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-21', number: 21, name: '月島', nameKana: 'つきしま', nameEn: 'Tsukishima',
    nodeId: 6278523324,
    transfers: ['都営大江戸線'],
    address: '東京都中央区月島一丁目3-9',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'Y-22', number: 22, name: '豊洲', nameKana: 'とよす', nameEn: 'Toyosu',
    nodeId: 6274211198,
    transfers: ['ゆりかもめ'],
    address: '東京都江東区豊洲四丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'Y-23', number: 23, name: '辰巳', nameKana: 'たつみ', nameEn: 'Tatsumi',
    nodeId: 31330037,
    transfers: [],
    address: '東京都江東区辰巳一丁目1-36',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'Y-24', number: 24, name: '新木場', nameKana: 'しんきば', nameEn: 'Shin-kiba',
    nodeId: 31330041,
    transfers: ['JR京葉線', '東京臨海高速鉄道りんかい線'],
    address: '東京都江東区新木場一丁目5',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
];

// 有楽町線 駅リスト
const yStations = yDefs.map(d => {
  const n = yNodeMap.get(d.nodeId);
  return {
    id: d.id,
    lineId: 'yurakucho',
    number: d.number,
    name: d.name,
    nameKana: d.nameKana,
    nameEn: d.nameEn,
    lat: n.lat,
    lng: n.lon,
    transfers: d.transfers,
    address: d.address,
    facilities: d.facilities,
    stoppingTypes: d.stoppingTypes,
    isMajor: d.isMajor,
    platforms: d.platforms,
  };
});

// 有楽町線 セグメント生成
const yTrackSegments = [];
for (let i = 0; i < yDefs.length - 1; i++) {
  const from = yDefs[i];
  const to = yDefs[i + 1];
  const pathNodes = bfsPath(yAdj, from.nodeId, to.nodeId);
  if (!pathNodes) {
    throw new Error(`Failed to find path between ${from.name} and ${to.name}`);
  }
  const coordinates = pathNodes.map(nid => {
    const n = yNodeMap.get(nid);
    return [n.lat, n.lon];
  });
  yTrackSegments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates,
  });
}

// ==========================================
// 2. 副都心線 (Fukutoshin Line)
// ==========================================
const fOsm = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_fukutoshin_full.json'), 'utf8'));
const fNodeMap = new Map();
fOsm.elements.filter(e => e.type === 'node').forEach(n => fNodeMap.set(n.id, n));
const fAdj = buildAdjGraph(fOsm.elements);

const fDefs = [
  {
    id: 'F-01', number: 1, name: '和光市', nameKana: 'わこうし', nameEn: 'Wakoshi',
    nodeId: 3645998146,
    transfers: ['東武東上線', '東京メトロ有楽町線'],
    address: '埼玉県和光市本町4-6',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'commuter_exp', 'express'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'F-02', number: 2, name: '地下鉄成増', nameKana: 'ちかてつなります', nameEn: 'Chikatetsu-narimasu',
    nodeId: 7775821589,
    transfers: ['東武東上線（成増駅）', '東京メトロ有楽町線'],
    address: '東京都練馬区旭町三丁目26-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'commuter_exp'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-03', number: 3, name: '地下鉄赤塚', nameKana: 'ちかてつあかつか', nameEn: 'Chikatetsu-akatsuka',
    nodeId: 7775801427,
    transfers: ['東武東上線（下赤塚駅）', '東京メトロ有楽町線'],
    address: '東京都練馬区北町八丁目37-16',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'commuter_exp'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-04', number: 4, name: '平和台', nameKana: 'へいわだい', nameEn: 'Heiwadai',
    nodeId: 7775791257,
    transfers: ['東京メトロ有楽町線'],
    address: '東京都練馬区平和台四丁目26-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'commuter_exp'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-05', number: 5, name: '氷川台', nameKana: 'ひかわだい', nameEn: 'Hikawadai',
    nodeId: 7775824110,
    transfers: ['東京メトロ有楽町線'],
    address: '東京都練馬区氷川台三丁目38-18',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'commuter_exp'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-06', number: 6, name: '小竹向原', nameKana: 'こたけむかいはら', nameEn: 'Kotake-mukaihara',
    nodeId: 7369435826,
    transfers: ['西武有楽町線', '東京メトロ有楽町線'],
    address: '東京都練馬区小竹町二丁目16-1',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'commuter_exp', 'express'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'F-07', number: 7, name: '千川', nameKana: 'せんかわ', nameEn: 'Senkawa',
    nodeId: 7775808125,
    transfers: ['東京メトロ有楽町線'],
    address: '東京都豊島区要町三丁目10-6',
    platforms: { inbound: '3番線', outbound: '4番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-08', number: 8, name: '要町', nameKana: 'かなめちょう', nameEn: 'Kanamecho',
    nodeId: 6213383387,
    transfers: ['東京メトロ有楽町線'],
    address: '東京都豊島区要町一丁目1-10',
    platforms: { inbound: '3番線', outbound: '4番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-09', number: 9, name: '池袋', nameKana: 'いけぶくろ', nameEn: 'Ikebukuro',
    nodeId: 1951959624,
    transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東武東上線', '西武池袋線', '東京メトロ丸ノ内線', '東京メトロ有楽町線'],
    address: '東京都豊島区西池袋三丁目28-14',
    platforms: { inbound: '5・6番線', outbound: '5・6番線' },
    stoppingTypes: ['local', 'commuter_exp', 'express'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'F-10', number: 10, name: '雑司が谷', nameKana: 'ぞうしがや', nameEn: 'Zoshigaya',
    nodeId: 6235968754,
    transfers: ['都電荒川線(鬼子母神前停留場)'],
    address: '東京都豊島区雑司が谷二丁目6-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-11', number: 11, name: '西早稲田', nameKana: 'にしわせだ', nameEn: 'Nishi-waseda',
    nodeId: 1951954570,
    transfers: [],
    address: '東京都新宿区戸山三丁目18-2',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-12', number: 12, name: '東新宿', nameKana: 'ひがししんじゅく', nameEn: 'Higashi-shinjuku',
    nodeId: 6188734706,
    transfers: ['都営大江戸線'],
    address: '東京都新宿区新宿七丁目27-11',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-13', number: 13, name: '新宿三丁目', nameKana: 'しんじゅくさんちょうめ', nameEn: 'Shinjuku-sanchome',
    nodeId: 1951952383,
    transfers: ['東京メトロ丸ノ内線', '都営新宿線'],
    address: '東京都新宿区新宿三丁目5-4',
    platforms: { inbound: '3・4番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'commuter_exp', 'express'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'F-14', number: 14, name: '北参道', nameKana: 'きたさんどう', nameEn: 'Kita-sando',
    nodeId: 7775803877,
    transfers: [],
    address: '東京都渋谷区千駄ヶ谷四丁目7-11',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local'], isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'F-15', number: 15, name: '明治神宮前〈原宿〉', nameKana: 'めいじじんぐうまえ', nameEn: "Meiji-jingumae 'Harajuku'",
    nodeId: 6178465936,
    transfers: ['JR山手線(原宿駅)', '東京メトロ千代田線'],
    address: '東京都渋谷区神宮前一丁目18-22',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'express'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'F-16', number: 16, name: '渋谷', nameKana: 'しぶや', nameEn: 'Shibuya',
    nodeId: 6219636708,
    transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東急東横線', '東急田園都市線', '京王井の頭線', '東京メトロ銀座線', '東京メトロ半蔵門線'],
    address: '東京都渋谷区渋谷二丁目21-13',
    platforms: { inbound: '3・4番線', outbound: '5・6番線' },
    stoppingTypes: ['local', 'commuter_exp', 'express'], isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
];

// 副都心線 駅リスト
const fStations = fDefs.map(d => {
  const n = fNodeMap.get(d.nodeId);
  return {
    id: d.id,
    lineId: 'fukutoshin',
    number: d.number,
    name: d.name,
    nameKana: d.nameKana,
    nameEn: d.nameEn,
    lat: n.lat,
    lng: n.lon,
    transfers: d.transfers,
    address: d.address,
    facilities: d.facilities,
    stoppingTypes: d.stoppingTypes,
    isMajor: d.isMajor,
    platforms: d.platforms,
  };
});

// 副都心線 セグメント生成
const fTrackSegments = [];
for (let i = 0; i < fDefs.length - 1; i++) {
  const from = fDefs[i];
  const to = fDefs[i + 1];
  const pathNodes = bfsPath(fAdj, from.nodeId, to.nodeId);
  if (!pathNodes) {
    throw new Error(`Failed to find path between ${from.name} and ${to.name}`);
  }
  const coordinates = pathNodes.map(nid => {
    const n = fNodeMap.get(nid);
    return [n.lat, n.lon];
  });
  fTrackSegments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates,
  });
}

// 監査関数: 点間距離と端点一致
function auditSegments(segments, stations, lineName) {
  console.log(`\n=== Auditing ${lineName} Segments ===`);
  let maxStep = 0;
  let totalDist = 0;

  for (let sIdx = 0; sIdx < segments.length; sIdx++) {
    const seg = segments[sIdx];
    const fromSt = stations.find(st => st.id === seg.fromStationId);
    const toSt = stations.find(st => st.id === seg.toStationId);

    // 端点乖離チェック
    const dStart = Math.hypot(seg.coordinates[0][0] - fromSt.lat, seg.coordinates[0][1] - fromSt.lng) * 111000;
    const dEnd = Math.hypot(seg.coordinates[seg.coordinates.length - 1][0] - toSt.lat, seg.coordinates[seg.coordinates.length - 1][1] - toSt.lng) * 111000;
    if (dStart > 10 || dEnd > 10) {
      console.warn(`  ⚠️ Endpoint mismatch in ${seg.fromName} -> ${seg.toName}: dStart=${dStart.toFixed(1)}m, dEnd=${dEnd.toFixed(1)}m`);
    }

    // 点間距離チェック
    for (let i = 0; i < seg.coordinates.length - 1; i++) {
      const p1 = seg.coordinates[i];
      const p2 = seg.coordinates[i + 1];
      const d = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) * 111000;
      totalDist += d;
      if (d > maxStep) maxStep = d;
      if (d > 500) {
        console.warn(`  ⚠️ Large jump in ${seg.fromName}->${seg.toName} at point ${i}: ${d.toFixed(1)}m`);
      }
    }
  }

  console.log(`  ✓ All ${segments.length} segments audited.`);
  console.log(`  ✓ Max point-to-point step: ${maxStep.toFixed(1)}m`);
  console.log(`  ✓ Total line length: ${(totalDist / 1000).toFixed(2)}km`);
}

auditSegments(yTrackSegments, yStations, '有楽町線');
auditSegments(fTrackSegments, fStations, '副都心線');

// 出力ディレクトリ作成 & 保存
const yDir = path.resolve(__dirname, '../src/data/lines/yurakucho');
const fDir = path.resolve(__dirname, '../src/data/lines/fukutoshin');
fs.mkdirSync(yDir, { recursive: true });
fs.mkdirSync(fDir, { recursive: true });

// 有楽町線 出力
fs.writeFileSync(path.join(yDir, 'stations.ts'), `// 東京メトロ有楽町線 駅メタデータ定義 (和光市 〜 新木場 全24駅)
import type { Station } from '../../../types';

export const YURAKUCHO_STATIONS: Station[] = ${JSON.stringify(yStations, null, 2)};
`, 'utf8');

fs.writeFileSync(path.join(yDir, 'trackGeometry.ts'), `// 東京メトロ有楽町線 線路幾何データ (和光市 〜 新木場 全23セグメント)
import type { TrackSegment } from '../../../types';

export const YURAKUCHO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(yTrackSegments, null, 2)};
`, 'utf8');

// 副都心線 出力
fs.writeFileSync(path.join(fDir, 'stations.ts'), `// 東京メトロ副都心線 駅メタデータ定義 (和光市 〜 渋谷 全16駅)
import type { Station } from '../../../types';

export const FUKUTOSHIN_STATIONS: Station[] = ${JSON.stringify(fStations, null, 2)};
`, 'utf8');

fs.writeFileSync(path.join(fDir, 'trackGeometry.ts'), `// 東京メトロ副都心線 線路幾何データ (和光市 〜 渋谷 全15セグメント)
import type { TrackSegment } from '../../../types';

export const FUKUTOSHIN_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(fTrackSegments, null, 2)};
`, 'utf8');

console.log('\n🎉 Successfully generated stations.ts and trackGeometry.ts for both Yurakucho and Fukutoshin lines!');
