import type { LineDefinition } from '../../../types';
import { AKITA_SHINKANSEN_STATIONS } from './stations';
import { AKITA_SHINKANSEN_TRAIN_TYPES } from './trainTypes';
import { AKITA_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';

export const akitaShinkansenLine: LineDefinition = {
  id: 'akita_shinkansen',
  name: 'JR秋田新幹線',
  shortName: '秋田新幹線',
  operator: 'JR東日本',
  lineColor: '#dc143c',
  accentColor: '#ffcad4',
  defaultCars: 7,
  defaultBounds: [[39.4403,140.0291],[39.742,141.2372]],
  directionNames: {
  "inbound": "盛岡・東京方面",
  "outbound": "大曲・秋田方面",
  "inboundFull": "上り 盛岡・東京方面",
  "outboundFull": "下り 大曲・秋田方面",
  "inboundShort": "東京方面",
  "outboundShort": "秋田方面"
},
  stations: AKITA_SHINKANSEN_STATIONS,
  trackSegments: AKITA_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: AKITA_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
