import type { LineDefinition } from '../../../types';
import { YOKOHAMA_GREEN_STATIONS } from './stations';
import { YOKOHAMA_GREEN_TRACK_SEGMENTS } from './trackGeometry';
import { YOKOHAMA_GREEN_TRAIN_TYPES } from './trainTypes';

export const yokohamaGreenLine: LineDefinition = {
  id: 'yokohama_green',
  name: '横浜市営地下鉄グリーンライン',
  shortName: 'グリーンライン',
  operator: '横浜市交通局',
  area: 'kanto',
  lineColor: '#00a040',
  accentColor: '#00702b',
  defaultCars: 4,
  defaultBounds: [
    [35.5001, 139.5255],
    [35.5761, 139.6622],
  ],
  directionNames: {
    "inbound": "中山方面",
    "outbound": "センター南・日吉方面",
    "inboundFull": "上り 中山方面",
    "outboundFull": "下り センター南・日吉方面",
    "inboundShort": "上り（中山方面）",
    "outboundShort": "下り（日吉方面）"
},
  stations: YOKOHAMA_GREEN_STATIONS,
  trackSegments: YOKOHAMA_GREEN_TRACK_SEGMENTS,
  trainTypes: YOKOHAMA_GREEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
