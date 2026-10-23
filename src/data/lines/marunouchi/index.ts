import type { LineDefinition } from '../../../types';
import { MARUNOUCHI_STATIONS } from './stations';
import { MARUNOUCHI_TRACK_SEGMENTS } from './trackGeometry';
import { MARUNOUCHI_TRAIN_TYPES } from './trainTypes';

export const marunouchiLine: LineDefinition = {
  id: 'marunouchi',
  name: '東京メトロ丸ノ内線',
  shortName: '丸ノ内線',
  operator: '東京メトロ',
  lineColor: '#e60012',
  accentColor: '#e60012',
  defaultCars: 6,
  defaultBounds: [
    [35.680, 139.610],
    [35.740, 139.780],
  ],
  directionNames: {
    inbound: '荻窪・方南町方面',
    outbound: '池袋方面',
    inboundFull: '上り 新宿・荻窪・方南町方面',
    outboundFull: '下り 銀座・東京・後楽園・池袋方面',
    inboundShort: '荻窪方面',
    outboundShort: '池袋方面',
  },
  stations: MARUNOUCHI_STATIONS,
  trackSegments: MARUNOUCHI_TRACK_SEGMENTS,
  trainTypes: MARUNOUCHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
