const fs = require('fs');

const coords = JSON.parse(fs.readFileSync('scripts/resolved_musashino_stations.json', 'utf8'));

// 既存の埼京線大宮の座標と一致させる
const saikyoStations = fs.readFileSync('src/data/lines/saikyo/stations.ts', 'utf8');
const omiyaMatch = saikyoStations.match(/name:\s*'大宮'[\s\S]*?lat:\s*([0-9.]+),\s*lng:\s*([0-9.]+)/);
let omiyaLat = 35.906377;
let omiyaLng = 139.624334;
if (omiyaMatch) {
  omiyaLat = parseFloat(omiyaMatch[1]);
  omiyaLng = parseFloat(omiyaMatch[2]);
}

const STATION_DEFS = [
  // 武蔵野線本線 (府中本町〜西船橋)
  { id: 'JM-35', number: 35, name: '府中本町', nameKana: 'ふちゅうほんまち', nameEn: 'Fuchu-Hommachi', transfers: ['JR南武線'], address: '東京都府中市本町一丁目', platforms: { inbound: '2・3番線', outbound: '2・3番線' }, stoppingTypes: ['local'] },
  { id: 'JM-34', number: 34, name: '北府中', nameKana: 'きたふちゅう', nameEn: 'Kita-Fuchu', transfers: [], address: '東京都府中市晴見町二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JM-33', number: 33, name: '西国分寺', nameKana: 'にしこくぶんじ', nameEn: 'Nishi-Kokubunji', transfers: ['JR中央線'], address: '東京都国分寺市西恋ヶ窪二丁目', platforms: { inbound: '3番線', outbound: '4番線' }, stoppingTypes: ['local'] },
  { id: 'JM-32', number: 32, name: '新小平', nameKana: 'しんこだいら', nameEn: 'Shin-Kodaira', transfers: ['西武多摩湖線（青梅街道駅）'], address: '東京都小平市小川町二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-31', number: 31, name: '新秋津', nameKana: 'しんあきつ', nameEn: 'Shin-Akitsu', transfers: ['西武池袋線（秋津駅）'], address: '東京都東村山市秋津町五丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-30', number: 30, name: '東所沢', nameKana: 'ひがしところざわ', nameEn: 'Higashi-Tokorozawa', transfers: [], address: '埼玉県所沢市東所沢五丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-29', number: 29, name: '新座', nameKana: 'にいざ', nameEn: 'Niiza', transfers: [], address: '埼玉県新座市野火止五丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-28', number: 28, name: '北朝霞', nameKana: 'きたあさか', nameEn: 'Kita-Asaka', transfers: ['東武東上線（朝霞台駅）'], address: '埼玉県朝霞市浜崎一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-27', number: 27, name: '西浦和', nameKana: 'にしうらわ', nameEn: 'Nishi-Urawa', transfers: [], address: '埼玉県さいたま市桜区田島五丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JM-26', number: 26, name: '武蔵浦和', nameKana: 'むさしうらわ', nameEn: 'Musashi-Urawa', transfers: ['JR埼京線'], address: '埼玉県さいたま市南区別所七丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-25', number: 25, name: '南浦和', nameKana: 'みなみうらわ', nameEn: 'Minami-Urawa', transfers: ['JR京浜東北線'], address: '埼玉県さいたま市南区南浦和二丁目', platforms: { inbound: '5番線', outbound: '6番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-24', number: 24, name: '東浦和', nameKana: 'ひがしうらわ', nameEn: 'Higashi-Urawa', transfers: [], address: '埼玉県さいたま市緑区東浦和一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-23', number: 23, name: '東川口', nameKana: 'ひがしかわぐち', nameEn: 'Higashi-Kawaguchi', transfers: ['埼玉高速鉄道線'], address: '埼玉県川口市東川口一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-22', number: 22, name: '南越谷', nameKana: 'みなみこしがや', nameEn: 'Minami-Koshigaya', transfers: ['東武スカイツリーライン（新越谷駅）'], address: '埼玉県越谷市南越谷一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-21', number: 21, name: '越谷レイクタウン', nameKana: 'こしがやれいくたうん', nameEn: 'Koshigaya-Laketown', transfers: [], address: '埼玉県越谷市レイクタウン八丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-20', number: 20, name: '吉川', nameKana: 'よしかわ', nameEn: 'Yoshikawa', transfers: [], address: '埼玉県吉川市木売一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-19', number: 19, name: '吉川美南', nameKana: 'よしかわみなみ', nameEn: 'Yoshikawa-Minami', transfers: [], address: '埼玉県吉川市美南二丁目', platforms: { inbound: '1番線', outbound: '2・3番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-18', number: 18, name: '新三郷', nameKana: 'しんみさと', nameEn: 'Shin-Misato', transfers: [], address: '埼玉県三郷市新三郷ららシティ二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-17', number: 17, name: '三郷', nameKana: 'みさと', nameEn: 'Misato', transfers: [], address: '埼玉県三郷市三郷一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-16', number: 16, name: '南流山', nameKana: 'みなみながれやま', nameEn: 'Minami-Nagareyama', transfers: ['つくばエクスプレス'], address: '千葉県流山市南流山二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-15', number: 15, name: '新松戸', nameKana: 'しんまつど', nameEn: 'Shin-Matsudo', transfers: ['JR常磐線各駅停車', '流鉄流山線（幸谷駅）'], address: '千葉県松戸市幸谷', platforms: { inbound: '3番線', outbound: '4番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-14', number: 14, name: '新八柱', nameKana: 'しんやはしら', nameEn: 'Shin-Yahashira', transfers: ['新京成線（八柱駅）'], address: '千葉県松戸市日暮一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-13', number: 13, name: '東松戸', nameKana: 'ひがしまつど', nameEn: 'Higashi-Matsudo', transfers: ['北総線', '京成成田空港線（成田スカイアクセス）'], address: '千葉県松戸市東松戸一丁目', platforms: { inbound: '1・2番線', outbound: '2・3番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-12', number: 12, name: '市川大野', nameKana: 'いちかわおおの', nameEn: 'Ichikawa-Ono', transfers: [], address: '千葉県市川市大野町三丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-11', number: 11, name: '船橋法典', nameKana: 'ふなばしほうてん', nameEn: 'Funabashi-Hoten', transfers: [], address: '千葉県船橋市藤原二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JM-10', number: 10, name: '西船橋', nameKana: 'にしふなばし', nameEn: 'Nishi-Funabashi', transfers: ['JR総武線', 'JR京葉線', '東京メトロ東西線', '東葉高速鉄道線'], address: '千葉県船橋市西船四丁目', platforms: { inbound: '9・10番線', outbound: '11・12番線' }, stoppingTypes: ['local', 'regular'] },

  // 京葉線直通区間（東京方面）
  { id: 'JE-09', number: 9, name: '市川塩浜', nameKana: 'いちかわしおはま', nameEn: 'Ichikawa-Shiohama', transfers: ['JR京葉線（蘇我方面）'], address: '千葉県市川市塩浜二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-08', number: 8, name: '新浦安', nameKana: 'しんうらやす', nameEn: 'Shin-Urayasu', transfers: [], address: '千葉県浦安市入船一丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local'] },
  { id: 'JE-07', number: 7, name: '舞浜', nameKana: 'まいはま', nameEn: 'Maihama', transfers: ['ディズニーリゾートライン'], address: '千葉県浦安市舞浜', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-06', number: 6, name: '葛西臨海公園', nameKana: 'かさいりんかいこうえん', nameEn: 'Kasai-Rinkai-koen', transfers: [], address: '東京都江戸川区臨海町六丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-05', number: 5, name: '新木場', nameKana: 'しんきば', nameEn: 'Shin-Kiba', transfers: ['東京臨海高速鉄道りんかい線', '東京メトロ有楽町線'], address: '東京都江東区新木場一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-04', number: 4, name: '潮見', nameKana: 'しおみ', nameEn: 'Shiomi', transfers: [], address: '東京都江東区潮見二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-03', number: 3, name: '越中島', nameKana: 'えっちゅうじま', nameEn: 'Etchujima', transfers: [], address: '東京都江東区越中島二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-02', number: 2, name: '八丁堀', nameKana: 'はっちょうぼり', nameEn: 'Hatchobori', transfers: ['東京メトロ日比谷線'], address: '東京都中央区八丁堀二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'JE-01', number: 1, name: '東京', nameKana: 'とうきょう', nameEn: 'Tokyo', transfers: ['JR各線', '東海道・山陽新幹線', '東北・上越・北陸新幹線', '東京メトロ丸ノ内線'], address: '東京都千代田区丸の内一丁目', platforms: { inbound: '京葉1・2番線', outbound: '京葉3・4番線' }, stoppingTypes: ['local'] },

  // 京葉線直通区間（海浜幕張方面）
  { id: 'JE-11', number: 11, name: '南船橋', nameKana: 'みなみふなばし', nameEn: 'Minami-Funabashi', transfers: ['JR京葉線（東京方面）'], address: '千葉県船橋市若松二丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JE-12', number: 12, name: '新習志野', nameKana: 'しんならしの', nameEn: 'Shin-Narashino', transfers: [], address: '千葉県習志野市茜浜二丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JE-13', number: 13, name: '幕張豊砂', nameKana: 'まくはりとよすな', nameEn: 'Makuhari-Toyosuna', transfers: [], address: '千葉県千葉市美浜区浜田二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'regular'] },
  { id: 'JE-14', number: 14, name: '海浜幕張', nameKana: 'かいひんまくはり', nameEn: 'Kaihin-Makuhari', transfers: ['JR京葉線（蘇我方面）'], address: '千葉県千葉市美浜区ひび野二丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'regular'] },

  // 大宮支線
  { id: 'JA-26', number: 26, name: '大宮', nameKana: 'おおみや', nameEn: 'Omiya', transfers: ['JR各線', 'JR埼京線', '東武野田線', '埼玉新都市交通ニューシャトル'], address: '埼玉県さいたま市大宮区錦町', platforms: { inbound: '3・4番線', outbound: '3・4番線' }, stoppingTypes: ['regular'] },

  // 中央線直通区間（むさしの号）
  { id: 'JC-18', number: 18, name: '国立', nameKana: 'くにたち', nameEn: 'Kunitachi', transfers: ['JR中央線'], address: '東京都国立市北一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['regular'] },
  { id: 'JC-19', number: 19, name: '立川', nameKana: 'たちかわ', nameEn: 'Tachikawa', transfers: ['JR青梅線', 'JR南武線', '多摩都市モノレール'], address: '東京都立川市曙町二丁目', platforms: { inbound: '3・4番線', outbound: '5・6番線' }, stoppingTypes: ['regular'] },
  { id: 'JC-20', number: 20, name: '日野', nameKana: 'ひの', nameEn: 'Hino', transfers: [], address: '東京都日野市大坂上一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['regular'] },
  { id: 'JC-21', number: 21, name: '豊田', nameKana: 'とよだ', nameEn: 'Toyoda', transfers: [], address: '東京都日野市豊田四丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['regular'] },
  { id: 'JC-22', number: 22, name: '八王子', nameKana: 'はちおうじ', nameEn: 'Hachioji', transfers: ['JR横浜線', 'JR八高線', '京王線（京王八王子駅）'], address: '東京都八王子市旭町', platforms: { inbound: '2番線', outbound: '2番線' }, stoppingTypes: ['regular'] },
];

const stations = STATION_DEFS.map(def => {
  let lat = coords[def.name] ? coords[def.name].lat : 35.7;
  let lng = coords[def.name] ? coords[def.name].lon : 139.5;
  if (def.name === '大宮') {
    lat = omiyaLat;
    lng = omiyaLng;
  }
  return {
    ...def,
    lineId: 'musashino',
    lat: Math.round(lat * 1000000) / 1000000,
    lng: Math.round(lng * 1000000) / 1000000,
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: ['府中本町', '西国分寺', '北朝霞', '武蔵浦和', '南浦和', '南越谷', '新松戸', '西船橋', '新浦安', '海浜幕張', '大宮', '立川', '八王子'].includes(def.name),
      ticketOffice: true,
    }
  };
});

const content = `import type { Station } from '../../../types';

export const MUSASHINO_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};
`;

fs.writeFileSync('src/data/lines/musashino/stations.ts', content, 'utf8');
console.log(`Successfully generated src/data/lines/musashino/stations.ts with ${stations.length} stations!`);
