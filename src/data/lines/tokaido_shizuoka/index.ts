import type { LineDefinition } from '../../../types';
import { TOKAIDO_SHIZUOKA_STATIONS } from './stations';
import { TOKAIDO_SHIZUOKA_TRAIN_TYPES } from './trainTypes';
import { TOKAIDO_SHIZUOKA_TRACK_SEGMENTS } from './trackGeometry';

export const tokaidoShizuokaLine: LineDefinition = {
  id: 'tokaido_shizuoka',
  name: 'JR東海道線（熱海～沼津）',
  shortName: '東海道線（静岡地区）',
  operator: 'JR東海',
  lineColor: '#f68b1e',
  accentColor: '#f68b1e',
  defaultCars: 3,
  defaultBounds: [[35.08, 138.84], [35.15, 139.09]],
  directionNames: {
    'inbound': '熱海・東京方面',
    'outbound': '三島・沼津・静岡方面',
    'inboundFull': '上り 熱海・東京方面',
    'outboundFull': '下り 三島・沼津・静岡方面',
    'inboundShort': '熱海方面',
    'outboundShort': '沼津方面',
  },
  stations: TOKAIDO_SHIZUOKA_STATIONS,
  trackSegments: TOKAIDO_SHIZUOKA_TRACK_SEGMENTS,
  trainTypes: TOKAIDO_SHIZUOKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
