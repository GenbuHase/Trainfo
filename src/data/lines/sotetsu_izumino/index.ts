import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SOTETSU_IZUMINO_STATIONS } from './stations';
import { SOTETSU_IZUMINO_TRACK_SEGMENTS } from './trackGeometry';
import { SOTETSU_IZUMINO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const sotetsuIzuminoLine: LineDefinition = {
  id: 'sotetsu_izumino',
  name: '相鉄いずみ野線',
  shortName: 'いずみ野線',
  operator: '相模鉄道',
  lineColor: '#002b66', // YOKOHAMA NAVYBLUE
  accentColor: '#008cd6',
  defaultCars: 10,
  defaultBounds: [
    [35.390, 139.460], // 湘南台周辺
    [35.480, 139.540], // 二俣川周辺
  ],
  directionNames: {
    inbound: '二俣川方面',
    outbound: '湘南台方面',
    inboundFull: '上り 二俣川・横浜・新横浜方面',
    outboundFull: '下り いずみ野・湘南台方面',
    inboundShort: '二俣川方面',
    outboundShort: '湘南台方面',
  },
  stations: SOTETSU_IZUMINO_STATIONS,
  trackSegments: SOTETSU_IZUMINO_TRACK_SEGMENTS,
  trainTypes: SOTETSU_IZUMINO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
