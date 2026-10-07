const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_odakyu_raw.json'), 'utf8'));
const stRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_all_odakyu_stations.json'), 'utf8'));

const nodes = new Map();
const ways = new Map();
for (const el of raw.elements) {
  if (el.type === 'node') nodes.set(el.id, el);
  else if (el.type === 'way') ways.set(el.id, el);
}

function getDistance(c1, c2) {
  const R = 6371000;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// グラフ構築（全ウェイ、エッジ重み: 距離）
const adj = new Map();
for (const [wayId, w] of ways.entries()) {
  if (!w.nodes) continue;
  for (let i = 0; i < w.nodes.length - 1; i++) {
    const u = w.nodes[i];
    const v = w.nodes[i + 1];
    const nu = nodes.get(u);
    const nv = nodes.get(v);
    if (!nu || !nv) continue;
    const d = getDistance([nu.lat, nu.lon], [nv.lat, nv.lon]);
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u).push({ next: v, weight: d });
    adj.get(v).push({ next: u, weight: d });
  }
}

// メインコンポーネント特定
const visited = new Set();
const components = [];
for (const nodeId of adj.keys()) {
  if (visited.has(nodeId)) continue;
  const comp = [];
  const q = [nodeId];
  visited.add(nodeId);
  while (q.length > 0) {
    const curr = q.shift();
    comp.push(curr);
    for (const edge of adj.get(curr) || []) {
      if (!visited.has(edge.next)) {
        visited.add(edge.next);
        q.push(edge.next);
      }
    }
  }
  components.push(comp);
}
components.sort((a, b) => b.length - a.length);
const mainComponentNodes = new Set(components[0]);

class MinPriorityQueue {
  constructor() { this.heap = []; }
  push(node, priority) {
    this.heap.push({ node, priority });
    this._up(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._down(0);
    }
    return top;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i].priority < this.heap[p].priority) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[p];
        this.heap[p] = tmp;
        i = p;
      } else break;
    }
  }
  _down(i) {
    const len = this.heap.length;
    while ((i << 1) + 1 < len) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let best = i;
      if (this.heap[left].priority < this.heap[best].priority) best = left;
      if (right < len && this.heap[right].priority < this.heap[best].priority) best = right;
      if (best !== i) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[best];
        this.heap[best] = tmp;
        i = best;
      } else break;
    }
  }
  isEmpty() { return this.heap.length === 0; }
}

function findPathDijkstra(startNodeId, endNodeId) {
  if (startNodeId === endNodeId) return [startNodeId];
  const dist = new Map();
  const parent = new Map();
  const pq = new MinPriorityQueue();

  dist.set(startNodeId, 0);
  pq.push(startNodeId, 0);

  while (!pq.isEmpty()) {
    const { node: curr, priority: d } = pq.pop();
    if (curr === endNodeId) {
      const path = [];
      let step = endNodeId;
      while (step !== undefined) {
        path.push(step);
        if (step === startNodeId) break;
        step = parent.get(step);
      }
      return path.reverse();
    }
    if (d > (dist.get(curr) || Infinity)) continue;

    for (const edge of adj.get(curr) || []) {
      if (!mainComponentNodes.has(edge.next)) continue;
      const nextD = d + edge.weight;
      if (nextD < (dist.get(edge.next) || Infinity)) {
        dist.set(edge.next, nextD);
        parent.set(edge.next, curr);
        pq.push(edge.next, nextD);
      }
    }
  }
  return null;
}

function getStationCoord(name) {
  const matches = stRaw.elements.filter(e => e.tags?.name === name || e.tags?.name === `${name}駅`);
  const odakyuMatch = matches.find(m => m.tags?.operator?.includes('小田急')) || matches[0];
  if (!odakyuMatch) throw new Error(`Station not found: ${name}`);
  return [odakyuMatch.lat, odakyuMatch.lon];
}

function findNearestMainNode(coord) {
  let bestNode = null;
  let bestDist = Infinity;
  for (const nodeId of mainComponentNodes) {
    const n = nodes.get(nodeId);
    if (!n) continue;
    const d = getDistance(coord, [n.lat, n.lon]);
    if (d < bestDist) {
      bestDist = d;
      bestNode = nodeId;
    }
  }
  return { nodeId: bestNode, dist: bestDist };
}

