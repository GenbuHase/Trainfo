import type { LineDefinition } from '../../../types';
import { SEIBU_SHINJUKU_STATIONS } from './stations';
import { SEIBU_SHINJUKU_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_SHINJUKU_TRAIN_TYPES } from './trainTypes';

export const seibuShinjukuLine: LineDefinition = {
  id: 'seibu_shinjuku',
  name: '西武新宿線',
  shortName: '新宿線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#00a7db',
  accentColor: '#007ea6',
  defaultCars: 8,
  defaultBounds: [
    [35.6810, 139.3984],
    [35.9271, 139.7190],
  ],
  directionNames: {
    "inbound": "高田馬場・西武新宿方面",
    "outbound": "所沢・本川越方面",
    "inboundFull": "上り 高田馬場・西武新宿方面",
    "outboundFull": "下り 所沢・本川越方面",
    "inboundShort": "上り（西武新宿方面）",
    "outboundShort": "下り（本川越方面）"
},
  stations: SEIBU_SHINJUKU_STATIONS,
  trackSegments: SEIBU_SHINJUKU_TRACK_SEGMENTS,
  trainTypes: SEIBU_SHINJUKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
