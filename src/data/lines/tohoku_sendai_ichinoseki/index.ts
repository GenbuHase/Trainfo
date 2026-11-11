import type { LineDefinition } from '../../../types';
import { TOHOKU_SENDAI_ICHINOSEKI_STATIONS } from './stations';
import { TOHOKU_SENDAI_ICHINOSEKI_TRACK_SEGMENTS } from './trackGeometry';
import { TOHOKU_SENDAI_ICHINOSEKI_TRAIN_TYPES } from './trainTypes';

export const tohokuSendaiIchinosekiLine: LineDefinition = {
  id: 'tohoku_sendai_ichinoseki',
  name: 'JR東北本線（仙台～一ノ関）',
  shortName: '東北本線（仙台～一ノ関）',
  operator: 'JR東日本',
  lineColor: '#00bb85',
  accentColor: '#00897b',
  defaultCars: 4,
  defaultBounds: [[38.2407,140.8624],[38.9464,141.2]],
  directionNames: {
    "inbound": "塩釜・仙台方面",
    "outbound": "小牛田・一ノ関方面",
    "inboundFull": "上り 塩釜・仙台方面",
    "outboundFull": "下り 小牛田・一ノ関方面",
    "inboundShort": "仙台方面",
    "outboundShort": "一ノ関方面"
},
  stations: TOHOKU_SENDAI_ICHINOSEKI_STATIONS,
  trackSegments: TOHOKU_SENDAI_ICHINOSEKI_TRACK_SEGMENTS,
  trainTypes: TOHOKU_SENDAI_ICHINOSEKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
