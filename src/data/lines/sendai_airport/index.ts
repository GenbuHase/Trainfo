import type { LineDefinition } from '../../../types';
import { SENDAI_AIRPORT_STATIONS } from './stations';
import { SENDAI_AIRPORT_TRACK_SEGMENTS } from './trackGeometry';
import { SENDAI_AIRPORT_TRAIN_TYPES } from './trainTypes';

export const sendaiAirportLine: LineDefinition = {
  id: 'sendai_airport',
  name: '仙台空港アクセス線（仙台空港線）',
  shortName: '仙台空港線',
  operator: '仙台空港鉄道',
  lineColor: '#0950a2',
  accentColor: '#063975',
  defaultCars: 4,
  defaultBounds: [[38.1172,140.8627],[38.1934,140.949]],
  directionNames: {
    "inbound": "名取・仙台方面",
    "outbound": "仙台空港方面",
    "inboundFull": "上り 名取・仙台方面",
    "outboundFull": "下り 仙台空港方面",
    "inboundShort": "上り (名取方面)",
    "outboundShort": "下り (仙台空港方面)"
},
  stations: SENDAI_AIRPORT_STATIONS,
  trackSegments: SENDAI_AIRPORT_TRACK_SEGMENTS,
  trainTypes: SENDAI_AIRPORT_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
