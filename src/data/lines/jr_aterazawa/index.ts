import type { LineDefinition } from '../../../types';
import { ATERAZAWA_STATIONS } from './stations';
import { ATERAZAWA_TRACK_SEGMENTS } from './trackGeometry';
import { ATERAZAWA_TRAIN_TYPES } from './trainTypes';

export const aterazawaLine: LineDefinition = {
  id: 'jr_aterazawa',
  name: 'JR左沢線',
  shortName: '左沢線',
  operator: 'JR東日本',
  area: 'tohoku',
  lineColor: '#0072ba',
  accentColor: '#2e7d32',
  defaultCars: 2,
  defaultBounds: [[38.2285,140.1879],[38.4174,140.3522]],
  directionNames: {
    "inbound": "寒河江・山形方面",
    "outbound": "寒河江・左沢方面",
    "inboundFull": "上り 寒河江・山形方面",
    "outboundFull": "下り 寒河江・左沢方面",
    "inboundShort": "山形方面",
    "outboundShort": "左沢方面"
},
  stations: ATERAZAWA_STATIONS,
  trackSegments: ATERAZAWA_TRACK_SEGMENTS,
  trainTypes: ATERAZAWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
