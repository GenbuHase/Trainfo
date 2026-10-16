import type { LineDefinition } from '../../../types';
import { SHONAN_SHINJUKU_STATIONS } from './stations';
import { SHONAN_SHINJUKU_TRAIN_TYPES } from './trainTypes';
import { SHONAN_SHINJUKU_TRACK_SEGMENTS } from './trackGeometry';

export const shonanShinjukuLine: LineDefinition = {
  id: 'shonan_shinjuku',
  name: 'JR湘南新宿ライン',
  shortName: '湘南新宿ライン',
  operator: 'JR東日本',
  lineColor: '#de0515',
  accentColor: '#ff871c',
  defaultCars: 15,
  defaultBounds: [[35.35,139.53],[35.91,139.63]],
  directionNames: {
    'inbound': '新宿・大宮・高崎・宇都宮方面',
    'outbound': '横浜・大船・小田原・逗子方面',
    'inboundFull': '北行 新宿・大宮・高崎・宇都宮方面',
    'outboundFull': '南行 横浜・大船・小田原・逗子方面',
    'inboundShort': '大宮方面',
    'outboundShort': '大船方面'
},
  stations: SHONAN_SHINJUKU_STATIONS,
  trackSegments: SHONAN_SHINJUKU_TRACK_SEGMENTS,
  trainTypes: SHONAN_SHINJUKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
