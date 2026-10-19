import type { LineDefinition } from '../../../types';
import { YAMAGATA_SHINKANSEN_STATIONS } from './stations';
import { YAMAGATA_SHINKANSEN_TRAIN_TYPES } from './trainTypes';
import { YAMAGATA_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';

export const yamagataShinkansenLine: LineDefinition = {
  id: 'yamagata_shinkansen',
  name: 'JR山形新幹線',
  shortName: '山形新幹線',
  operator: 'JR東日本',
  lineColor: '#ea5514',
  accentColor: '#4f2c83',
  defaultCars: 7,
  defaultBounds: [[37.6536,140.0953],[38.863,140.4917]],
  directionNames: {
  "inbound": "福島・東京方面",
  "outbound": "山形・新庄方面",
  "inboundFull": "上り 福島・東京方面",
  "outboundFull": "下り 山形・新庄方面",
  "inboundShort": "東京方面",
  "outboundShort": "新庄方面"
},
  stations: YAMAGATA_SHINKANSEN_STATIONS,
  trackSegments: YAMAGATA_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: YAMAGATA_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
