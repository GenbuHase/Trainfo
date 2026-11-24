import type { LineDefinition } from '../../../types';
import { TAMA_MONORAIL_STATIONS } from './stations';
import { TAMA_MONORAIL_TRACK_SEGMENTS } from './trackGeometry';
import { TAMA_MONORAIL_TRAIN_TYPES } from './trainTypes';

export const tamaMonorailLine: LineDefinition = {
  id: 'tama_monorail',
  name: '多摩都市モノレール線',
  shortName: '多摩モノレール',
  operator: '多摩都市モノレール',
  area: 'kanto',
  lineColor: '#ea5514',
  accentColor: '#b83c07',
  defaultCars: 4,
  defaultBounds: [
    [35.6092, 139.3889],
    [35.7610, 139.4379],
  ],
  directionNames: {
    "inbound": "立川・上北台方面",
    "outbound": "高幡不動・多摩センター方面",
    "inboundFull": "上り 立川・上北台方面",
    "outboundFull": "下り 高幡不動・多摩センター方面",
    "inboundShort": "上り（上北台方面）",
    "outboundShort": "下り（多摩センター方面）"
},
  stations: TAMA_MONORAIL_STATIONS,
  trackSegments: TAMA_MONORAIL_TRACK_SEGMENTS,
  trainTypes: TAMA_MONORAIL_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
