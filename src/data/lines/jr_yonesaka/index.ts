import type { LineDefinition } from '../../../types';
import { YONESAKA_STATIONS } from './stations';
import { YONESAKA_TRACK_SEGMENTS } from './trackGeometry';
import { YONESAKA_TRAIN_TYPES } from './trainTypes';

export const yonesakaLine: LineDefinition = {
  id: 'jr_yonesaka',
  name: 'JR米坂線',
  shortName: '米坂線',
  operator: 'JR東日本',
  area: 'tohoku',
  lineColor: '#b074d6',
  accentColor: '#7c5ba6',
  defaultCars: 2,
  defaultBounds: [[37.876,139.4269],[38.1404,140.1483]],
  directionNames: {
    "inbound": "今泉・米沢方面",
    "outbound": "今泉・小国・坂町方面",
    "inboundFull": "上り 今泉・米沢方面",
    "outboundFull": "下り 小国・坂町方面",
    "inboundShort": "上り（米沢方面）",
    "outboundShort": "下り（坂町方面）"
},
  stations: YONESAKA_STATIONS,
  trackSegments: YONESAKA_TRACK_SEGMENTS,
  trainTypes: YONESAKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
