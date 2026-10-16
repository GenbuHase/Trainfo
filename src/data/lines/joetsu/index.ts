import type { LineDefinition } from '../../../types';
import { JOETSU_STATIONS } from './stations';
import { JOETSU_TRAIN_TYPES } from './trainTypes';
import { JOETSU_TRACK_SEGMENTS } from './trackGeometry';

export const joetsuLine: LineDefinition = {
  id: 'joetsu',
  name: 'JR上越線',
  shortName: '上越線',
  operator: 'JR東日本',
  lineColor: '#00b3e6',
  accentColor: '#00b3e6',
  defaultCars: 4,
  defaultBounds: [[36.31, 138.78], [37.46, 139.08]],
  directionNames: {
    'inbound': '高崎方面',
    'outbound': '水上・長岡方面',
    'inboundFull': '上り 水上・高崎方面',
    'outboundFull': '下り 水上・長岡方面',
    'inboundShort': '高崎方面',
    'outboundShort': '長岡方面',
  },
  stations: JOETSU_STATIONS,
  trackSegments: JOETSU_TRACK_SEGMENTS,
  trainTypes: JOETSU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
