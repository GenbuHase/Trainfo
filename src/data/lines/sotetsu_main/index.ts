import type { LineDefinition } from '../../../types';
import { SOTETSU_MAIN_STATIONS } from './stations';
import { SOTETSU_MAIN_TRACK_SEGMENTS } from './trackGeometry';
import { SOTETSU_MAIN_TRAIN_TYPES } from './trainTypes';

export const sotetsuMainLine: LineDefinition = {
  id: 'sotetsu_main',
  name: '相鉄本線',
  shortName: '相鉄線',
  operator: '相模鉄道',
  lineColor: '#041452', // YOKOHAMA NAVYBLUE
  accentColor: '#0073bc',
  defaultCars: 10,
  defaultBounds: [
    [35.440, 139.380], // 海老名周辺
    [35.480, 139.630], // 横浜周辺
  ],
  directionNames: {
    inbound: '横浜方面',
    outbound: '海老名方面',
    inboundFull: '上り 横浜・新横浜方面',
    outboundFull: '下り 二俣川・海老名方面',
    inboundShort: '横浜方面',
    outboundShort: '海老名方面',
  },
  stations: SOTETSU_MAIN_STATIONS,
  trackSegments: SOTETSU_MAIN_TRACK_SEGMENTS,
  trainTypes: SOTETSU_MAIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
