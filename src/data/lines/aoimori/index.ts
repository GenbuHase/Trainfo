import type { LineDefinition } from '../../../types';
import { AOIMORI_STATIONS } from './stations';
import { AOIMORI_TRACK_SEGMENTS } from './trackGeometry';
import { AOIMORI_TRAIN_TYPES } from './trainTypes';

export const aoimoriLine: LineDefinition = {
  id: 'aoimori',
  name: '青い森鉄道線',
  shortName: '青い森鉄道線',
  operator: '青い森鉄道',
  lineColor: '#2cbadc',
  accentColor: '#005bac',
  defaultCars: 2,
  defaultBounds: [[40.3316,140.7143],[40.9499,141.459]],
  directionNames: {
    "inbound": "八戸・盛岡方面",
    "outbound": "野辺地・青森方面",
    "inboundFull": "上り 八戸・三戸・盛岡方面",
    "outboundFull": "下り 野辺地・浅虫温泉・青森方面",
    "inboundShort": "八戸方面",
    "outboundShort": "青森方面"
},
  stations: AOIMORI_STATIONS,
  trackSegments: AOIMORI_TRACK_SEGMENTS,
  trainTypes: AOIMORI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
