import type { LineDefinition } from '../../../types';
import { UETSU_MAIN_STATIONS } from './stations';
import { UETSU_MAIN_TRACK_SEGMENTS } from './trackGeometry';
import { UETSU_MAIN_TRAIN_TYPES } from './trainTypes';

export const uetsuMainLine: LineDefinition = {
  id: 'uetsu_main',
  name: 'JR羽越本線',
  shortName: '羽越本線',
  operator: 'JR東日本',
  lineColor: '#2e7d32',
  accentColor: '#1b5e20',
  defaultCars: 4,
  defaultBounds: [
    [37.40, 138.90],
    [39.90, 140.30],
  ],
  directionNames: {
    inbound: '新津方面',
    outbound: '秋田方面',
    inboundFull: '上り 新津・新発田・村上方面',
    outboundFull: '下り 酒田・鶴岡・秋田方面',
    inboundShort: '新津方面',
    outboundShort: '秋田方面',
  },
  stations: UETSU_MAIN_STATIONS,
  trackSegments: UETSU_MAIN_TRACK_SEGMENTS,
  trainTypes: UETSU_MAIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
