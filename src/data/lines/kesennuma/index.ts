import type { LineDefinition } from '../../../types';
import { KESENNUMA_STATIONS } from './stations';
import { KESENNUMA_TRACK_SEGMENTS } from './trackGeometry';
import { KESENNUMA_TRAIN_TYPES } from './trainTypes';

export const kesennumaLine: LineDefinition = {
  id: 'kesennuma',
  name: 'JR気仙沼線',
  shortName: '気仙沼線',
  operator: 'JR東日本',
  lineColor: '#6600cc',
  accentColor: '#4c0099',
  defaultCars: 2,
  defaultBounds: [[38.4923,141.1739],[38.6317,141.3259]],
  directionNames: {
    "inbound": "前谷地・小牛田方面",
    "outbound": "柳津方面",
    "inboundFull": "上り 前谷地・小牛田方面",
    "outboundFull": "下り 柳津方面",
    "inboundShort": "上り (前谷地方面)",
    "outboundShort": "下り (柳津方面)"
},
  stations: KESENNUMA_STATIONS,
  trackSegments: KESENNUMA_TRACK_SEGMENTS,
  trainTypes: KESENNUMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
