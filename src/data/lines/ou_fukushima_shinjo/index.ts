import type { LineDefinition } from '../../../types';
import { OU_FUKUSHIMA_SHINJO_STATIONS } from './stations';
import { OU_FUKUSHIMA_SHINJO_TRACK_SEGMENTS } from './trackGeometry';
import { OU_FUKUSHIMA_SHINJO_TRAIN_TYPES } from './trainTypes';

export const ouFukushimaShinjoLine: LineDefinition = {
  id: 'ou_fukushima_shinjo',
  name: 'JR奥羽本線（福島～新庄）',
  shortName: '奥羽本線（福島～新庄）',
  operator: 'JR東日本',
  lineColor: '#ff7e1c',
  accentColor: '#0073bc',
  defaultCars: 4,
  defaultBounds: [[37.7148, 140.0883], [38.8026, 140.4996]],
  directionNames: {
  "inbound": "福島方面",
  "outbound": "新庄方面",
  "inboundFull": "上り 福島方面",
  "outboundFull": "下り 新庄方面",
  "inboundShort": "福島方面",
  "outboundShort": "新庄方面"
},
  stations: OU_FUKUSHIMA_SHINJO_STATIONS,
  trackSegments: OU_FUKUSHIMA_SHINJO_TRACK_SEGMENTS,
  trainTypes: OU_FUKUSHIMA_SHINJO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
