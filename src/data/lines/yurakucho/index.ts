import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { YURAKUCHO_STATIONS } from './stations';
import { YURAKUCHO_TRACK_SEGMENTS } from './trackGeometry';
import { YURAKUCHO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const yurakuchoLine: LineDefinition = {
  id: 'yurakucho',
  name: '東京メトロ有楽町線',
  shortName: '有楽町線',
  operator: '東京メトロ',
  lineColor: '#c1a470', // 有楽町線ゴールド
  accentColor: '#c1a470',
  defaultCars: 10,
  defaultBounds: [
    [35.630, 139.600], // 新木場・臨海部
    [35.800, 139.840], // 和光市周辺
  ],
  directionNames: {
    inbound: '和光市方面',
    outbound: '新木場方面',
    inboundFull: '上り 和光市・東武東上線方面',
    outboundFull: '下り 有楽町・新木場方面',
    inboundShort: '和光市方面',
    outboundShort: '新木場方面',
  },
  stations: YURAKUCHO_STATIONS,
  trackSegments: YURAKUCHO_TRACK_SEGMENTS,
  trainTypes: YURAKUCHO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
