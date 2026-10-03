import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { OITO_EAST_STATIONS } from './stations';
import { OITO_EAST_TRACK_SEGMENTS } from './trackGeometry';
import { OITO_EAST_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const oitoEastLine: LineDefinition = {
  id: 'oito_east',
  name: 'JR東日本 大糸線',
  shortName: '大糸線(松本〜南小谷)',
  operator: 'JR東日本',
  lineColor: '#8a579e', // 大糸線パープル
  accentColor: '#734185',
  defaultBounds: [
    [36.200, 137.820], // 松本周辺
    [36.800, 138.000], // 南小谷周辺
  ],
  directionNames: {
    inbound: '松本方面',
    outbound: '信濃大町・白馬・南小谷方面',
    inboundFull: '上り 松本・新宿方面',
    outboundFull: '下り 信濃大町・白馬・南小谷方面',
    inboundShort: '松本方面',
    outboundShort: '南小谷方面',
  },
  stations: OITO_EAST_STATIONS,
  trackSegments: OITO_EAST_TRACK_SEGMENTS,
  trainTypes: OITO_EAST_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
