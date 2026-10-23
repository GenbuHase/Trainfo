import type { LineDefinition } from '../../../types';
import { NAMBOKU_STATIONS } from './stations';
import { NAMBOKU_TRACK_SEGMENTS } from './trackGeometry';
import { NAMBOKU_TRAIN_TYPES } from './trainTypes';

export const nambokuLine: LineDefinition = {
  id: 'namboku',
  name: '東京メトロ南北線',
  shortName: '南北線',
  operator: '東京メトロ',
  lineColor: '#00ac9a',
  accentColor: '#0067b8',
  defaultCars: 6,
  defaultBounds: [
    [35.630, 139.700],
    [35.790, 139.740],
  ],
  directionNames: {
    inbound: '目黒・東急線方面',
    outbound: '赤羽岩淵・埼玉高速線方面',
    inboundFull: '上り 永田町・白金高輪・目黒・東急線方面',
    outboundFull: '下り 飯田橋・駒込・赤羽岩淵・埼玉高速鉄道線方面',
    inboundShort: '目黒方面',
    outboundShort: '赤羽岩淵方面',
  },
  stations: NAMBOKU_STATIONS,
  trackSegments: NAMBOKU_TRACK_SEGMENTS,
  trainTypes: NAMBOKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
