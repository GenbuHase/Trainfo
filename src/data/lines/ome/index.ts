import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { OME_STATIONS } from './stations';
import { OME_TRACK_SEGMENTS } from './trackGeometry';
import { OME_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const omeLine: LineDefinition = {
  id: 'ome',
  name: 'JR青梅線',
  shortName: '青梅線',
  operator: 'JR東日本',
  lineColor: '#f15a22', // 中央線・青梅線オレンジバーミリオン
  accentColor: '#16a34a', // 青梅特快グリーン
  defaultCars: 10,
  defaultBounds: [
    [35.690, 139.090], // 奥多摩周辺
    [35.820, 139.420], // 立川周辺
  ],
  directionNames: {
    inbound: '立川・新宿・東京方面',
    outbound: '青梅・奥多摩方面',
    inboundFull: '上り 立川・新宿・東京方面',
    outboundFull: '下り 青梅・奥多摩方面',
    inboundShort: '立川方面',
    outboundShort: '奥多摩方面',
  },
  stations: OME_STATIONS,
  trackSegments: OME_TRACK_SEGMENTS,
  trainTypes: OME_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
