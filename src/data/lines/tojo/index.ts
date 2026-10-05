import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { STATIONS } from './stations';
import { STATION_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const tojoLine: LineDefinition = {
  id: 'tojo',
  name: '東武東上線',
  shortName: '東上線',
  operator: '東武鉄道',
  lineColor: '#004b97', // 東武グループブルー（フューチャーブルー）
  accentColor: '#ed6d00', // 東武ブライトオレンジ
  defaultCars: 10,
  defaultBounds: [
    [35.720, 139.180],
    [36.130, 139.725],
  ],
  directionNames: {
    inbound: '池袋方面',
    outbound: '森林公園・小川町・寄居方面',
    inboundFull: '上り 池袋方面',
    outboundFull: '下り 森林公園・小川町・寄居方面',
    inboundShort: '上り (池袋方面)',
    outboundShort: '下り (寄居方面)',
  },
  stations: STATIONS,
  trackSegments: STATION_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
