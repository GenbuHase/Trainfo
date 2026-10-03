import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { CHUO_STATIONS } from './stations';
import { CHUO_TRACK_SEGMENTS } from './trackGeometry';
import { CHUO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const chuoLine: LineDefinition = {
  id: 'chuo',
  name: 'JR中央線快速',
  shortName: '中央線',
  operator: 'JR東日本',
  lineColor: '#f15a22', // 中央線オレンジバーミリオン
  accentColor: '#e65100', // アクセントオレンジ
  defaultBounds: [
    [35.635, 139.270],
    [35.715, 139.775],
  ],
  directionNames: {
    inbound: '東京方面',
    outbound: '立川・八王子・高尾方面',
    inboundFull: '上り 東京方面',
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
