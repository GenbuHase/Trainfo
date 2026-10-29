import type { LineDefinition } from '../../../types';
import { SOBU_MAIN_STATIONS } from './stations';
import { SOBU_MAIN_TRAIN_TYPES } from './trainTypes';
import { SOBU_MAIN_TRACK_SEGMENTS } from './trackGeometry';

export const sobuMainLine: LineDefinition = {
  id: 'sobu_main',
  name: 'JR総武本線',
  shortName: '総武本線',
  operator: 'JR東日本',
  lineColor: '#ffc20e',
  accentColor: '#0074be',
  defaultCars: 8,
  defaultBounds: [[35.6,140.1],[35.75,140.85]],
  directionNames: {
  "inbound": "上り 佐倉・千葉方面",
  "outbound": "下り 成東・銚子方面",
  "inboundFull": "上り 佐倉・千葉・東京方面",
  "outboundFull": "下り 八街・成東・銚子方面",
  "inboundShort": "千葉方面",
  "outboundShort": "銚子方面"
},
  stations: SOBU_MAIN_STATIONS,
  trackSegments: SOBU_MAIN_TRACK_SEGMENTS,
  trainTypes: SOBU_MAIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
