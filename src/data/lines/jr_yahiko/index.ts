import type { LineDefinition } from '../../../types';
import { JR_YAHIKO_STATIONS } from './stations';
import { JR_YAHIKO_TRACK_SEGMENTS } from './trackGeometry';
import { JR_YAHIKO_TRAIN_TYPES } from './trainTypes';

export const jrYahikoLine: LineDefinition = {
  id: 'jr_yahiko',
  name: 'JR弥彦線',
  shortName: '弥彦線',
  operator: 'JR東日本',
  area: 'koshinetsu',
  lineColor: '#9c27b0',
  accentColor: '#7b1fa2',
  defaultCars: 4,
  defaultBounds: [
    [37.6084, 138.8124],
    [37.7194, 138.9933],
  ],
  directionNames: {
    "inbound": "吉田・弥彦方面",
    "outbound": "燕三条・東三条方面",
    "inboundFull": "上り 吉田・弥彦方面",
    "outboundFull": "下り 燕三条・東三条方面",
    "inboundShort": "弥彦方面",
    "outboundShort": "東三条方面"
},
  stations: JR_YAHIKO_STATIONS,
  trackSegments: JR_YAHIKO_TRACK_SEGMENTS,
  trainTypes: JR_YAHIKO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
