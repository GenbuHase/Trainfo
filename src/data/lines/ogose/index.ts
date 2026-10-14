import type { LineDefinition } from '../../../types';
import { STATIONS } from './stations';
import { STATION_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const ogoseLine: LineDefinition = {
  id: 'ogose',
  name: '東武越生線',
  shortName: '越生線',
  operator: '東武鉄道',
  lineColor: '#10428e', // 東武グループブルー
  accentColor: '#ed6d00', // 東武ブライトオレンジ
  defaultCars: 4,
  defaultBounds: [
    [35.920, 139.290],
    [35.975, 139.405],
  ],
  directionNames: {
    inbound: '坂戸方面',
    outbound: '越生方面',
    inboundFull: '上り 坂戸方面',
    outboundFull: '下り 越生方面',
    inboundShort: '上り (坂戸方面)',
    outboundShort: '下り (越生方面)',
  },
  stations: STATIONS,
  trackSegments: STATION_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
