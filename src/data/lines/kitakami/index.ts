import type { LineDefinition } from '../../../types';
import { KITAKAMI_STATIONS } from './stations';
import { KITAKAMI_TRACK_SEGMENTS } from './trackGeometry';
import { KITAKAMI_TRAIN_TYPES } from './trainTypes';

export const kitakamiLine: LineDefinition = {
  id: 'kitakami',
  name: 'JR北上線',
  shortName: '北上線',
  operator: 'JR東日本',
  lineColor: '#851a72',
  accentColor: '#631255',
  defaultCars: 2,
  defaultBounds: [[39.2563,140.5405],[39.3349,141.1417]],
  directionNames: {
    "inbound": "ほっとゆだ・北上方面",
    "outbound": "ほっとゆだ・横手方面",
    "inboundFull": "上り ほっとゆだ・北上方面",
    "outboundFull": "下り ほっとゆだ・横手方面",
    "inboundShort": "上り (北上方面)",
    "outboundShort": "下り (横手方面)"
},
  stations: KITAKAMI_STATIONS,
  trackSegments: KITAKAMI_TRACK_SEGMENTS,
  trainTypes: KITAKAMI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
