import type { LineDefinition } from '../../../types';
import { HANZOMON_STATIONS } from './stations';
import { HANZOMON_TRACK_SEGMENTS } from './trackGeometry';
import { HANZOMON_TRAIN_TYPES } from './trainTypes';

export const hanzomonLine: LineDefinition = {
  id: 'hanzomon',
  name: '東京メトロ半蔵門線',
  shortName: '半蔵門線',
  operator: '東京メトロ',
  lineColor: '#9b7cb6',
  accentColor: '#e05a00',
  defaultCars: 10,
  defaultBounds: [
    [35.650, 139.690],
    [35.720, 139.830],
  ],
  directionNames: {
    inbound: '渋谷・田園都市線方面',
    outbound: '押上・東武線方面',
    inboundFull: '上り 表参道・渋谷・東急田園都市線方面',
    outboundFull: '下り 大手町・押上・東武スカイツリーライン方面',
    inboundShort: '渋谷方面',
    outboundShort: '押上方面',
  },
  stations: HANZOMON_STATIONS,
  trackSegments: HANZOMON_TRACK_SEGMENTS,
  trainTypes: HANZOMON_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
