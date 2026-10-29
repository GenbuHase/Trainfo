import type { LineDefinition } from '../../../types';
import { NARITA_STATIONS } from './stations';
import { NARITA_TRAIN_TYPES } from './trainTypes';
import { NARITA_TRACK_SEGMENTS } from './trackGeometry';

export const naritaLine: LineDefinition = {
  id: 'narita',
  name: 'JR成田線',
  shortName: '成田線',
  operator: 'JR東日本',
  lineColor: '#00b261',
  accentColor: '#e60012',
  defaultCars: 10,
  defaultBounds: [[35.7,140.05],[35.9,140.85]],
  directionNames: {
  "inbound": "上り 佐倉・東京・我孫子方面",
  "outbound": "下り 成田・成田空港・銚子方面",
  "inboundFull": "上り 佐倉・千葉・我孫子・東京方面",
  "outboundFull": "下り 成田・成田空港・佐原・銚子方面",
  "inboundShort": "佐倉・我孫子方面",
  "outboundShort": "成田・銚子方面"
},
  stations: NARITA_STATIONS,
  trackSegments: NARITA_TRACK_SEGMENTS,
  trainTypes: NARITA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
