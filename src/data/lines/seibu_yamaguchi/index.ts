import type { LineDefinition } from '../../../types';
import { SEIBU_YAMAGUCHI_STATIONS } from './stations';
import { SEIBU_YAMAGUCHI_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_YAMAGUCHI_TRAIN_TYPES } from './trainTypes';

export const seibuYamaguchiLine: LineDefinition = {
  id: 'seibu_yamaguchi',
  name: '西武山口線（レオライナー）',
  shortName: '山口線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#ff3333',
  accentColor: '#cc0000',
  defaultCars: 4,
  defaultBounds: [
    [35.7515, 139.4049],
    [35.7855, 139.4575],
  ],
  directionNames: {
    "inbound": "多摩湖方面",
    "outbound": "西武球場前方面",
    "inboundFull": "上り 多摩湖方面",
    "outboundFull": "下り 西武球場前方面",
    "inboundShort": "上り（多摩湖方面）",
    "outboundShort": "下り（西武球場前方面）"
},
  stations: SEIBU_YAMAGUCHI_STATIONS,
  trackSegments: SEIBU_YAMAGUCHI_TRACK_SEGMENTS,
  trainTypes: SEIBU_YAMAGUCHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
