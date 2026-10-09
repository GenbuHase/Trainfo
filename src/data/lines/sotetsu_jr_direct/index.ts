import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SOTETSU_JR_DIRECT_STATIONS } from './stations';
import { SOTETSU_JR_DIRECT_TRACK_SEGMENTS } from './trackGeometry';
import { SOTETSU_JR_DIRECT_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const sotetsuJrDirectLine: LineDefinition = {
  id: 'sotetsu_jr_direct',
  name: '相鉄・JR直通線',
  shortName: '相鉄・JR直通線',
  operator: 'JR東日本',
  lineColor: '#00ac9a',
  accentColor: '#002b66',
  defaultCars: 10,
  defaultBounds: [
    [35.450, 139.550], // 羽沢横浜国大周辺
    [35.710, 139.730], // 新宿周辺
  ],
  directionNames: {
    inbound: '羽沢横浜国大方面',
    outbound: '新宿方面',
    inboundFull: '下り 羽沢横浜国大・海老名方面',
    outboundFull: '上り 新宿方面',
    inboundShort: '羽沢方面',
    outboundShort: '新宿方面',
  },
  stations: SOTETSU_JR_DIRECT_STATIONS,
  trackSegments: SOTETSU_JR_DIRECT_TRACK_SEGMENTS,
  trainTypes: SOTETSU_JR_DIRECT_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
