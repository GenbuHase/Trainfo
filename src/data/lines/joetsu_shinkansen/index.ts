import type { LineDefinition } from '../../../types';
import { JOETSU_SHINKANSEN_STATIONS } from './stations';
import { JOETSU_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';
import { JOETSU_SHINKANSEN_TRAIN_TYPES } from './trainTypes';

export const joetsuShinkansenLine: LineDefinition = {
  id: 'joetsu_shinkansen',
  name: 'JR上越新幹線',
  shortName: '上越新幹線',
  operator: 'JR東日本',
  lineColor: '#f58d79',
  accentColor: '#029849',
  defaultCars: 12,
  defaultBounds: [
    [35.681, 138.809],
    [37.913, 139.768],
  ],
  directionNames: {
    inbound: '東京方面',
    outbound: '新潟方面',
    inboundFull: '上り 東京方面',
    outboundFull: '下り 高崎・越後湯沢・新潟方面',
    inboundShort: '東京方面',
    outboundShort: '新潟方面',
  },
  stations: JOETSU_SHINKANSEN_STATIONS,
  trackSegments: JOETSU_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: JOETSU_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
