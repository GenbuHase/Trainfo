import type { LineDefinition } from '../../../types';
import { KEIKYU_ZUSHI_STATIONS } from './stations';
import { KEIKYU_ZUSHI_TRACK_SEGMENTS } from './trackGeometry';
import { KEIKYU_ZUSHI_TRAIN_TYPES } from './trainTypes';

export const keikyuZushiLine: LineDefinition = {
  id: 'keikyu_zushi',
  name: '京急逗子線',
  shortName: '京急逗子線',
  operator: '京浜急行電鉄',
  area: 'kanto',
  lineColor: '#e60012',
  accentColor: '#00bfff',
  defaultCars: 6,
  defaultBounds: [
    [35.2793, 139.5655],
    [35.3468, 139.6351],
  ],
  directionNames: {
    "inbound": "金沢八景・横浜・品川方面",
    "outbound": "逗子・葉山方面",
    "inboundFull": "上り 金沢八景・横浜・品川方面",
    "outboundFull": "下り 逗子・葉山方面",
    "inboundShort": "上り（金沢八景方面）",
    "outboundShort": "下り（逗子・葉山方面）"
},
  stations: KEIKYU_ZUSHI_STATIONS,
  trackSegments: KEIKYU_ZUSHI_TRACK_SEGMENTS,
  trainTypes: KEIKYU_ZUSHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
