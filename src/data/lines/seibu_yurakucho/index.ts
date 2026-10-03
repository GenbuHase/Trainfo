import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SEIBU_YURAKUCHO_STATIONS } from './stations';
import { SEIBU_YURAKUCHO_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_YURAKUCHO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const seibuYurakuchoLine: LineDefinition = {
  id: 'seibu_yurakucho',
  name: '西武有楽町線',
  shortName: '西武有楽町線',
  operator: '西武鉄道',
  lineColor: '#f39800', // 西武オレンジ
  accentColor: '#003a8c', // 西武ブルー
  defaultBounds: [
    [35.730, 139.645],
    [35.755, 139.690],
  ],
  directionNames: {
    inbound: '小竹向原方面',
    outbound: '練馬方面',
    inboundFull: '上り 小竹向原・新木場・元町・中華街方面',
    outboundFull: '下り 練馬・所沢・飯能方面',
    inboundShort: '小竹向原方面',
    outboundShort: '練馬方面',
  },
  stations: SEIBU_YURAKUCHO_STATIONS,
  trackSegments: SEIBU_YURAKUCHO_TRACK_SEGMENTS,
  trainTypes: SEIBU_YURAKUCHO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
