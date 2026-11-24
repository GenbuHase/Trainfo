import type { LineDefinition } from '../../../types';
import { SEIBU_SEIBUEN_STATIONS } from './stations';
import { SEIBU_SEIBUEN_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_SEIBUEN_TRAIN_TYPES } from './trainTypes';

export const seibuSeibuenLine: LineDefinition = {
  id: 'seibu_seibuen',
  name: '西武西武園線',
  shortName: '西武園線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#009944',
  accentColor: '#007a36',
  defaultCars: 4,
  defaultBounds: [
    [35.7459, 139.4343],
    [35.7826, 139.4809],
  ],
  directionNames: {
    "inbound": "東村山方面",
    "outbound": "西武園方面",
    "inboundFull": "上り 東村山方面",
    "outboundFull": "下り 西武園方面",
    "inboundShort": "上り（東村山方面）",
    "outboundShort": "下り（西武園方面）"
},
  stations: SEIBU_SEIBUEN_STATIONS,
  trackSegments: SEIBU_SEIBUEN_TRACK_SEGMENTS,
  trainTypes: SEIBU_SEIBUEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
