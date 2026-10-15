import type { LineDefinition } from '../../../types';
import { JOETSU_STATIONS } from './stations';
import { JOETSU_TRAIN_TYPES } from './trainTypes';
import { JOETSU_TRACK_SEGMENTS } from './trackGeometry';

export const joetsuLine: LineDefinition = {
  id: 'joetsu',
  name: 'JR上越線',
  shortName: '上越線',
  operator: 'JR東日本',
  lineColor: '#00a0de',
  accentColor: '#00a0de',
  defaultCars: 4,
  defaultBounds: [[36.31, 138.95], [36.79, 139.06]],
  directionNames: {
    'inbound': '高崎方面',
    'outbound': '渋川・水上方面',
    'inboundFull': '上り 高崎方面',
    'outboundFull': '下り 渋川・水上方面',
    'inboundShort': '高崎方面',
    'outboundShort': '水上方面',
  },
  stations: JOETSU_STATIONS,
  trackSegments: JOETSU_TRACK_SEGMENTS,
  trainTypes: JOETSU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
