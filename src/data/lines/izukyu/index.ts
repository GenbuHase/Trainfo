import type { LineDefinition } from '../../../types';
import { IZUKYU_STATIONS } from './stations';
import { IZUKYU_TRAIN_TYPES } from './trainTypes';
import { IZUKYU_TRACK_SEGMENTS } from './trackGeometry';

export const izukyuLine: LineDefinition = {
  id: 'izukyu',
  name: '伊豆急行線',
  shortName: '伊豆急行',
  operator: '伊豆急行',
  lineColor: '#009cd2',
  accentColor: '#f7931e',
  defaultCars: 7,
  defaultBounds: [[34.6495,138.922],[35.0052,139.1502]],
  directionNames: {
  "inbound": "伊東・熱海・東京方面",
  "outbound": "伊豆急下田方面",
  "inboundFull": "上り 伊東・熱海・東京方面",
  "outboundFull": "下り 伊豆急下田方面",
  "inboundShort": "熱海方面",
  "outboundShort": "下田方面"
},
  stations: IZUKYU_STATIONS,
  trackSegments: IZUKYU_TRACK_SEGMENTS,
  trainTypes: IZUKYU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
