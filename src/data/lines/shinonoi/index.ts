import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SHINONOI_STATIONS } from './stations';
import { SHINONOI_TRACK_SEGMENTS } from './trackGeometry';
import { SHINONOI_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const shinonoiLine: LineDefinition = {
  id: 'shinonoi',
  name: 'JR篠ノ井線',
  shortName: '篠ノ井線',
  operator: 'JR東日本',
  lineColor: '#d56a29', // JR東日本長野支社 ダークオレンジ
  accentColor: '#b84e12',
  defaultCars: 6,
  defaultBounds: [
    [36.080, 137.900], // 塩尻周辺
    [36.680, 138.220], // 長野周辺
  ],
  directionNames: {
    inbound: '松本・塩尻方面',
    outbound: '松本・篠ノ井・長野方面',
    inboundFull: '上り 松本・塩尻・名古屋方面',
    outboundFull: '下り 松本・篠ノ井・長野方面',
    inboundShort: '松本・塩尻方面',
    outboundShort: '松本・長野方面',
  },
  stations: SHINONOI_STATIONS,
  trackSegments: SHINONOI_TRACK_SEGMENTS,
  trainTypes: SHINONOI_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
