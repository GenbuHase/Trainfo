import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { TOKYU_TOYOKO_STATIONS } from './stations';
import { TOKYU_TOYOKO_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_TOYOKO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const tokyuToyokoLine: LineDefinition = {
  id: 'tokyu_toyoko',
  name: '東急東横線',
  shortName: '東横線',
  operator: '東急電鉄',
  lineColor: '#da0442', // 東横線レッド
  accentColor: '#ea5504', // 特急オレンジ
  defaultCars: 8,
  defaultBounds: [
    [35.450, 139.600], // 横浜周辺
    [35.670, 139.720], // 渋谷周辺
  ],
  directionNames: {
    inbound: '渋谷方面',
    outbound: '横浜方面',
    inboundFull: '上り 渋谷・副都心線方面',
    outboundFull: '下り 横浜・みなとみらい線方面',
    inboundShort: '渋谷方面',
    outboundShort: '横浜方面',
  },
  stations: TOKYU_TOYOKO_STATIONS,
  trackSegments: TOKYU_TOYOKO_TRACK_SEGMENTS,
  trainTypes: TOKYU_TOYOKO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
