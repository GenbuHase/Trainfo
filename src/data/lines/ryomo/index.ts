import type { LineDefinition } from '../../../types';
import { RYOMO_STATIONS } from './stations';
import { RYOMO_TRAIN_TYPES } from './trainTypes';
import { RYOMO_TRACK_SEGMENTS } from './trackGeometry';

export const ryomoLine: LineDefinition = {
  id: 'ryomo',
  name: 'JR両毛線',
  shortName: '両毛線',
  operator: 'JR東日本',
  lineColor: '#ffd400',
  accentColor: '#ffd400',
  defaultCars: 4,
  defaultBounds: [[36.28, 139.03], [36.43, 139.83]],
  directionNames: {
    'inbound': '栃木・小山方面',
    'outbound': '桐生・前橋・高崎方面',
    'inboundFull': '上り 栃木・小山方面',
    'outboundFull': '下り 桐生・前橋・高崎方面',
    'inboundShort': '小山方面',
    'outboundShort': '前橋方面',
  },
  stations: RYOMO_STATIONS,
  trackSegments: RYOMO_TRACK_SEGMENTS,
  trainTypes: RYOMO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
