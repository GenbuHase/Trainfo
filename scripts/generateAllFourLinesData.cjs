const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_sotetsu_tokyu_raw.json', 'utf8'));

const nodeMap = new Map();
const wayMap = new Map();
for (const el of raw.elements) {
  if (el.type === 'node') nodeMap.set(el.id, [el.lat, el.lon]);
  else if (el.type === 'way') wayMap.set(el.id, el);
}

function dist(p1, p2) {
  const dy = (p1[0] - p2[0]) * 111320;
  const dx = (p1[1] - p2[1]) * 111320 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

// Subdivide long gaps so trains move smoothly (max step ~60m)
function smoothCoordinates(coords, maxStep = 60) {
  if (!coords || coords.length < 2) return coords;
  const result = [coords[0]];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const d = dist(p1, p2);
    if (d > maxStep) {
      const steps = Math.ceil(d / maxStep);
      for (let s = 1; s < steps; s++) {
        const ratio = s / steps;
        result.push([
          p1[0] + (p2[0] - p1[0]) * ratio,
          p1[1] + (p2[1] - p1[1]) * ratio,
        ]);
      }
    }
    result.push(p2);
  }
  return result;
}


// -------------------------------------------------------------
// 1. 東急新横浜線 (tokyu_shin_yokohama)
// -------------------------------------------------------------
function buildTokyuShinYokohama() {
  const rel = raw.elements.find(e => e.id === 14681765);
  const ways = rel.members.filter(m => m.type === 'way').map(m => wayMap.get(m.ref)).filter(Boolean);

  const adj = new Map();
  for (const w of ways) {
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      if (!adj.has(u)) adj.set(u, new Set());
      if (!adj.has(v)) adj.set(v, new Set());
      adj.get(u).add(v);
      adj.get(v).add(u);
    }
  }

  function findClosest(targetCoord) {
    let closest = null, minDist = Infinity;
    for (const nid of adj.keys()) {
      const c = nodeMap.get(nid);
      if (!c) continue;
      const d = dist(targetCoord, c);
      if (d < minDist) { minDist = d; closest = nid; }
    }
    return closest;
  }

  function bfs(start, target) {
    if (start === target) return [start];
    const queue = [start], visited = new Set([start]), parent = new Map();
    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur === target) {
        const path = [];
        let c = target;
        while (c !== undefined) { path.push(c); c = parent.get(c); }
        return path.reverse();
      }
      for (const n of (adj.get(cur) || [])) {
        if (!visited.has(n)) { visited.add(n); parent.set(n, cur); queue.push(n); }
      }
    }
    return null;
  }

  const stations = [
    {
      id: 'SH-03', lineId: 'tokyu_shin_yokohama', number: 1,
      name: '日吉', nameKana: 'ひよし', nameEn: 'Hiyoshi',
      lat: 35.5534595, lng: 139.646943,
      transfers: ['東急東横線', '東急目黒線', '横浜市営地下鉄グリーンライン'],
      address: '神奈川県横浜市港北区日吉二丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'express'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' },
      isMajor: true,
    },
    {
      id: 'SH-02', lineId: 'tokyu_shin_yokohama', number: 2,
      name: '新綱島', nameKana: 'しんつなしま', nameEn: 'Shin-tsunashima',
      lat: 35.535865, lng: 139.6361262,
      transfers: ['東急東横線(綱島駅)'],
      address: '神奈川県横浜市港北区綱島東一丁目9-10',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'express'],
      platforms: { inbound: '1番線', outbound: '2番線' },
      isMajor: false,
    },
    {
      id: 'SH-01', lineId: 'tokyu_shin_yokohama', number: 3,
      name: '新横浜', nameKana: 'しんよこはま', nameEn: 'Shin-yokohama',
      lat: 35.5088707, lng: 139.6171662,
      transfers: ['JR東海道新幹線', 'JR横浜線', '相鉄新横浜線', '横浜市営地下鉄ブルーライン'],
      address: '神奈川県横浜市港北区新横浜三丁目',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'express'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' },
      isMajor: true,
    },
  ];

  const snap1 = findClosest([stations[0].lat, stations[0].lng]);
  const snap2 = findClosest([stations[1].lat, stations[1].lng]);
  const snap3 = findClosest([stations[2].lat, stations[2].lng]);

  const p1 = bfs(snap1, snap2);
  const p2 = bfs(snap2, snap3);

  const seg1Coords = smoothCoordinates(p1.map(nid => nodeMap.get(nid)));
  const seg2Coords = smoothCoordinates(p2.map(nid => nodeMap.get(nid)));

  const trackSegments = [
    { fromStationId: 'SH-03', toStationId: 'SH-02', fromName: '日吉', toName: '新綱島', coordinates: seg1Coords },
    { fromStationId: 'SH-02', toStationId: 'SH-01', fromName: '新綱島', toName: '新横浜', coordinates: seg2Coords },
  ];

  return { stations, trackSegments };
}

