import type { LineDefinition } from '../../../types';
import { RYUTETSU_STATIONS } from './stations';
import { RYUTETSU_TRACK_SEGMENTS } from './trackGeometry';
import { RYUTETSU_TRAIN_TYPES } from './trainTypes';

export const ryutetsuLine: LineDefinition = {
  id: 'ryutetsu',
  name: '流鉄流山線',
  shortName: '流山線',
  operator: '流鉄',
  area: 'kanto',
  lineColor: '#ff6600',
  accentColor: '#cc5200',
  defaultCars: 2,
  defaultBounds: [
    [35.7968, 139.8863],
    [35.8714, 139.9350],
  ],
  directionNames: {
    "inbound": "馬橋方面",
    "outbound": "流山方面",
    "inboundFull": "上り 馬橋方面",
    "outboundFull": "下り 流山方面",
    "inboundShort": "上り（馬橋方面）",
    "outboundShort": "下り（流山方面）"
},
  stations: RYUTETSU_STATIONS,
  trackSegments: RYUTETSU_TRACK_SEGMENTS,
  trainTypes: RYUTETSU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