// 駅定義マスタ
const ODAWARA_STATION_DEFS = [
  { id: 'OH-01', name: '新宿', nameKana: 'しんじゅく', nameEn: 'Shinjuku', address: '東京都新宿区西新宿一丁目1-3', transfers: ['JR山手線', 'JR埼京線', 'JR中央線', '京王線', '都営新宿線', '都営大江戸線', '東京メトロ丸ノ内線'], isMajor: true, platforms: { inbound: '1-6番線', outbound: '1-6番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp', 'limitedExp'] },
  { id: 'OH-02', name: '南新宿', nameKana: 'みなみしんじゅく', nameEn: 'Minami-Shinjuku', address: '東京都渋谷区代々木二丁目29-15', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-03', name: '参宮橋', nameKana: 'さんぐうばし', nameEn: 'Sangubashi', address: '東京都渋谷区代々木四丁目3-8', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-04', name: '代々木八幡', nameKana: 'よよぎはちまん', nameEn: 'Yoyogi-Hachiman', address: '東京都渋谷区代々木五丁目6-1', transfers: ['東京メトロ千代田線'], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-05', name: '代々木上原', nameKana: 'よよぎうえはら', nameEn: 'Yoyogi-Uehara', address: '東京都渋谷区西原三丁目8-5', transfers: ['東京メトロ千代田線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp', 'limitedExp'] },
  { id: 'OH-06', name: '東北沢', nameKana: 'ひがしきたざわ', nameEn: 'Higashi-Kitazawa', address: '東京都世田谷区北沢三丁目1-4', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-07', name: '下北沢', nameKana: 'しもきたざわ', nameEn: 'Shimo-Kitazawa', address: '東京都世田谷区北沢二丁目24-2', transfers: ['京王井の頭線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
  { id: 'OH-08', name: '世田谷代田', nameKana: 'せたがやだいた', nameEn: 'Setagaya-Daita', address: '東京都世田谷区代田二丁目31-12', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-09', name: '梅ヶ丘', nameKana: 'うめがおか', nameEn: 'Umegaoka', address: '東京都世田谷区梅丘一丁目24-10', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-10', name: '豪徳寺', nameKana: 'ごうとくじ', nameEn: 'Gotokuji', address: '東京都世田谷区豪徳寺一丁目43-2', transfers: ['東急世田谷線'], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-11', name: '経堂', nameKana: 'きょうどう', nameEn: 'Kyodo', address: '東京都世田谷区経堂二丁目1-3', transfers: [], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express'] },
  { id: 'OH-12', name: '千歳船橋', nameKana: 'ちとせふなばし', nameEn: 'Chitose-Funabashi', address: '東京都世田谷区船橋一丁目1-2', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-13', name: '祖師ヶ谷大蔵', nameKana: 'そしがやおおくら', nameEn: 'Soshigaya-Okura', address: '東京都世田谷区砧三丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-14', name: '成城学園前', nameKana: 'せいじょうがくえんまえ', nameEn: 'Seijogakuen-mae', address: '東京都世田谷区成城六丁目5-34', transfers: [], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'limitedExp'] },
  { id: 'OH-15', name: '喜多見', nameKana: 'きたみ', nameEn: 'Kitami', address: '東京都世田谷区喜多見九丁目2-11', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-16', name: '狛江', nameKana: 'こまえ', nameEn: 'Komae', address: '東京都狛江市東和泉一丁目17-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-17', name: '和泉多摩川', nameKana: 'いずみたまがわ', nameEn: 'Izumi-Tamagawa', address: '東京都狛江市東和泉三丁目11-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-18', name: '登戸', nameKana: 'のぼりと', nameEn: 'Noborito', address: '神奈川県川崎市多摩区登戸3435', transfers: ['JR南武線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
  { id: 'OH-19', name: '向ヶ丘遊園', nameKana: 'むこうがおかゆうえん', nameEn: 'Mukogaoka-Yuen', address: '神奈川県川崎市多摩区登戸2099', transfers: [], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'limitedExp'] },
  { id: 'OH-20', name: '生田', nameKana: 'いくた', nameEn: 'Ikuta', address: '神奈川県川崎市多摩区生田七丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-21', name: '読売ランド前', nameKana: 'よみうりらんどまえ', nameEn: 'Yomiuriland-mae', address: '神奈川県川崎市麻生区西生田三丁目8-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-22', name: '百合ヶ丘', nameKana: 'ゆりがおか', nameEn: 'Yurigaoka', address: '神奈川県川崎市麻生区百合丘一丁目21-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-23', name: '新百合ヶ丘', nameKana: 'しんゆりがおか', nameEn: 'Shin-Yurigaoka', address: '神奈川県川崎市麻生区万福寺一丁目18-1', transfers: ['小田急多摩線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4・5・6番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp', 'limitedExp'] },
  { id: 'OH-24', name: '柿生', nameKana: 'かきお', nameEn: 'Kakio', address: '神奈川県川崎市麻生区上麻生五丁目43-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-25', name: '鶴川', nameKana: 'つるかわ', nameEn: 'Tsurukawa', address: '東京都町田市能ヶ谷一丁目6-1', transfers: [], platforms: { inbound: '1番線', outbound: '2・3番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-26', name: '玉川学園前', nameKana: 'たまがわがくえんまえ', nameEn: 'Tamagawagakuen-mae', address: '東京都町田市玉川学園二丁目21-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-27', name: '町田', nameKana: 'まちだ', nameEn: 'Machida', address: '東京都町田市原町田六丁目1-1', transfers: ['JR横浜線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-28', name: '相模大野', nameKana: 'さがみおおの', nameEn: 'Sagami-Ono', address: '神奈川県相模原市南区相模大野三丁目8-1', transfers: ['小田急江ノ島線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-29', name: '小田急相模原', nameKana: 'おだきゅうさがみはら', nameEn: 'Odakyu-Sagamihara', address: '神奈川県相模原市南区南台三丁目20-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-30', name: '相武台前', nameKana: 'そうぶだいまえ', nameEn: 'Sobudai-mae', address: '神奈川県座間市相武台一丁目33-1', transfers: [], platforms: { inbound: '1・2番線', outbound: '3番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-31', name: '座間', nameKana: 'ざま', nameEn: 'Zama', address: '神奈川県座間市入谷東三丁目60-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-32', name: '海老名', nameKana: 'えびな', nameEn: 'Ebina', address: '神奈川県海老名市めぐみ町1-1', transfers: ['相鉄本線', 'JR相模線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-33', name: '厚木', nameKana: 'あつぎ', nameEn: 'Atsugi', address: '神奈川県海老名市河原口一丁目1-1', transfers: ['JR相模線'], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OH-34', name: '本厚木', nameKana: 'ほんあつぎ', nameEn: 'Hon-Atsugi', address: '神奈川県厚木市泉町1-1', transfers: [], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-35', name: '愛甲石田', nameKana: 'あいこういしだ', nameEn: 'Aiko-Ishida', address: '神奈川県厚木市愛甲一丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp'] },
  { id: 'OH-36', name: '伊勢原', nameKana: 'いせはら', nameEn: 'Isehara', address: '神奈川県伊勢原市桜台一丁目1-7', transfers: [], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-37', name: '鶴巻温泉', nameKana: 'つるまきおんせん', nameEn: 'Tsurumaki-Onsen', address: '神奈川県秦野市鶴巻北二丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp'] },
  { id: 'OH-38', name: '東海大学前', nameKana: 'とうかいだいがくまえ', nameEn: 'Tokaidaigaku-mae', address: '神奈川県秦野市南矢名一丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp'] },
  { id: 'OH-39', name: '秦野', nameKana: 'はだの', nameEn: 'Hadano', address: '神奈川県秦野市大秦町1-1', transfers: [], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-40', name: '渋沢', nameKana: 'しぶさわ', nameEn: 'Shibusawa', address: '神奈川県秦野市曲松一丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp'] },
  { id: 'OH-41', name: '新松田', nameKana: 'しんまつだ', nameEn: 'Shin-Matsuda', address: '神奈川県足柄上郡松田町松田惣領1356', transfers: ['JR御殿場線 (松田駅)'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semiExp', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OH-42', name: '開成', nameKana: 'かいせい', nameEn: 'Kaisei', address: '神奈川県足柄上郡開成町吉田島4300-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'express'] },
  { id: 'OH-43', name: '栢山', nameKana: 'かやま', nameEn: 'Kayama', address: '神奈川県小田原市栢山2630', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-44', name: '富水', nameKana: 'とみず', nameEn: 'Tomizu', address: '神奈川県小田原市堀之内184', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-45', name: '螢田', nameKana: 'ほたるだ', nameEn: 'Hotaruda', address: '神奈川県小田原市蓮正寺308', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OH-46', name: '足柄', nameKana: 'あしがら', nameEn: 'Ashigara', address: '神奈川県小田原市扇町三丁目24-1', transfers: [], platforms: { inbound: '1・2番線', outbound: '3番線' }, stoppingTypes: ['local'] },
  { id: 'OH-47', name: '小田原', nameKana: 'おだわら', nameEn: 'Odawara', address: '神奈川県小田原市栄町一丁目1-1', transfers: ['JR東海道線', 'JR東海道新幹線', '箱根登山電車', '伊豆箱根鉄道大雄山線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '7-11番線' }, stoppingTypes: ['local', 'express', 'rapidExp', 'limitedExp'] },
];

const ENOSHIMA_STATION_DEFS = [
  { id: 'OH-28', name: '相模大野', nameKana: 'さがみおおの', nameEn: 'Sagami-Ono', address: '神奈川県相模原市南区相模大野三丁目8-1', transfers: ['小田急小田原線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OE-01', name: '東林間', nameKana: 'ひがしりんかん', nameEn: 'Higashi-Rinkan', address: '神奈川県相模原市南区上鶴間七丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-02', name: '中央林間', nameKana: 'ちゅうおうりんかん', nameEn: 'Chuo-Rinkan', address: '神奈川県大和市中央林間四丁目6-3', transfers: ['東急田園都市線'], isMajor: true, platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'express', 'rapidExp'] },
  { id: 'OE-03', name: '南林間', nameKana: 'みなみりんかん', nameEn: 'Minami-Rinkan', address: '神奈川県大和市南林間一丁目6-11', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'express'] },
  { id: 'OE-04', name: '鶴間', nameKana: 'つるま', nameEn: 'Tsuruma', address: '神奈川県大和市西鶴間一丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-05', name: '大和', nameKana: 'やまと', nameEn: 'Yamato', address: '神奈川県大和市大和南一丁目1-1', transfers: ['相鉄本線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OE-06', name: '桜ヶ丘', nameKana: 'さくらがおか', nameEn: 'Sakuragaoka', address: '神奈川県大和市福田一丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-07', name: '高座渋谷', nameKana: 'こうざしぶや', nameEn: 'Koza-Shibuya', address: '神奈川県大和市福田2019', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-08', name: '長後', nameKana: 'ちょうご', nameEn: 'Chogo', address: '神奈川県藤沢市下土棚472', transfers: [], platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'express'] },
  { id: 'OE-09', name: '湘南台', nameKana: 'しょうなんだい', nameEn: 'Shonandai', address: '神奈川県藤沢市湘南台二丁目15', transfers: ['相鉄いずみ野線', '横浜市営地下鉄ブルーライン'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3番線' }, stoppingTypes: ['local', 'express', 'rapidExp'] },
  { id: 'OE-10', name: '六会日大前', nameKana: 'むつあいにちだいまえ', nameEn: 'Mutsuai-Nichidaimae', address: '神奈川県藤沢市亀井野一丁目1-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-11', name: '善行', nameKana: 'ぜんぎょう', nameEn: 'Zengyo', address: '神奈川県藤沢市善行一丁目26-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-12', name: '藤沢本町', nameKana: 'ふじさわほんまち', nameEn: 'Fujisawa-Hommachi', address: '神奈川県藤沢市藤沢三丁目3-3', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-13', name: '藤沢', nameKana: 'ふじさわ', nameEn: 'Fujisawa', address: '神奈川県藤沢市南藤沢1-1', transfers: ['JR東海道線', '江ノ島電鉄線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'express', 'rapidExp', 'limitedExp'] },
  { id: 'OE-14', name: '本鵠沼', nameKana: 'ほんくげぬま', nameEn: 'Hon-Kugenuma', address: '神奈川県藤沢市本鵠沼二丁目13-11', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-15', name: '鵠沼海岸', nameKana: 'くげぬまかいがん', nameEn: 'Kugenuma-Kaigan', address: '神奈川県藤沢市鵠沼海岸二丁目4-10', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'OE-16', name: '片瀬江ノ島', nameKana: 'かたせえのしま', nameEn: 'Katase-Enoshima', address: '神奈川県藤沢市片瀬海岸二丁目15-3', transfers: ['湘南モノレール (湘南江の島駅)', '江ノ島電鉄 (江ノ島駅)'], isMajor: true, platforms: { inbound: '1-3番線', outbound: '1-3番線' }, stoppingTypes: ['local', 'express', 'rapidExp', 'limitedExp'] },
];

const TAMA_STATION_DEFS = [
  { id: 'OH-23', name: '新百合ヶ丘', nameKana: 'しんゆりがおか', nameEn: 'Shin-Yurigaoka', address: '神奈川県川崎市麻生区万福寺一丁目18-1', transfers: ['小田急小田原線'], isMajor: true, platforms: { inbound: '1・2番線', outbound: '3・4・5・6番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
  { id: 'OT-01', name: '五月台', nameKana: 'さつきだい', nameEn: 'Satsukidai', address: '神奈川県川崎市麻生区五力田三丁目22-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OT-02', name: '栗平', nameKana: 'くりひら', nameEn: 'Kurihira', address: '神奈川県川崎市麻生区栗平二丁目1-1', transfers: [], isMajor: true, platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
  { id: 'OT-03', name: '黒川', nameKana: 'くろかわ', nameEn: 'Kurokawa', address: '神奈川県川崎市麻生区南黒川40', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OT-04', name: 'はるひ野', nameKana: 'はるひの', nameEn: 'Haruhino', address: '神奈川県川崎市麻生区はるひ野四丁目8-1', transfers: [], platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi'] },
  { id: 'OT-05', name: '小田急永山', nameKana: 'おだきゅうながやま', nameEn: 'Odakyu Nagayama', address: '東京都多摩市永山一丁目18-2', transfers: ['京王相模原線 (京王永山駅)'], isMajor: true, platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
  { id: 'OT-06', name: '小田急多摩センター', nameKana: 'おだきゅうたませんたー', nameEn: 'Odakyu Tama Center', address: '東京都多摩市落合一丁目11-2', transfers: ['京王相模原線 (京王多摩センター駅)', '多摩都市モノレール'], isMajor: true, platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
  { id: 'OT-07', name: '唐木田', nameKana: 'からきだ', nameEn: 'Karakida', address: '東京都多摩市唐木田一丁目1-1', transfers: [], isMajor: true, platforms: { inbound: '1-3番線', outbound: '1-3番線' }, stoppingTypes: ['local', 'semiExp', 'commuter_semi', 'express', 'commuter_exp', 'rapidExp'] },
];

function generateLineData(lineId, defs, originName, destName, outDir) {
  console.log(`\n================== Generating ${lineId} ==================`);
  
  // 1. 起点駅から終点駅への完全1本の本線パスを算出
  const nOrigin = findNearestMainNode(getStationCoord(originName));
  const nDest = findNearestMainNode(getStationCoord(destName));
  const continuousPath = findPathDijkstra(nOrigin.nodeId, nDest.nodeId);
  if (!continuousPath) {
    throw new Error(`Failed to find continuous path for ${lineId}`);
  }
  console.log(`Continuous path: ${continuousPath.length} nodes from ${originName} to ${destName}`);

  const pathCoords = continuousPath.map(nId => {
    const n = nodes.get(nId);
    return [n.lat, n.lon];
  });

  // 2. 各駅を連続パス上に単調増加順でスナップ
  const snappedIndices = [];
  let searchStartIdx = 0;

  for (let i = 0; i < defs.length; i++) {
    const def = defs[i];
    const c = getStationCoord(def.name);

    if (i === 0) {
      snappedIndices.push(0);
      continue;
    }
    if (i === defs.length - 1) {
      snappedIndices.push(pathCoords.length - 1);
      continue;
    }

    let bestIdx = searchStartIdx;
    let bestDist = Infinity;

    // 次の探索範囲: searchStartIdx から終点まで
    for (let k = searchStartIdx; k < pathCoords.length; k++) {
      const d = getDistance(c, pathCoords[k]);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = k;
      }
    }

    snappedIndices.push(bestIdx);
    searchStartIdx = bestIdx; // 単調増加を保証
    console.log(`Station ${def.id} ${def.name}: snapped at index ${bestIdx}/${pathCoords.length - 1} (dist: ${bestDist.toFixed(1)}m)`);
  }

  // 3. 駅メタデータの構築（駅座標はスナップされた本線座標を使用）
  const stations = [];
  for (let i = 0; i < defs.length; i++) {
    const def = defs[i];
    const sIdx = snappedIndices[i];
    const trackCoord = pathCoords[sIdx];

    stations.push({
      id: def.id,
      lineId,
      number: i + 1,
      name: def.name,
      nameKana: def.nameKana,
      nameEn: def.nameEn,
      lat: trackCoord[0],
      lng: trackCoord[1],
      transfers: def.transfers,
      address: def.address,
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: false,
        ticketOffice: true,
      },
      stoppingTypes: def.stoppingTypes,
      platforms: def.platforms,
      ...(def.isMajor ? { isMajor: true } : {}),
    });
  }

  // 4. 駅間 TrackSegment の生成 (スライス)
  const segments = [];
  let totalTrackDist = 0;

  for (let i = 0; i < defs.length - 1; i++) {
    const fromSt = defs[i];
    const toSt = defs[i + 1];
    const fromIdx = snappedIndices[i];
    const toIdx = snappedIndices[i + 1];

    let segCoords = pathCoords.slice(fromIdx, toIdx + 1);
    if (segCoords.length < 2) {
      console.warn(`Warning: Segment ${fromSt.name} -> ${toSt.name} has only ${segCoords.length} points! Duplicating point.`);
      segCoords = [pathCoords[fromIdx], pathCoords[toIdx]];
    }

    let segDist = 0;
    let maxGap = 0;
    for (let j = 0; j < segCoords.length - 1; j++) {
      const d = getDistance(segCoords[j], segCoords[j + 1]);
      segDist += d;
      if (d > maxGap) maxGap = d;
    }
    totalTrackDist += segDist;

    const straightDist = getDistance(segCoords[0], segCoords[segCoords.length - 1]);
    const sinuosity = straightDist > 0 ? segDist / straightDist : 1.0;
    console.log(`Segment ${fromSt.id} -> ${toSt.id} (${fromSt.name} -> ${toSt.name}): ${segCoords.length} pts, ${(segDist / 1000).toFixed(2)} km (ratio: ${sinuosity.toFixed(2)}, max gap: ${maxGap.toFixed(1)}m)`);

    segments.push({
      fromStationId: fromSt.id,
      toStationId: toSt.id,
      fromName: fromSt.name,
      toName: toSt.name,
      coordinates: segCoords,
    });
  }

  console.log(`Total track length for ${lineId}: ${(totalTrackDist / 1000).toFixed(2)} km`);

  // 5. ファイル出力
  fs.mkdirSync(outDir, { recursive: true });
  const constNameUpper = lineId.toUpperCase();
  const stContent = `// ${lineId} 駅メタデータ定義\nimport type { Station } from '../../../types';\n\nexport const ${constNameUpper}_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stContent, 'utf8');

  const trContent = `// ${lineId} 線路軌道ジオメトリ\nimport type { TrackSegment } from '../../../types';\n\nexport const ${constNameUpper}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trContent, 'utf8');

  console.log(`Saved stations.ts and trackGeometry.ts to ${outDir}`);
}

generateLineData('odakyu_odawara', ODAWARA_STATION_DEFS, '新宿', '小田原', path.resolve('src/data/lines/odakyu_odawara'));
generateLineData('odakyu_enoshima', ENOSHIMA_STATION_DEFS, '相模大野', '片瀬江ノ島', path.resolve('src/data/lines/odakyu_enoshima'));
generateLineData('odakyu_tama', TAMA_STATION_DEFS, '新百合ヶ丘', '唐木田', path.resolve('src/data/lines/odakyu_tama'));