// -------------------------------------------------------------
// 2. 相鉄新横浜線 (sotetsu_shin_yokohama)
// -------------------------------------------------------------
function buildSotetsuShinYokohama() {
  const rel1 = raw.elements.find(e => e.id === 14681763);
  const rel2 = raw.elements.find(e => e.id === 14681764);
  const ways = [...rel1.members, ...rel2.members].filter(m => m.type === 'way').map(m => wayMap.get(m.ref)).filter(Boolean);

  const adj = new Map();
  for (const w of ways) {
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      if (!adj.has(u)) adj.set(u, new Set());
      if (!adj.has(v)) adj.set(v, new Set());
      adj.get(u).add(v);
      adj.get(v).add(u);
    }
  }

  function findClosest(targetCoord) {
    let closest = null, minDist = Infinity;
    for (const nid of adj.keys()) {
      const c = nodeMap.get(nid);
      if (!c) continue;
      const d = dist(targetCoord, c);
      if (d < minDist) { minDist = d; closest = nid; }
    }
    return closest;
  }

  function bfs(start, target) {
    if (start === target) return [start];
    const queue = [start], visited = new Set([start]), parent = new Map();
    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur === target) {
        const path = [];
        let c = target;
        while (c !== undefined) { path.push(c); c = parent.get(c); }
        return path.reverse();
      }
      for (const n of (adj.get(cur) || [])) {
        if (!visited.has(n)) { visited.add(n); parent.set(n, cur); queue.push(n); }
      }
    }
    return null;
  }

  const stations = [
    {
      id: 'SO-52', lineId: 'sotetsu_shin_yokohama', number: 1,
      name: '新横浜', nameKana: 'しんよこはま', nameEn: 'Shin-yokohama',
      lat: 35.5088707, lng: 139.6171662,
      transfers: ['JR東海道新幹線', 'JR横浜線', '東急新横浜線', '横浜市営地下鉄ブルーライン'],
      address: '神奈川県横浜市港北区新横浜三丁目',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'express', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' },
      isMajor: true,
    },
    {
      id: 'SO-51', lineId: 'sotetsu_shin_yokohama', number: 2,
      name: '羽沢横浜国大', nameKana: 'はざわよこはまこくだい', nameEn: 'Hazawa yokohama-kokudai',
      lat: 35.4812677, lng: 139.5862425,
      transfers: ['JR埼京線(相鉄・JR直通線)'],
      address: '神奈川県横浜市神奈川区羽沢南二丁目44',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'express', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' },
      isMajor: true,
    },
    {
      id: 'SO-08', lineId: 'sotetsu_shin_yokohama', number: 3,
      name: '西谷', nameKana: 'にしや', nameEn: 'Nishiya',
      lat: 35.4780622, lng: 139.5654649,
      transfers: ['相鉄本線'],
      address: '神奈川県横浜市保土ケ谷区西谷町1101',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'express', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' },
      isMajor: true,
    },
  ];

  const snap1 = findClosest([stations[0].lat, stations[0].lng]);
  const snap2 = findClosest([stations[1].lat, stations[1].lng]);
  const snap3 = findClosest([stations[2].lat, stations[2].lng]);

  const p1 = bfs(snap1, snap2);
  const p2 = bfs(snap2, snap3);

  const seg1Coords = smoothCoordinates(p1.map(nid => nodeMap.get(nid)));
  const seg2Coords = smoothCoordinates(p2.map(nid => nodeMap.get(nid)));


  const trackSegments = [
    { fromStationId: 'SO-52', toStationId: 'SO-51', fromName: '新横浜', toName: '羽沢横浜国大', coordinates: seg1Coords },
    { fromStationId: 'SO-51', toStationId: 'SO-08', fromName: '羽沢横浜国大', toName: '西谷', coordinates: seg2Coords },
  ];

  return { stations, trackSegments };
}

