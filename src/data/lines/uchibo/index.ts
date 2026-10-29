import type { LineDefinition } from '../../../types';
import { UCHIBO_STATIONS } from './stations';
import { UCHIBO_TRAIN_TYPES } from './trainTypes';
import { UCHIBO_TRACK_SEGMENTS } from './trackGeometry';

export const uchiboLine: LineDefinition = {
  id: 'uchibo',
  name: 'JR内房線',
  shortName: '内房線',
  operator: 'JR東日本',
  lineColor: '#0074be',
  accentColor: '#f39800',
  defaultCars: 8,
  defaultBounds: [[34.95,139.75],[35.6,140.15]],
  directionNames: {
  "inbound": "上り 蘇我・千葉方面",
  "outbound": "下り 木更津・館山方面",
  "inboundFull": "上り 蘇我・千葉・東京方面",
  "outboundFull": "下り 木更津・君津・館山・安房鴨川方面",
  "inboundShort": "蘇我・千葉方面",
  "outboundShort": "館山方面"
},
  stations: UCHIBO_STATIONS,
  trackSegments: UCHIBO_TRACK_SEGMENTS,
  trainTypes: UCHIBO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
