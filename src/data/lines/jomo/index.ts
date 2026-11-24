import type { LineDefinition } from '../../../types';
import { JOMO_STATIONS } from './stations';
import { JOMO_TRACK_SEGMENTS } from './trackGeometry';
import { JOMO_TRAIN_TYPES } from './trainTypes';

export const jomoLine: LineDefinition = {
  id: 'jomo',
  name: '上毛電気鉄道上毛線',
  shortName: '上毛線',
  operator: '上毛電気鉄道',
  area: 'kanto',
  lineColor: '#009988',
  accentColor: '#006e62',
  defaultCars: 2,
  defaultBounds: [
    [36.3757, 139.0606],
    [36.4405, 139.3475],
  ],
  directionNames: {
    "inbound": "中央前橋方面",
    "outbound": "赤城・西桐生方面",
    "inboundFull": "上り 中央前橋方面",
    "outboundFull": "下り 赤城・西桐生方面",
    "inboundShort": "上り（中央前橋方面）",
    "outboundShort": "下り（西桐生方面）"
},
  stations: JOMO_STATIONS,
  trackSegments: JOMO_TRACK_SEGMENTS,
  trainTypes: JOMO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
