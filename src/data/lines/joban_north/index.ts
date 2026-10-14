import type { LineDefinition } from '../../../types';
import { JOBAN_NORTH_STATIONS } from './stations';
import { JOBAN_NORTH_TRAIN_TYPES } from './trainTypes';
import { JOBAN_NORTH_TRACK_SEGMENTS } from './trackGeometry';

export const jobanNorthLine: LineDefinition = {
  id: 'joban_north',
  name: 'JR常磐線（取手～いわき）',
  shortName: '常磐線（取手～いわき）',
  operator: 'JR東日本',
  lineColor: '#005aaa',
  accentColor: '#005aaa',
  defaultCars: 10,
  defaultBounds: [
    [35.890, 140.050], // 取手周辺
    [37.070, 140.910], // いわき周辺
  ],
  directionNames: {
    inbound: '土浦・上野・品川方面',
    outbound: '水戸・いわき方面',
    inboundFull: '上り 土浦・取手・上野・品川方面',
    outboundFull: '下り 水戸・高萩・いわき方面',
    inboundShort: '上野方面',
    outboundShort: 'いわき方面',
  },
  stations: JOBAN_NORTH_STATIONS,
  trackSegments: JOBAN_NORTH_TRACK_SEGMENTS,
  trainTypes: JOBAN_NORTH_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
