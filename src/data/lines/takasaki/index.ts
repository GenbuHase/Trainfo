import type { LineDefinition } from '../../../types';
import { TAKASAKI_STATIONS } from './stations';
import { TAKASAKI_TRAIN_TYPES } from './trainTypes';
import { TAKASAKI_TRACK_SEGMENTS } from './trackGeometry';

export const takasakiLine: LineDefinition = {
  id: 'takasaki',
  name: 'JR高崎線',
  shortName: '高崎線',
  operator: 'JR東日本',
  lineColor: '#f68b1e',
  accentColor: '#f68b1e',
  defaultCars: 15,
  defaultBounds: [[35.68,139.76],[36.33,139.02]],
  directionNames: {
    'inbound': '大宮・上野・東京方面',
    'outbound': '熊谷・高崎・前橋方面',
    'inboundFull': '上り 大宮・上野・東京方面',
    'outboundFull': '下り 熊谷・高崎・前橋方面',
    'inboundShort': '上野・東京方面',
    'outboundShort': '高崎方面'
},
  stations: TAKASAKI_STATIONS,
  trackSegments: TAKASAKI_TRACK_SEGMENTS,
  trainTypes: TAKASAKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
