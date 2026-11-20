import type { LineDefinition } from '../../../types';
import { TOEI_SHINJUKU_STATIONS } from './stations';
import { TOEI_SHINJUKU_TRACK_SEGMENTS } from './trackGeometry';
import { TOEI_SHINJUKU_TRAIN_TYPES } from './trainTypes';

export const toeiShinjukuLine: LineDefinition = {
  id: 'toei_shinjuku',
  name: '都営新宿線',
  shortName: '新宿線',
  operator: '東京都交通局',
  area: 'kanto',
  lineColor: '#6cbb5a',
  accentColor: '#489138',
  defaultCars: 10,
  defaultBounds: [
    [35.6688, 139.6829],
    [35.7376, 139.9413],
  ],
  directionNames: {
    "inbound": "新宿・京王線方面",
    "outbound": "大島・本八幡方面",
    "inboundFull": "上り 新宿・京王線方面",
    "outboundFull": "下り 大島・本八幡方面",
    "inboundShort": "新宿",
    "outboundShort": "大島"
},
  stations: TOEI_SHINJUKU_STATIONS,
  trackSegments: TOEI_SHINJUKU_TRACK_SEGMENTS,
  trainTypes: TOEI_SHINJUKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
