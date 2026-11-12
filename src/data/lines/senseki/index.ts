import type { LineDefinition } from '../../../types';
import { SENSEKI_STATIONS } from './stations';
import { SENSEKI_TRACK_SEGMENTS } from './trackGeometry';
import { SENSEKI_TRAIN_TYPES } from './trainTypes';

export const sensekiLine: LineDefinition = {
  id: 'senseki',
  name: 'JR仙石線',
  shortName: '仙石線',
  operator: 'JR東日本',
  lineColor: '#00aaee',
  accentColor: '#0088cc',
  defaultCars: 4,
  defaultBounds: [[38.2388,140.8587],[38.4584,141.3238]],
  directionNames: {
    "inbound": "仙台・あおば通方面",
    "outbound": "松島海岸・石巻方面",
    "inboundFull": "上り 多賀城・仙台・あおば通方面",
    "outboundFull": "下り 多賀城・高城町・石巻方面",
    "inboundShort": "あおば通方面",
    "outboundShort": "石巻方面"
},
  stations: SENSEKI_STATIONS,
  trackSegments: SENSEKI_TRACK_SEGMENTS,
  trainTypes: SENSEKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
