import type { LineDefinition } from '../../../types';
import { TOKAIDO_ATAMI_TOYOHASHI_STATIONS } from './stations';
import { TOKAIDO_ATAMI_TOYOHASHI_TRAIN_TYPES } from './trainTypes';
import { TOKAIDO_ATAMI_TOYOHASHI_TRACK_SEGMENTS } from './trackGeometry';

export const tokaidoAtamiToyohashiLine: LineDefinition = {
  id: 'tokaido_atami_toyohashi',
  name: 'JR東海道線（熱海～豊橋）',
  shortName: '東海道線（静岡地区）',
  operator: 'JR東海',
  lineColor: '#ff7322',
  accentColor: '#ff7e1c',
  defaultCars: 3,
  defaultBounds: [[34.6557,137.3529],[35.1813,139.1081]],
  directionNames: {
      "inbound": "沼津・熱海方面",
      "outbound": "静岡・浜松・豊橋方面",
      "inboundFull": "上り 沼津・熱海・東京方面",
      "outboundFull": "下り 静岡・浜松・豊橋方面",
      "inboundShort": "熱海方面",
      "outboundShort": "豊橋方面"
  },
  stations: TOKAIDO_ATAMI_TOYOHASHI_STATIONS,
  trackSegments: TOKAIDO_ATAMI_TOYOHASHI_TRACK_SEGMENTS,
  trainTypes: TOKAIDO_ATAMI_TOYOHASHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
