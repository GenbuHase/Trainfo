import type { LineDefinition } from '../../../types';
import { KEIHIN_TOHOKU_NEGISHI_STATIONS } from './stations';
import { KEIHIN_TOHOKU_NEGISHI_TRAIN_TYPES } from './trainTypes';
import { KEIHIN_TOHOKU_NEGISHI_TRACK_SEGMENTS } from './trackGeometry';

export const keihinTohokuNegishiLine: LineDefinition = {
  id: 'keihin_tohoku_negishi',
  name: 'JR京浜東北線・根岸線',
  shortName: '京浜東北・根岸線',
  operator: 'JR東日本',
  lineColor: '#00b2e5',
  accentColor: '#00b2e5',
  defaultCars: 10,
  defaultBounds: [[35.34,139.52],[35.91,139.78]],
  directionNames: {
  "inbound": "北行 上野・赤羽・大宮方面",
  "outbound": "南行 品川・横浜・大船方面",
  "inboundFull": "北行 東京・上野・赤羽・大宮方面",
  "outboundFull": "南行 品川・川崎・横浜・大船方面",
  "inboundShort": "大宮方面",
  "outboundShort": "大船方面"
},
  stations: KEIHIN_TOHOKU_NEGISHI_STATIONS,
  trackSegments: KEIHIN_TOHOKU_NEGISHI_TRACK_SEGMENTS,
  trainTypes: KEIHIN_TOHOKU_NEGISHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
