import type { LineDefinition } from '../../../types';
import { OU_AKITA_AOMORI_STATIONS } from './stations';
import { OU_AKITA_AOMORI_TRACK_SEGMENTS } from './trackGeometry';
import { OU_AKITA_AOMORI_TRAIN_TYPES } from './trainTypes';

export const ouAkitaAomoriLine: LineDefinition = {
  id: 'ou_akita_aomori',
  name: 'JR奥羽本線（秋田～青森）',
  shortName: '奥羽本線（秋田～青森）',
  operator: 'JR東日本',
  lineColor: '#ff7e1c',
  accentColor: '#e60012',
  defaultCars: 4,
  defaultBounds: [[39.6769, 140.0179], [40.8699, 140.7742]],
  directionNames: {
  "inbound": "秋田方面",
  "outbound": "青森方面",
  "inboundFull": "上り 秋田方面",
  "outboundFull": "下り 青森方面",
  "inboundShort": "秋田方面",
  "outboundShort": "青森方面"
},
  stations: OU_AKITA_AOMORI_STATIONS,
  trackSegments: OU_AKITA_AOMORI_TRACK_SEGMENTS,
  trainTypes: OU_AKITA_AOMORI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
