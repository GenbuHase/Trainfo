import type { LineDefinition } from '../../../types';
import { UTSUNOMIYA_STATIONS } from './stations';
import { UTSUNOMIYA_TRAIN_TYPES } from './trainTypes';
import { UTSUNOMIYA_TRACK_SEGMENTS } from './trackGeometry';

export const utsunomiyaLine: LineDefinition = {
  id: 'utsunomiya',
  name: 'JR宇都宮線',
  shortName: '宇都宮線',
  operator: 'JR東日本',
  lineColor: '#f68b1e',
  accentColor: '#f68b1e',
  defaultCars: 15,
  defaultBounds: [[35.68,139.76],[36.98,140.06]],
  directionNames: {
    'inbound': '大宮・上野・東京方面',
    'outbound': '久喜・宇都宮・黒磯方面',
    'inboundFull': '上り 大宮・上野・東京方面',
    'outboundFull': '下り 久喜・宇都宮・黒磯方面',
    'inboundShort': '上野・東京方面',
    'outboundShort': '宇都宮方面'
},
  stations: UTSUNOMIYA_STATIONS,
  trackSegments: UTSUNOMIYA_TRACK_SEGMENTS,
  trainTypes: UTSUNOMIYA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
