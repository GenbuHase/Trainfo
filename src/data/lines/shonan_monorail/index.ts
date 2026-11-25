import type { LineDefinition } from '../../../types';
import { SHONAN_MONORAIL_STATIONS } from './stations';
import { SHONAN_MONORAIL_TRACK_SEGMENTS } from './trackGeometry';
import { SHONAN_MONORAIL_TRAIN_TYPES } from './trainTypes';

export const shonanMonorailLine: LineDefinition = {
  id: 'shonan_monorail',
  name: '湘南モノレール江の島線',
  shortName: '湘南モノレール',
  operator: '湘南モノレール',
  area: 'kanto',
  lineColor: '#e60012',
  accentColor: '#b8000e',
  defaultCars: 3,
  defaultBounds: [
    [35.2967, 139.4726],
    [35.3676, 139.5464],
  ],
  directionNames: {
    "inbound": "大船方面",
    "outbound": "湘南江の島方面",
    "inboundFull": "上り 大船方面",
    "outboundFull": "下り 湘南江の島方面",
    "inboundShort": "上り（大船方面）",
    "outboundShort": "下り（湘南江の島方面）"
},
  stations: SHONAN_MONORAIL_STATIONS,
  trackSegments: SHONAN_MONORAIL_TRACK_SEGMENTS,
  trainTypes: SHONAN_MONORAIL_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
