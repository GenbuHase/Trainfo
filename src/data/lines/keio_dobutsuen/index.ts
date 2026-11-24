import type { LineDefinition } from '../../../types';
import { KEIO_DOBUTSUEN_STATIONS } from './stations';
import { KEIO_DOBUTSUEN_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_DOBUTSUEN_TRAIN_TYPES } from './trainTypes';

export const keioDobutsuenLine: LineDefinition = {
  id: 'keio_dobutsuen',
  name: '京王動物園線',
  shortName: '動物園線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#dd0077',
  accentColor: '#1d2088',
  defaultCars: 4,
  defaultBounds: [
    [35.6349, 139.3911],
    [35.6777, 139.4272],
  ],
  directionNames: {
    "inbound": "高幡不動方面",
    "outbound": "多摩動物公園方面",
    "inboundFull": "上り 高幡不動方面",
    "outboundFull": "下り 多摩動物公園方面",
    "inboundShort": "上り（高幡不動方面）",
    "outboundShort": "下り（多摩動物公園方面）"
},
  stations: KEIO_DOBUTSUEN_STATIONS,
  trackSegments: KEIO_DOBUTSUEN_TRACK_SEGMENTS,
  trainTypes: KEIO_DOBUTSUEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
