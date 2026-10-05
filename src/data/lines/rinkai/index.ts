import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { RINKAI_STATIONS } from './stations';
import { RINKAI_TRACK_SEGMENTS } from './trackGeometry';
import { RINKAI_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const rinkaiLine: LineDefinition = {
  id: 'rinkai',
  name: '東京臨海高速鉄道りんかい線',
  shortName: 'りんかい線',
  operator: '東京臨海高速鉄道',
  lineColor: '#00418e', // TWRブルー
  accentColor: '#00a3af', // ターコイズブルー
  defaultCars: 10,
  defaultBounds: [
    [35.600, 139.720], // 大井町・品川シーサイド周辺
    [35.655, 139.835], // 新木場周辺
  ],
  directionNames: {
    inbound: '新木場方面',
    outbound: '大崎・埼京線方面',
    inboundFull: '上り 新木場方面',
    outboundFull: '下り 大崎・埼京線方面',
    inboundShort: '新木場方面',
    outboundShort: '大崎方面',
  },
  stations: RINKAI_STATIONS,
  trackSegments: RINKAI_TRACK_SEGMENTS,
  trainTypes: RINKAI_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
