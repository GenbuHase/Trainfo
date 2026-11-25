import type { LineDefinition } from '../../../types';
import { SEIBU_SAYAMA_STATIONS } from './stations';
import { SEIBU_SAYAMA_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_SAYAMA_TRAIN_TYPES } from './trainTypes';

export const seibuSayamaLine: LineDefinition = {
  id: 'seibu_sayama',
  name: '西武狭山線',
  shortName: '狭山線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#ff6600',
  accentColor: '#cc5200',
  defaultCars: 8,
  defaultBounds: [
    [35.7567, 139.4056],
    [35.8041, 139.4711],
  ],
  directionNames: {
    "inbound": "西所沢・池袋方面",
    "outbound": "西武球場前方面",
    "inboundFull": "上り 西所沢・池袋方面",
    "outboundFull": "下り 西武球場前方面",
    "inboundShort": "上り（西所沢方面）",
    "outboundShort": "下り（西武球場前方面）"
},
  stations: SEIBU_SAYAMA_STATIONS,
  trackSegments: SEIBU_SAYAMA_TRACK_SEGMENTS,
  trainTypes: SEIBU_SAYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
