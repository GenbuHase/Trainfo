import type { LineDefinition } from '../../../types';
import { TOGANE_STATIONS } from './stations';
import { TOGANE_TRAIN_TYPES } from './trainTypes';
import { TOGANE_TRACK_SEGMENTS } from './trackGeometry';

export const toganeLine: LineDefinition = {
  id: 'togane',
  name: 'JR東金線',
  shortName: '東金線',
  operator: 'JR東日本',
  lineColor: '#f39800',
  accentColor: '#f39800',
  defaultCars: 6,
  defaultBounds: [[35.51,140.29],[35.61,140.42]],
  directionNames: {
  "inbound": "上り 大網・千葉方面",
  "outbound": "下り 東金・成東方面",
  "inboundFull": "上り 大網・千葉・東京方面",
  "outboundFull": "下り 東金・成東方面",
  "inboundShort": "大網方面",
  "outboundShort": "成東方面"
},
  stations: TOGANE_STATIONS,
  trackSegments: TOGANE_TRACK_SEGMENTS,
  trainTypes: TOGANE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
