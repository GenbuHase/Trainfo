import type { LineDefinition } from '../../../types';
import { TOKYO_MONORAIL_STATIONS } from './stations';
import { TOKYO_MONORAIL_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYO_MONORAIL_TRAIN_TYPES } from './trainTypes';

export const tokyoMonorailLine: LineDefinition = {
  id: 'tokyo_monorail',
  name: '東京モノレール羽田空港線',
  shortName: '東京モノレール',
  operator: '東京モノレール',
  area: 'kanto',
  lineColor: '#003686',
  accentColor: '#00a0e9',
  defaultCars: 6,
  defaultBounds: [
    [35.5277, 139.7322],
    [35.6714, 139.8036],
  ],
  directionNames: {
    "inbound": "浜松町方面",
    "outbound": "羽田空港第2ターミナル方面",
    "inboundFull": "上り 浜松町方面",
    "outboundFull": "下り 羽田空港第2ターミナル方面",
    "inboundShort": "上り（浜松町方面）",
    "outboundShort": "下り（羽田空港第2ターミナル方面）"
},
  stations: TOKYO_MONORAIL_STATIONS,
  trackSegments: TOKYO_MONORAIL_TRACK_SEGMENTS,
  trainTypes: TOKYO_MONORAIL_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
