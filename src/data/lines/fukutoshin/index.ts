import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { FUKUTOSHIN_STATIONS } from './stations';
import { FUKUTOSHIN_TRACK_SEGMENTS } from './trackGeometry';
import { FUKUTOSHIN_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const fukutoshinLine: LineDefinition = {
  id: 'fukutoshin',
  name: '東京メトロ副都心線',
  shortName: '副都心線',
  operator: '東京メトロ',
  lineColor: '#9c5f24', // 副都心線ブラウン
  accentColor: '#e05a00', // 急行オレンジ
  defaultBounds: [
    [35.640, 139.600], // 渋谷周辺
    [35.800, 139.720], // 和光市周辺
  ],
  directionNames: {
    inbound: '和光市方面',
    outbound: '渋谷方面',
    inboundFull: '上り 和光市・東武東上線方面',
    outboundFull: '下り 新宿三丁目・渋谷方面',
    inboundShort: '和光市方面',
    outboundShort: '渋谷方面',
  },
  stations: FUKUTOSHIN_STATIONS,
  trackSegments: FUKUTOSHIN_TRACK_SEGMENTS,
  trainTypes: FUKUTOSHIN_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
