import type { LineDefinition } from '../../../types';
import { MOKA_STATIONS } from './stations';
import { MOKA_TRACK_SEGMENTS } from './trackGeometry';
import { MOKA_TRAIN_TYPES } from './trainTypes';

export const mokaLine: LineDefinition = {
  id: 'moka',
  name: '真岡鐵道真岡線',
  shortName: '真岡線',
  operator: '真岡鐵道',
  area: 'kanto',
  lineColor: '#43a047',
  accentColor: '#2e7d32',
  defaultCars: 1,
  defaultBounds: [
    [36.2889, 139.9554],
    [36.5527, 140.1963],
  ],
  directionNames: {
    "inbound": "下館方面",
    "outbound": "真岡・茂木方面",
    "inboundFull": "上り 下館方面",
    "outboundFull": "下り 真岡・茂木方面",
    "inboundShort": "下館方面",
    "outboundShort": "真岡"
},
  stations: MOKA_STATIONS,
  trackSegments: MOKA_TRACK_SEGMENTS,
  trainTypes: MOKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
