import type { LineDefinition } from '../../../types';
import { GINZA_STATIONS } from './stations';
import { GINZA_TRACK_SEGMENTS } from './trackGeometry';
import { GINZA_TRAIN_TYPES } from './trainTypes';

export const ginzaLine: LineDefinition = {
  id: 'ginza',
  name: '東京メトロ銀座線',
  shortName: '銀座線',
  operator: '東京メトロ',
  lineColor: '#f39700',
  accentColor: '#f39700',
  defaultCars: 6,
  defaultBounds: [
    [35.650, 139.690],
    [35.720, 139.800],
  ],
  directionNames: {
    inbound: '渋谷方面',
    outbound: '浅草方面',
    inboundFull: '上り 新橋・赤坂見附・渋谷方面',
    outboundFull: '下り 銀座・日本橋・上野・浅草方面',
    inboundShort: '渋谷方面',
    outboundShort: '浅草方面',
  },
  stations: GINZA_STATIONS,
  trackSegments: GINZA_TRACK_SEGMENTS,
  trainTypes: GINZA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
