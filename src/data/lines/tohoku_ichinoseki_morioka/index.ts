import type { LineDefinition } from '../../../types';
import { TOHOKU_ICHINOSEKI_MORIOKA_STATIONS } from './stations';
import { TOHOKU_ICHINOSEKI_MORIOKA_TRACK_SEGMENTS } from './trackGeometry';
import { TOHOKU_ICHINOSEKI_MORIOKA_TRAIN_TYPES } from './trainTypes';

export const tohokuIchinosekiMoriokaLine: LineDefinition = {
  id: 'tohoku_ichinoseki_morioka',
  name: 'JR東北本線（一ノ関～盛岡）',
  shortName: '東北本線（一ノ関～盛岡）',
  operator: 'JR東日本',
  lineColor: '#00bb85',
  accentColor: '#00897b',
  defaultCars: 2,
  defaultBounds: [[38.9064,141.0777],[39.7207,141.1805]],
  directionNames: {
    "inbound": "北上・一ノ関方面",
    "outbound": "花巻・盛岡方面",
    "inboundFull": "上り 北上・一ノ関方面",
    "outboundFull": "下り 花巻・盛岡方面",
    "inboundShort": "一ノ関方面",
    "outboundShort": "盛岡方面"
},
  stations: TOHOKU_ICHINOSEKI_MORIOKA_STATIONS,
  trackSegments: TOHOKU_ICHINOSEKI_MORIOKA_TRACK_SEGMENTS,
  trainTypes: TOHOKU_ICHINOSEKI_MORIOKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