// -------------------------------------------------------------
// 3. 相鉄本線 (sotetsu_main)
// -------------------------------------------------------------
function buildSotetsuMain() {
  const rel = raw.elements.find(e => e.id === 10358686);
  const trackWays = rel.members.filter(m => m.type === 'way').slice(15).map(m => wayMap.get(m.ref));

  const continuousNodes = [];
  for (let i = 0; i < trackWays.length; i++) {
    const w = trackWays[i];
    const nodes = w.nodes;
    if (i === 0) {
      continuousNodes.push(...nodes);
    } else {
      const lastNode = continuousNodes[continuousNodes.length - 1];
      if (nodes[0] === lastNode) {
        continuousNodes.push(...nodes.slice(1));
      } else if (nodes[nodes.length - 1] === lastNode) {
        continuousNodes.push(...[...nodes].reverse().slice(1));
      } else {
        throw new Error(`Main way ${i} not connected!`);
      }
    }
  }

  const coords = continuousNodes.map(nid => nodeMap.get(nid)).filter(Boolean);

  const stations = [
    {
      id: 'SO-01', lineId: 'sotetsu_main', number: 1, name: '横浜', nameKana: 'よこはま', nameEn: 'Yokohama',
      lat: 35.4651573, lng: 139.6209776,
      transfers: ['JR東海道線', 'JR京浜東北線', 'JR横須賀線', 'JR湘南新宿ライン', '東急東横線', '京急本線', 'みなとみらい線', '横浜市営地下鉄ブルーライン'],
      address: '神奈川県横浜市西区南幸一丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2・3番線', outbound: '1・2・3番線' }, isMajor: true,
    },
    {
      id: 'SO-02', lineId: 'sotetsu_main', number: 2, name: '平沼橋', nameKana: 'ひらぬまばし', nameEn: 'Hiranumabashi',
      lat: 35.4599264, lng: 139.6165229, transfers: [],
      address: '神奈川県横浜市西区西平沼町2-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-03', lineId: 'sotetsu_main', number: 3, name: '西横浜', nameKana: 'にしよこはま', nameEn: 'Nishi-yokohama',
      lat: 35.4535117, lng: 139.6088013, transfers: [],
      address: '神奈川県横浜市西区西平沼町6-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-04', lineId: 'sotetsu_main', number: 4, name: '天王町', nameKana: 'てんのうちょう', nameEn: 'Tennocho',
      lat: 35.4540085, lng: 139.6026888, transfers: [],
      address: '神奈川県横浜市保土ケ谷区天王町二丁目45-40',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-05', lineId: 'sotetsu_main', number: 5, name: '星川', nameKana: 'ほしかわ', nameEn: 'Hoshikawa',
      lat: 35.4588221, lng: 139.5946793, transfers: [],
      address: '神奈川県横浜市保土ケ谷区星川一丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'commuter_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: true,
    },
    {
      id: 'SO-06', lineId: 'sotetsu_main', number: 6, name: '和田町', nameKana: 'わだまち', nameEn: 'Wadamachi',
      lat: 35.4637861, lng: 139.5864138, transfers: [],
      address: '神奈川県横浜市保土ケ谷区仏向町20',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-07', lineId: 'sotetsu_main', number: 7, name: '上星川', nameKana: 'かみほしかわ', nameEn: 'Kamihoshikawa',
      lat: 35.467445, lng: 139.580335, transfers: [],
      address: '神奈川県横浜市保土ケ谷区上星川二丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-08', lineId: 'sotetsu_main', number: 8, name: '西谷', nameKana: 'にしや', nameEn: 'Nishiya',
      lat: 35.4780622, lng: 139.5654649, transfers: ['相鉄新横浜線'],
      address: '神奈川県横浜市保土ケ谷区西谷町1101',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: true,
    },
    {
      id: 'SO-09', lineId: 'sotetsu_main', number: 9, name: '鶴ヶ峰', nameKana: 'つるがみね', nameEn: 'Tsurugamine',
      lat: 35.4750458, lng: 139.5496591, transfers: [],
      address: '神奈川県横浜市旭区鶴ヶ峰二丁目22-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express', 'commuter_exp', 'commuter_ltd_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-10', lineId: 'sotetsu_main', number: 10, name: '二俣川', nameKana: 'ふたまたがわ', nameEn: 'Futamatagawa',
      lat: 35.4633846, lng: 139.5322757, transfers: ['相鉄いずみ野線'],
      address: '神奈川県横浜市旭区二俣川二丁目91-7',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: true,
    },
    {
      id: 'SO-11', lineId: 'sotetsu_main', number: 11, name: '希望ヶ丘', nameKana: 'きぼうがおか', nameEn: 'Kibogaoka',
      lat: 35.4606724, lng: 139.5134001, transfers: [],
      address: '神奈川県横浜市旭区中希望が丘244',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-12', lineId: 'sotetsu_main', number: 12, name: '三ツ境', nameKana: 'みつきょう', nameEn: 'Mitsukyo',
      lat: 35.4679494, lng: 139.5022796, transfers: [],
      address: '神奈川県横浜市瀬谷区三ツ境40',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-13', lineId: 'sotetsu_main', number: 13, name: '瀬谷', nameKana: 'せや', nameEn: 'Seya',
      lat: 35.4705267, lng: 139.4828959, transfers: [],
      address: '神奈川県横浜市瀬谷区瀬谷四丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: false,
    },
    {
      id: 'SO-14', lineId: 'sotetsu_main', number: 14, name: '大和', nameKana: 'やまと', nameEn: 'Yamato',
      lat: 35.4700147, lng: 139.4614084, transfers: ['小田急江ノ島線'],
      address: '神奈川県大和市大和南一丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: true,
    },
    {
      id: 'SO-15', lineId: 'sotetsu_main', number: 15, name: '相模大塚', nameKana: 'さがみおおつか', nameEn: 'Sagami-otsuka',
      lat: 35.4706234, lng: 139.441079, transfers: [],
      address: '神奈川県大和市桜森二丁目1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'rapid', 'express'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-16', lineId: 'sotetsu_main', number: 16, name: 'さがみ野', nameKana: 'さがみの', nameEn: 'Sagamino',
      lat: 35.4715402, lng: 139.4285206, transfers: [],
      address: '神奈川県海老名市東柏ケ谷二丁目30-28',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-17', lineId: 'sotetsu_main', number: 17, name: 'かしわ台', nameKana: 'かしわだい', nameEn: 'Kashiwadai',
      lat: 35.4668983, lng: 139.415601, transfers: [],
      address: '神奈川県海老名市柏ケ谷1002',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: false,
    },
    {
      id: 'SO-18', lineId: 'sotetsu_main', number: 18, name: '海老名', nameKana: 'えびな', nameEn: 'Ebina',
      lat: 35.4530251, lng: 139.3917889, transfers: ['小田急小田原線', 'JR相模線'],
      address: '神奈川県海老名市めぐみ町1-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'express', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '1・2番線' }, isMajor: true,
    },
  ];

  // Snap station coordinates to continuous path and slice segments
  const snapIndices = [];
  stations.forEach(st => {
    let bestIdx = 0, bestDist = Infinity;
    for (let idx = 0; idx < coords.length; idx++) {
      const d = dist([st.lat, st.lng], coords[idx]);
      if (d < bestDist) { bestDist = d; bestIdx = idx; }
    }
    snapIndices.push(bestIdx);
  });

  const trackSegments = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const s1 = stations[i];
    const s2 = stations[i + 1];
    const idx1 = snapIndices[i];
    const idx2 = snapIndices[i + 1];
    const segCoords = smoothCoordinates(coords.slice(idx1, idx2 + 1));
    trackSegments.push({
      fromStationId: s1.id,
      toStationId: s2.id,
      fromName: s1.name,
      toName: s2.name,
      coordinates: segCoords,
    });
  }

  return { stations, trackSegments };
}

