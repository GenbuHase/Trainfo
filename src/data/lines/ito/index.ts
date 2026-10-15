import type { LineDefinition } from '../../../types';
import { ITO_STATIONS } from './stations';
import { ITO_TRAIN_TYPES } from './trainTypes';
import { ITO_TRACK_SEGMENTS } from './trackGeometry';

export const itoLine: LineDefinition = {
  id: 'ito',
  name: 'JR伊東線',
  shortName: '伊東線',
  operator: 'JR東日本',
  lineColor: '#f68b1e',
  accentColor: '#f68b1e',
  defaultCars: 6,
  defaultBounds: [[34.96,139.08],[35.11,139.085]],
  directionNames: {
    'inbound': '熱海・東京方面',
    'outbound': '伊東・伊豆急下田方面',
    'inboundFull': '上り 熱海・東京方面',
    'outboundFull': '下り 伊東・伊豆急下田方面',
    'inboundShort': '熱海方面',
    'outboundShort': '伊東方面'
},
  stations: ITO_STATIONS,
  trackSegments: ITO_TRACK_SEGMENTS,
  trainTypes: ITO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
