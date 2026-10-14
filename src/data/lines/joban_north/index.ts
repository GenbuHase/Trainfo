import type { LineDefinition } from '../../../types';
import { JOBAN_NORTH_STATIONS } from './stations';
import { JOBAN_NORTH_TRAIN_TYPES } from './trainTypes';
import { JOBAN_NORTH_TRACK_SEGMENTS } from './trackGeometry';

export const jobanNorthLine: LineDefinition = {
  id: 'joban_north',
  name: 'JR常磐線(取手以北)',
  shortName: '常磐線(取手以北)',
  operator: 'JR東日本',
  lineColor: '#005aaa',
  accentColor: '#005aaa',
  defaultCars: 10,
  defaultBounds: [
    [35.890, 140.050], // 取手周辺
    [36.410, 140.540], // 勝田周辺
  ],
  directionNames: {
    inbound: '土浦・上野・品川方面',
    outbound: '水戸・勝田方面',
    inboundFull: '上り 土浦・取手・上野・品川方面',
    outboundFull: '下り 土浦・水戸・勝田方面',
    inboundShort: '上野方面',
    outboundShort: '勝田方面',
  },
  stations: JOBAN_NORTH_STATIONS,
  trackSegments: JOBAN_NORTH_TRACK_SEGMENTS,
  trainTypes: JOBAN_NORTH_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
