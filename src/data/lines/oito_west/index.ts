import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { OITO_WEST_STATIONS } from './stations';
import { OITO_WEST_TRACK_SEGMENTS } from './trackGeometry';
import { OITO_WEST_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const oitoWestLine: LineDefinition = {
  id: 'oito_west',
  name: 'JR西日本 大糸線',
  shortName: '大糸線(南小谷〜糸魚川)',
  operator: 'JR西日本',
  lineColor: '#0067b8', // JR西日本ブルー
  accentColor: '#005294',
  defaultBounds: [
    [36.750, 137.830], // 南小谷周辺
    [37.060, 137.940], // 糸魚川周辺
  ],
  directionNames: {
    inbound: '平岩・南小谷方面',
    outbound: '糸魚川方面',
    inboundFull: '上り 平岩・南小谷方面',
    outboundFull: '下り 糸魚川方面',
    inboundShort: '南小谷方面',
    outboundShort: '糸魚川方面',
  },
  stations: OITO_WEST_STATIONS,
  trackSegments: OITO_WEST_TRACK_SEGMENTS,
  trainTypes: OITO_WEST_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
