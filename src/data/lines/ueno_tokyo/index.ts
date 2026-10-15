import type { LineDefinition } from '../../../types';
import { UENO_TOKYO_STATIONS } from './stations';
import { UENO_TOKYO_TRAIN_TYPES } from './trainTypes';
import { UENO_TOKYO_TRACK_SEGMENTS } from './trackGeometry';

export const uenoTokyoLine: LineDefinition = {
  id: 'ueno_tokyo',
  name: 'JR上野東京ライン',
  shortName: '上野東京ライン',
  operator: 'JR東日本',
  lineColor: '#8b5a2b',
  accentColor: '#8b5a2b',
  defaultCars: 15,
  defaultBounds: [[35.35,139.53],[35.91,139.63]],
  directionNames: {
    'inbound': '東京・上野・大宮方面',
    'outbound': '品川・横浜・大船方面',
    'inboundFull': '北行 東京・上野・大宮方面',
    'outboundFull': '南行 品川・横浜・大船方面',
    'inboundShort': '大宮方面',
    'outboundShort': '大船方面'
},
  stations: UENO_TOKYO_STATIONS,
  trackSegments: UENO_TOKYO_TRACK_SEGMENTS,
  trainTypes: UENO_TOKYO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
