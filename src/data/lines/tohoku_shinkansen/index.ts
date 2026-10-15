import type { LineDefinition } from '../../../types';
import { TOHOKU_SHINKANSEN_STATIONS } from './stations';
import { TOHOKU_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';
import { TOHOKU_SHINKANSEN_TRAIN_TYPES } from './trainTypes';

export const tohokuShinkansenLine: LineDefinition = {
  id: 'tohoku_shinkansen',
  name: 'JR東北新幹線',
  shortName: '東北新幹線',
  operator: 'JR東日本',
  lineColor: '#029849',
  accentColor: '#e4007f',
  defaultCars: 10,
  defaultBounds: [
    [35.681, 139.623],
    [40.828, 141.431],
  ],
  directionNames: {
    inbound: '東京方面',
    outbound: '新青森方面',
    inboundFull: '上り 東京方面',
    outboundFull: '下り 仙台・盛岡・新青森方面',
    inboundShort: '東京方面',
    outboundShort: '新青森方面',
  },
  stations: TOHOKU_SHINKANSEN_STATIONS,
  trackSegments: TOHOKU_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: TOHOKU_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
