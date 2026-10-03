import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { CHUO_MAIN_STATIONS } from './stations';
import { CHUO_MAIN_TRACK_SEGMENTS } from './trackGeometry';
import { CHUO_MAIN_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const chuoMainLine: LineDefinition = {
  id: 'chuo_main',
  name: 'JR中央本線',
  shortName: '中央本線',
  operator: 'JR東日本',
  lineColor: '#0072bc', // 中央東線ブルー
  accentColor: '#f15a22', // 中央線オレンジ
  defaultBounds: [
    [35.550, 137.920], // 塩尻周辺
    [36.150, 139.300], // 高尾周辺
  ],
  directionNames: {
    inbound: '大月・高尾・東京方面',
    outbound: '甲府・塩尻・松本方面',
    inboundFull: '上り 大月・高尾・東京方面',
    outboundFull: '下り 甲府・塩尻・松本方面',
    inboundShort: '高尾方面',
    outboundShort: '塩尻方面',
  },
  stations: CHUO_MAIN_STATIONS,
  trackSegments: CHUO_MAIN_TRACK_SEGMENTS,
  trainTypes: CHUO_MAIN_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
