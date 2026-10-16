import type { LineDefinition } from '../../../types';
import { SOBU_RAPID_STATIONS } from './stations';
import { SOBU_RAPID_TRAIN_TYPES } from './trainTypes';
import { SOBU_RAPID_TRACK_SEGMENTS } from './trackGeometry';

export const sobuRapidLine: LineDefinition = {
  id: 'sobu_rapid',
  name: 'JR総武快速線',
  shortName: '総武快速線',
  operator: 'JR東日本',
  lineColor: '#0074be',
  accentColor: '#0074be',
  defaultCars: 15,
  defaultBounds: [[35.6,139.76],[35.71,140.13]],
  directionNames: {
    'inbound': '東京・品川・逗子方面',
    'outbound': '船橋・津田沼・千葉方面',
    'inboundFull': '上り 東京・品川・逗子方面',
    'outboundFull': '下り 船橋・津田沼・千葉方面',
    'inboundShort': '東京方面',
    'outboundShort': '千葉方面'
},
  stations: SOBU_RAPID_STATIONS,
  trackSegments: SOBU_RAPID_TRACK_SEGMENTS,
  trainTypes: SOBU_RAPID_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
