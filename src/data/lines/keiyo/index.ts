import type { LineDefinition } from '../../../types';
import { KEIYO_STATIONS } from './stations';
import { KEIYO_TRAIN_TYPES } from './trainTypes';
import { KEIYO_TRACK_SEGMENTS } from './trackGeometry';

export const keiyoLine: LineDefinition = {
  id: 'keiyo',
  name: 'JR京葉線',
  shortName: '京葉線',
  operator: 'JR東日本',
  lineColor: '#cf1225',
  accentColor: '#007ac1',
  defaultCars: 10,
  defaultBounds: [[35.56,139.76],[35.7,140.14]],
  directionNames: {
  "inbound": "上り 東京方面",
  "outbound": "下り 海浜幕張・蘇我方面",
  "inboundFull": "上り 新木場・東京方面",
  "outboundFull": "下り 舞浜・海浜幕張・蘇我方面",
  "inboundShort": "東京方面",
  "outboundShort": "蘇我方面"
},
  stations: KEIYO_STATIONS,
  trackSegments: KEIYO_TRACK_SEGMENTS,
  trainTypes: KEIYO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
