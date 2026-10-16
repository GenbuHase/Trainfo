import type { LineDefinition } from '../../../types';
import { SOTETSU_SHIN_YOKOHAMA_STATIONS } from './stations';
import { SOTETSU_SHIN_YOKOHAMA_TRACK_SEGMENTS } from './trackGeometry';
import { SOTETSU_SHIN_YOKOHAMA_TRAIN_TYPES } from './trainTypes';

export const sotetsuShinYokohamaLine: LineDefinition = {
  id: 'sotetsu_shin_yokohama',
  name: '相鉄新横浜線',
  shortName: '相鉄新横浜線',
  operator: '相模鉄道',
  lineColor: '#041452', // YOKOHAMA NAVYBLUE
  accentColor: '#0073bc',
  defaultCars: 10,
  defaultBounds: [
    [35.470, 139.560], // 西谷周辺
    [35.520, 139.630], // 新横浜周辺
  ],
  directionNames: {
    inbound: '新横浜方面',
    outbound: '西谷方面',
    inboundFull: '上り 新横浜・東急線方面',
    outboundFull: '下り 西谷・海老名・湘南台方面',
    inboundShort: '新横浜方面',
    outboundShort: '西谷方面',
  },
  stations: SOTETSU_SHIN_YOKOHAMA_STATIONS,
  trackSegments: SOTETSU_SHIN_YOKOHAMA_TRACK_SEGMENTS,
  trainTypes: SOTETSU_SHIN_YOKOHAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
