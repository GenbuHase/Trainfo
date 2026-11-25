import type { LineDefinition } from '../../../types';
import { TOEI_ARAKAWA_STATIONS } from './stations';
import { TOEI_ARAKAWA_TRACK_SEGMENTS } from './trackGeometry';
import { TOEI_ARAKAWA_TRAIN_TYPES } from './trainTypes';

export const toeiArakawaLine: LineDefinition = {
  id: 'toei_arakawa',
  name: '都電荒川線（東京さくらトラム）',
  shortName: '都電荒川線',
  operator: '東京都交通局',
  area: 'kanto',
  lineColor: '#e60072',
  accentColor: '#b30058',
  defaultCars: 1,
  defaultBounds: [
    [35.6969, 139.6974],
    [35.7677, 139.8063],
  ],
  directionNames: {
    "inbound": "王子・三ノ輪橋方面",
    "outbound": "大塚・早稲田方面",
    "inboundFull": "上り 王子・三ノ輪橋方面",
    "outboundFull": "下り 大塚・早稲田方面",
    "inboundShort": "上り（三ノ輪橋方面）",
    "outboundShort": "下り（早稲田方面）"
},
  stations: TOEI_ARAKAWA_STATIONS,
  trackSegments: TOEI_ARAKAWA_TRACK_SEGMENTS,
  trainTypes: TOEI_ARAKAWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
