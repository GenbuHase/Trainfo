import type { LineDefinition } from '../../../types';
import { SENSEKI_TOHOKU_STATIONS } from './stations';
import { SENSEKI_TOHOKU_TRACK_SEGMENTS } from './trackGeometry';
import { SENSEKI_TOHOKU_TRAIN_TYPES } from './trainTypes';

export const sensekiTohokuLine: LineDefinition = {
  id: 'senseki_tohoku',
  name: 'JR仙石東北ライン',
  shortName: '仙石東北ライン',
  operator: 'JR東日本',
  lineColor: '#e85298',
  accentColor: '#00bb85',
  defaultCars: 4,
  defaultBounds: [[38.2895,140.9895],[38.4027,141.0932]],
  directionNames: {
    "inbound": "塩釜・仙台方面",
    "outbound": "高城町・石巻方面",
    "inboundFull": "上り 塩釜・仙台方面",
    "outboundFull": "下り 高城町・矢本・石巻方面",
    "inboundShort": "仙台方面",
    "outboundShort": "石巻方面"
},
  stations: SENSEKI_TOHOKU_STATIONS,
  trackSegments: SENSEKI_TOHOKU_TRACK_SEGMENTS,
  trainTypes: SENSEKI_TOHOKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
