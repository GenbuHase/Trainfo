import type { LineDefinition } from '../../../types';
import { FUJIKYU_STATIONS } from './stations';
import { FUJIKYU_TRAIN_TYPES } from './trainTypes';
import { FUJIKYU_TRACK_SEGMENTS } from './trackGeometry';

export const fujikyuLine: LineDefinition = {
  id: 'fujikyu',
  name: '富士急行線',
  shortName: '富士急行',
  operator: '富士山麓電気鉄道',
  lineColor: '#0072bc',
  accentColor: '#ed1c24',
  defaultCars: 3,
  defaultBounds: [[35.4706,138.7515],[35.6261,138.9595]],
  directionNames: {
  "inbound": "大月・新宿・東京方面",
  "outbound": "富士山・河口湖方面",
  "inboundFull": "上り 大月・新宿・東京方面",
  "outboundFull": "下り 富士山・河口湖方面",
  "inboundShort": "大月方面",
  "outboundShort": "河口湖方面"
},
  stations: FUJIKYU_STATIONS,
  trackSegments: FUJIKYU_TRACK_SEGMENTS,
  trainTypes: FUJIKYU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
