import type { LineDefinition } from '../../../types';
import { TOKAIDO_STATIONS } from './stations';
import { TOKAIDO_TRAIN_TYPES } from './trainTypes';
import { TOKAIDO_TRACK_SEGMENTS } from './trackGeometry';

export const tokaidoLine: LineDefinition = {
  id: 'tokaido',
  name: 'JR東海道線',
  shortName: '東海道線',
  operator: 'JR東日本',
  lineColor: '#f68b1e',
  accentColor: '#f68b1e',
  defaultCars: 15,
  defaultBounds: [[35.09,139.06],[35.69,139.78]],
  directionNames: {
    'inbound': '品川・東京・上野方面',
    'outbound': '横浜・小田原・熱海方面',
    'inboundFull': '上り 品川・東京・上野方面',
    'outboundFull': '下り 横浜・小田原・熱海方面',
    'inboundShort': '東京方面',
    'outboundShort': '熱海方面'
},
  stations: TOKAIDO_STATIONS,
  trackSegments: TOKAIDO_TRACK_SEGMENTS,
  trainTypes: TOKAIDO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
