import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { TX_STATIONS } from './stations';
import { TX_TRACK_SEGMENTS } from './trackGeometry';
import { TX_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const tsukubaExpressLine: LineDefinition = {
  id: 'tsukuba_express',
  name: '首都圏新都市鉄道つくばエクスプレス',
  shortName: 'つくばエクスプレス',
  operator: '首都圏新都市鉄道',
  lineColor: '#003893', // TXディープブルー
  accentColor: '#df0011', // TXスカーレットレッド
  defaultCars: 6,
  defaultBounds: [
    [35.685, 139.765],
    [36.095, 140.120],
  ],
  directionNames: {
    inbound: '秋葉原方面',
    outbound: 'つくば方面',
    inboundFull: '上り 秋葉原方面',
    outboundFull: '下り つくば方面',
    inboundShort: '秋葉原方面',
    outboundShort: 'つくば方面',
  },
  stations: TX_STATIONS,
  trackSegments: TX_TRACK_SEGMENTS,
  trainTypes: TX_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
