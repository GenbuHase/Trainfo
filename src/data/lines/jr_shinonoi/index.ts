import type { LineDefinition } from '../../../types';
import { SHINONOI_STATIONS } from './stations';
import { SHINONOI_TRACK_SEGMENTS } from './trackGeometry';
import { SHINONOI_TRAIN_TYPES } from './trainTypes';

export const shinonoiLine: LineDefinition = {
  id: 'jr_shinonoi',
  name: 'JR篠ノ井線',
  shortName: '篠ノ井線',
  operator: 'JR東日本',
  lineColor: '#cb5f12', // JR東日本長野支社 ダークオレンジ
  accentColor: '#b84e12',
  defaultCars: 6,
  defaultBounds: [
    [36.080, 137.900], // 塩尻周辺
    [36.680, 138.220], // 長野周辺
  ],
  directionNames: {
    inbound: '塩尻方面',
    outbound: '篠ノ井方面',
    inboundFull: '上り 塩尻方面',
    outboundFull: '下り 篠ノ井方面',
    inboundShort: '上り（塩尻方面）',
    outboundShort: '下り（篠ノ井方面）',
  },
  stations: SHINONOI_STATIONS,
  trackSegments: SHINONOI_TRACK_SEGMENTS,
  trainTypes: SHINONOI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
