import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SAIKYO_STATIONS } from './stations';
import { SAIKYO_TRACK_SEGMENTS } from './trackGeometry';
import { SAIKYO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const saikyoLine: LineDefinition = {
  id: 'saikyo',
  name: 'JR埼京線',
  shortName: '埼京線',
  operator: 'JR東日本',
  lineColor: '#00ac9a', // 埼京線エメラルドグリーン
  accentColor: '#007ac1', // 快速ブルー
  defaultCars: 10,
  defaultBounds: [
    [35.610, 139.600], // 大崎周辺
    [35.910, 139.740], // 大宮周辺
  ],
  directionNames: {
    inbound: '新宿・大崎方面',
    outbound: '赤羽・大宮方面',
    inboundFull: '上り 新宿・大崎・新木場方面',
    outboundFull: '下り 赤羽・大宮方面',
    inboundShort: '大崎方面',
    outboundShort: '大宮方面',
  },
  stations: SAIKYO_STATIONS,
  trackSegments: SAIKYO_TRACK_SEGMENTS,
  trainTypes: SAIKYO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
