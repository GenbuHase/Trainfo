import type { LineDefinition } from '../../../types';
import { TOHOKU_KUROISO_FUKUSHIMA_STATIONS } from './stations';
import { TOHOKU_KUROISO_FUKUSHIMA_TRACK_SEGMENTS } from './trackGeometry';
import { TOHOKU_KUROISO_FUKUSHIMA_TRAIN_TYPES } from './trainTypes';

export const tohokuKuroisoFukushimaLine: LineDefinition = {
  id: 'tohoku_kuroiso_fukushima',
  name: 'JR東北本線（黒磯～福島）',
  shortName: '東北本線（黒磯～福島）',
  operator: 'JR東日本',
  lineColor: '#00bb85',
  accentColor: '#00897b',
  defaultCars: 4,
  defaultBounds: [[36.9503,140.04],[37.7749,140.5041]],
  directionNames: {
    "inbound": "郡山・黒磯方面",
    "outbound": "郡山・福島方面",
    "inboundFull": "上り 新白河・黒磯方面",
    "outboundFull": "下り 郡山・福島方面",
    "inboundShort": "黒磯方面",
    "outboundShort": "福島方面"
},
  stations: TOHOKU_KUROISO_FUKUSHIMA_STATIONS,
  trackSegments: TOHOKU_KUROISO_FUKUSHIMA_TRACK_SEGMENTS,
  trainTypes: TOHOKU_KUROISO_FUKUSHIMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
