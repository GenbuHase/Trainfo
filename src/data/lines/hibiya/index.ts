import type { LineDefinition } from '../../../types';
import { HIBIYA_STATIONS } from './stations';
import { HIBIYA_TRACK_SEGMENTS } from './trackGeometry';
import { HIBIYA_TRAIN_TYPES } from './trainTypes';

export const hibiyaLine: LineDefinition = {
  id: 'hibiya',
  name: '東京メトロ日比谷線',
  shortName: '日比谷線',
  operator: '東京メトロ',
  lineColor: '#9caeb7',
  accentColor: '#c8102e',
  defaultCars: 7,
  defaultBounds: [
    [35.640, 139.690],
    [35.760, 139.810],
  ],
  directionNames: {
    inbound: '中目黒方面',
    outbound: '北千住・東武線方面',
    inboundFull: '上り 銀座・霞ケ関・中目黒方面',
    outboundFull: '下り 上野・北千住・東武スカイツリーライン方面',
    inboundShort: '中目黒方面',
    outboundShort: '北千住方面',
  },
  stations: HIBIYA_STATIONS,
  trackSegments: HIBIYA_TRACK_SEGMENTS,
  trainTypes: HIBIYA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
