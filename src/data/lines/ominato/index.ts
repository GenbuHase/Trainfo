import type { LineDefinition } from '../../../types';
import { OMINATO_STATIONS } from './stations';
import { OMINATO_TRACK_SEGMENTS } from './trackGeometry';
import { OMINATO_TRAIN_TYPES } from './trainTypes';

export const ominatoLine: LineDefinition = {
  id: 'ominato',
  name: 'JR大湊線',
  shortName: '大湊線',
  operator: 'JR東日本',
  lineColor: '#ffd700',
  accentColor: '#ca8a04',
  defaultCars: 2,
  defaultBounds: [[40.8353,141.0994],[41.303,141.2992]],
  directionNames: {
    "inbound": "野辺地・八戸方面",
    "outbound": "下北・大湊方面",
    "inboundFull": "上り 野辺地方面",
    "outboundFull": "下り 下北・大湊方面",
    "inboundShort": "上り (野辺地方面)",
    "outboundShort": "下り (大湊方面)"
},
  stations: OMINATO_STATIONS,
  trackSegments: OMINATO_TRACK_SEGMENTS,
  trainTypes: OMINATO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
