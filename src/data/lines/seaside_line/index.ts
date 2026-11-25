import type { LineDefinition } from '../../../types';
import { SEASIDE_LINE_STATIONS } from './stations';
import { SEASIDE_LINE_TRACK_SEGMENTS } from './trackGeometry';
import { SEASIDE_LINE_TRAIN_TYPES } from './trainTypes';

export const seasideLineLine: LineDefinition = {
  id: 'seaside_line',
  name: '横浜シーサイドライン',
  shortName: 'シーサイドライン',
  operator: '横浜シーサイドライン',
  area: 'kanto',
  lineColor: '#f39800',
  accentColor: '#c47900',
  defaultCars: 5,
  defaultBounds: [
    [35.3158, 139.6054],
    [35.4010, 139.6651],
  ],
  directionNames: {
    "inbound": "新杉田方面",
    "outbound": "金沢八景方面",
    "inboundFull": "上り 新杉田方面",
    "outboundFull": "下り 金沢八景方面",
    "inboundShort": "上り（新杉田方面）",
    "outboundShort": "下り（金沢八景方面）"
},
  stations: SEASIDE_LINE_STATIONS,
  trackSegments: SEASIDE_LINE_TRACK_SEGMENTS,
  trainTypes: SEASIDE_LINE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
