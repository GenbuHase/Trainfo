import type { LineDefinition } from '../../../types';
import { SOTOBO_STATIONS } from './stations';
import { SOTOBO_TRAIN_TYPES } from './trainTypes';
import { SOTOBO_TRACK_SEGMENTS } from './trackGeometry';

export const sotoboLine: LineDefinition = {
  id: 'sotobo',
  name: 'JR外房線',
  shortName: '外房線',
  operator: 'JR東日本',
  lineColor: '#e60012',
  accentColor: '#0074be',
  defaultCars: 8,
  defaultBounds: [[35.1,140.05],[35.62,140.35]],
  directionNames: {
  "inbound": "上り 蘇我・千葉方面",
  "outbound": "下り 茂原・安房鴨川方面",
  "inboundFull": "上り 蘇我・千葉・東京方面",
  "outboundFull": "下り 茂原・勝浦・安房鴨川方面",
  "inboundShort": "千葉方面",
  "outboundShort": "安房鴨川方面"
},
  stations: SOTOBO_STATIONS,
  trackSegments: SOTOBO_TRACK_SEGMENTS,
  trainTypes: SOTOBO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
