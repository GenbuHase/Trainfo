import type { LineDefinition } from '../../../types';
import { YOKOHAMA_STATIONS } from './stations';
import { YOKOHAMA_TRAIN_TYPES } from './trainTypes';
import { YOKOHAMA_TRACK_SEGMENTS } from './trackGeometry';

export const yokohamaLine: LineDefinition = {
  id: 'yokohama',
  name: 'JR横浜線',
  shortName: '横浜線',
  operator: 'JR東日本',
  lineColor: '#80c241',
  accentColor: '#00b2e5',
  defaultCars: 8,
  defaultBounds: [[35.45,139.3],[35.68,139.65]],
  directionNames: {
  "inbound": "上り 新横浜・東神奈川・桜木町方面",
  "outbound": "下り 町田・橋本・八王子方面",
  "inboundFull": "上り 新横浜・東神奈川・桜木町・磯子・大船方面",
  "outboundFull": "下り 中山・町田・橋本・八王子方面",
  "inboundShort": "東神奈川方面",
  "outboundShort": "八王子方面"
},
  stations: YOKOHAMA_STATIONS,
  trackSegments: YOKOHAMA_TRACK_SEGMENTS,
  trainTypes: YOKOHAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
