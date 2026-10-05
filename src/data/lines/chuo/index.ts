import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { CHUO_STATIONS } from './stations';
import { CHUO_TRACK_SEGMENTS } from './trackGeometry';
import { CHUO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const chuoLine: LineDefinition = {
  id: 'chuo',
  name: 'JR中央線',
  shortName: '中央線',
  operator: 'JR東日本',
  lineColor: '#f15a22', // 中央線オレンジバーミリオン
  accentColor: '#c9252d', // 特快・速達カラー
  defaultCars: 10,
  defaultBounds: [
    [35.600, 139.250], // 高尾周辺
    [35.750, 139.780], // 東京周辺
  ],
  directionNames: {
    inbound: '東京・新宿方面',
    outbound: '立川・八王子・高尾方面',
    inboundFull: '上り 東京・新宿方面',
    outboundFull: '下り 立川・八王子・高尾方面',
    inboundShort: '東京方面',
    outboundShort: '高尾方面',
  },
  stations: CHUO_STATIONS,
  trackSegments: CHUO_TRACK_SEGMENTS,
  trainTypes: CHUO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
