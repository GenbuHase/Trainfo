import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { CHUO_STATIONS } from './stations';
import { CHUO_TRACK_SEGMENTS } from './trackGeometry';
import { CHUO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const chuoLine: LineDefinition = {
  id: 'chuo',
  name: 'JR中央線・中央本線',
  shortName: '中央線・中央本線',
  operator: 'JR東日本',
  lineColor: '#f15a22', // 中央線オレンジバーミリオン
  accentColor: '#0072bc', // 中央東線ブルー
  defaultBounds: [
    [35.550, 137.920],
    [36.150, 139.780],
  ],
  directionNames: {
    inbound: '東京・新宿方面',
    outbound: '高尾・甲府・塩尻方面',
    inboundFull: '上り 東京・新宿方面',
    outboundFull: '下り 高尾・甲府・塩尻方面',
    inboundShort: '東京方面',
    outboundShort: '塩尻方面',
  },
  stations: CHUO_STATIONS,
  trackSegments: CHUO_TRACK_SEGMENTS,
  trainTypes: CHUO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
