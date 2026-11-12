import type { LineDefinition } from '../../../types';
import { TOHOKU_RIFU_STATIONS } from './stations';
import { TOHOKU_RIFU_TRACK_SEGMENTS } from './trackGeometry';
import { TOHOKU_RIFU_TRAIN_TYPES } from './trainTypes';

export const tohokuRifuLine: LineDefinition = {
  id: 'tohoku_rifu',
  name: 'JR東北本線（利府支線）',
  shortName: '東北本線（利府支線）',
  operator: 'JR東日本',
  lineColor: '#00bb85',
  accentColor: '#00897b',
  defaultCars: 4,
  defaultBounds: [[38.2809,140.9353],[38.3493,141.0048]],
  directionNames: {
    "inbound": "岩切・仙台方面",
    "outbound": "新利府・利府方面",
    "inboundFull": "上り 岩切・仙台方面",
    "outboundFull": "下り 新利府・利府方面",
    "inboundShort": "岩切・仙台方面",
    "outboundShort": "利府方面"
},
  stations: TOHOKU_RIFU_STATIONS,
  trackSegments: TOHOKU_RIFU_TRACK_SEGMENTS,
  trainTypes: TOHOKU_RIFU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