// -------------------------------------------------------------
// 4. 相鉄いずみ野線 (sotetsu_izumino)
// -------------------------------------------------------------
function buildSotetsuIzumino() {
  const rel = raw.elements.find(e => e.id === 1968180);
  const wayMembers = rel.members.filter(m => m.type === 'way');
  const trackWays = wayMembers.slice(37, 66).map(m => wayMap.get(m.ref));

  const continuousNodes = [];
  for (let i = 0; i < trackWays.length; i++) {
    const w = trackWays[i];
    const nodes = w.nodes;
    if (i === 0) {
      continuousNodes.push(...nodes);
    } else {
      const lastNode = continuousNodes[continuousNodes.length - 1];
      if (nodes[0] === lastNode) {
        continuousNodes.push(...nodes.slice(1));
      } else if (nodes[nodes.length - 1] === lastNode) {
        continuousNodes.push(...[...nodes].reverse().slice(1));
      } else {
        throw new Error(`Izumino way ${i} not connected!`);
      }
    }
  }

  const coords = continuousNodes.map(nid => nodeMap.get(nid)).filter(Boolean);

  const stations = [
    {
      id: 'SO-10', lineId: 'sotetsu_izumino', number: 1, name: '二俣川', nameKana: 'ふたまたがわ', nameEn: 'Futamatagawa',
      lat: 35.4633846, lng: 139.5322757, transfers: ['相鉄本線'],
      address: '神奈川県横浜市旭区二俣川二丁目91-7',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: true,
    },
    {
      id: 'SO-31', lineId: 'sotetsu_izumino', number: 2, name: '南万騎が原', nameKana: 'みなみまきがはら', nameEn: 'Minami-makigahara',
      lat: 35.4525798, lng: 139.5263862, transfers: [],
      address: '神奈川県横浜市旭区柏町127',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'rapid', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-32', lineId: 'sotetsu_izumino', number: 3, name: '緑園都市', nameKana: 'りょくえんとし', nameEn: 'Ryokuentoshi',
      lat: 35.4394513, lng: 139.5219084, transfers: [],
      address: '神奈川県横浜市泉区緑園四丁目1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: true,
    },
    {
      id: 'SO-33', lineId: 'sotetsu_izumino', number: 4, name: '弥生台', nameKana: 'やよいだい', nameEn: 'Yayoidai',
      lat: 35.4299039, lng: 139.5062629, transfers: [],
      address: '神奈川県横浜市泉区弥生台5-2',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'rapid', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-34', lineId: 'sotetsu_izumino', number: 5, name: 'いずみ野', nameKana: 'いずみの', nameEn: 'Izumino',
      lat: 35.4295908, lng: 139.495126, transfers: [],
      address: '神奈川県横浜市泉区和泉町6214-1',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '3・4番線' }, isMajor: true,
    },
    {
      id: 'SO-35', lineId: 'sotetsu_izumino', number: 6, name: 'いずみ中央', nameKana: 'いずみちゅうおう', nameEn: 'Izumi-chuo',
      lat: 35.4152581, lng: 139.4873447, transfers: [],
      address: '神奈川県横浜市泉区和泉中央南五丁目4-13',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'rapid', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-36', lineId: 'sotetsu_izumino', number: 7, name: 'ゆめが丘', nameKana: 'ゆめがおか', nameEn: 'Yumegaoka',
      lat: 35.4056861, lng: 139.4825083, transfers: ['横浜市営地下鉄ブルーライン(下飯田駅)'],
      address: '神奈川県横浜市泉区下飯田町1555-9',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
      stoppingTypes: ['local', 'rapid', 'commuter_exp'],
      platforms: { inbound: '1番線', outbound: '2番線' }, isMajor: false,
    },
    {
      id: 'SO-37', lineId: 'sotetsu_izumino', number: 8, name: '湘南台', nameKana: 'しょうなんだい', nameEn: 'Shonandai',
      lat: 35.3962433, lng: 139.4664505, transfers: ['小田急江ノ島線', '横浜市営地下鉄ブルーライン'],
      address: '神奈川県藤沢市湘南台二丁目15',
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
      stoppingTypes: ['local', 'rapid', 'commuter_exp', 'limitedExp', 'commuter_ltd_exp'],
      platforms: { inbound: '1・2番線', outbound: '1・2番線' }, isMajor: true,
    },
  ];

  // Snap station coordinates to continuous path and slice segments
  const snapIndices = [];
  stations.forEach(st => {
    let bestIdx = 0, bestDist = Infinity;
    for (let idx = 0; idx < coords.length; idx++) {
      const d = dist([st.lat, st.lng], coords[idx]);
      if (d < bestDist) { bestDist = d; bestIdx = idx; }
    }
    snapIndices.push(bestIdx);
  });

  const trackSegments = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const s1 = stations[i];
    const s2 = stations[i + 1];
    const idx1 = snapIndices[i];
    const idx2 = snapIndices[i + 1];
    const segCoords = smoothCoordinates(coords.slice(idx1, idx2 + 1));

    trackSegments.push({
      fromStationId: s1.id,
      toStationId: s2.id,
      fromName: s1.name,
      toName: s2.name,
      coordinates: segCoords,
    });
  }

  return { stations, trackSegments };
}

