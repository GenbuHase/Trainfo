import type { LineDefinition } from '../../../types';
import { SEIBU_TAMAGAWA_STATIONS } from './stations';
import { SEIBU_TAMAGAWA_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_TAMAGAWA_TRAIN_TYPES } from './trainTypes';

export const seibuTamagawaLine: LineDefinition = {
  id: 'seibu_tamagawa',
  name: '西武多摩川線',
  shortName: '多摩川線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#ef7a00',
  accentColor: '#b85a00',
  defaultCars: 4,
  defaultBounds: [
    [35.6412, 139.4731],
    [35.7169, 139.5588],
  ],
  directionNames: {
    "inbound": "武蔵境方面",
    "outbound": "是政方面",
    "inboundFull": "上り 武蔵境方面",
    "outboundFull": "下り 是政方面",
    "inboundShort": "上り（武蔵境方面）",
    "outboundShort": "下り（是政方面）"
},
  stations: SEIBU_TAMAGAWA_STATIONS,
  trackSegments: SEIBU_TAMAGAWA_TRACK_SEGMENTS,
  trainTypes: SEIBU_TAMAGAWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
