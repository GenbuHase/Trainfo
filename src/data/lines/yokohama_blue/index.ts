import type { LineDefinition } from '../../../types';
import { YOKOHAMA_BLUE_STATIONS } from './stations';
import { YOKOHAMA_BLUE_TRACK_SEGMENTS } from './trackGeometry';
import { YOKOHAMA_BLUE_TRAIN_TYPES } from './trainTypes';

export const yokohamaBlueLine: LineDefinition = {
  id: 'yokohama_blue',
  name: '横浜市営地下鉄ブルーライン',
  shortName: 'ブルーライン',
  operator: '横浜市交通局',
  area: 'kanto',
  lineColor: '#0071c5',
  accentColor: '#004e8a',
  defaultCars: 6,
  defaultBounds: [
    [35.3815, 139.4520],
    [35.5829, 139.6503],
  ],
  directionNames: {
    "inbound": "戸塚・湘南台方面",
    "outbound": "横浜・新横浜・あざみ野方面",
    "inboundFull": "上り 戸塚・湘南台方面",
    "outboundFull": "下り 横浜・新横浜・あざみ野方面",
    "inboundShort": "上り（湘南台方面）",
    "outboundShort": "下り（あざみ野方面）"
},
  stations: YOKOHAMA_BLUE_STATIONS,
  trackSegments: YOKOHAMA_BLUE_TRACK_SEGMENTS,
  trainTypes: YOKOHAMA_BLUE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