// Write files for a line
function outputLineData(lineId, constPrefix, lineName, buildFunc) {
  const { stations, trackSegments } = buildFunc();
  const dir = path.resolve(`src/data/lines/${lineId}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const stationsCode = `// ${lineName} 駅メタデータ定義\nimport type { Station } from '../../../types';\n\nexport const ${constPrefix}_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(path.join(dir, 'stations.ts'), stationsCode, 'utf8');

  const tracksCode = `// ${lineName} 線路幾何データ\nimport type { TrackSegment } from '../../../types';\n\nexport const ${constPrefix}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};\n`;
  fs.writeFileSync(path.join(dir, 'trackGeometry.ts'), tracksCode, 'utf8');

  console.log(`✅ [${lineId}] stations: ${stations.length}, segments: ${trackSegments.length}`);
}

outputLineData('tokyu_shin_yokohama', 'TOKYU_SHIN_YOKOHAMA', '東急新横浜線', buildTokyuShinYokohama);
outputLineData('sotetsu_shin_yokohama', 'SOTETSU_SHIN_YOKOHAMA', '相鉄新横浜線', buildSotetsuShinYokohama);
outputLineData('sotetsu_main', 'SOTETSU_MAIN', '相鉄本線', buildSotetsuMain);
outputLineData('sotetsu_izumino', 'SOTETSU_IZUMINO', '相鉄いずみ野線', buildSotetsuIzumino);
