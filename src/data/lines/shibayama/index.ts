import type { LineDefinition } from '../../../types';
import { SHIBAYAMA_STATIONS } from './stations';
import { SHIBAYAMA_TRACK_SEGMENTS } from './trackGeometry';
import { SHIBAYAMA_TRAIN_TYPES } from './trainTypes';

export const shibayamaLine: LineDefinition = {
  id: 'shibayama',
  name: '芝山鉄道線',
  shortName: '芝山鉄道線',
  operator: '芝山鉄道',
  area: 'kanto',
  lineColor: '#00a051',
  accentColor: '#007036',
  defaultCars: 6,
  defaultBounds: [
    [35.7387, 140.3718],
    [35.7854, 140.4153],
  ],
  directionNames: {
    "inbound": "東成田・京成成田方面",
    "outbound": "芝山千代田方面",
    "inboundFull": "上り 東成田・京成成田方面",
    "outboundFull": "下り 芝山千代田方面",
    "inboundShort": "東成田",
    "outboundShort": "芝山千代田方面"
},
  stations: SHIBAYAMA_STATIONS,
  trackSegments: SHIBAYAMA_TRACK_SEGMENTS,
  trainTypes: SHIBAYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
