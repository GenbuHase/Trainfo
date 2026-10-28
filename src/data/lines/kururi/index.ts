import type { LineDefinition } from '../../../types';
import { KURURI_STATIONS } from './stations';
import { KURURI_TRAIN_TYPES } from './trainTypes';
import { KURURI_TRACK_SEGMENTS } from './trackGeometry';

export const kururiLine: LineDefinition = {
  id: 'kururi',
  name: 'JR久留里線',
  shortName: '久留里線',
  operator: 'JR東日本',
  lineColor: '#00958a',
  accentColor: '#00958a',
  defaultCars: 2,
  defaultBounds: [[35.21,139.89],[35.4,140.15]],
  directionNames: {
  "inbound": "上り 木更津方面",
  "outbound": "下り 久留里・上総亀山方面",
  "inboundFull": "上り 木更津方面",
  "outboundFull": "下り 久留里・上総亀山方面",
  "inboundShort": "木更津方面",
  "outboundShort": "上総亀山方面"
},
  stations: KURURI_STATIONS,
  trackSegments: KURURI_TRACK_SEGMENTS,
  trainTypes: KURURI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
