import type { LineDefinition } from '../../../types';
import { YOKOSUKA_STATIONS } from './stations';
import { YOKOSUKA_TRAIN_TYPES } from './trainTypes';
import { YOKOSUKA_TRACK_SEGMENTS } from './trackGeometry';

export const yokosukaLine: LineDefinition = {
  id: 'yokosuka',
  name: 'JR横須賀線',
  shortName: '横須賀線',
  operator: 'JR東日本',
  lineColor: '#0074be',
  accentColor: '#0074be',
  defaultCars: 15,
  defaultBounds: [[35.21,139.69],[35.69,139.78]],
  directionNames: {
    'inbound': '品川・東京・千葉方面',
    'outbound': '横浜・逗子・久里浜方面',
    'inboundFull': '上り 品川・東京・千葉方面',
    'outboundFull': '下り 横浜・逗子・久里浜方面',
    'inboundShort': '東京方面',
    'outboundShort': '久里浜方面'
},
  stations: YOKOSUKA_STATIONS,
  trackSegments: YOKOSUKA_TRACK_SEGMENTS,
  trainTypes: YOKOSUKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
