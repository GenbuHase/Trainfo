import type { LineDefinition } from '../../../types';
import { UENO_TOKYO_STATIONS } from './stations';
import { UENO_TOKYO_TRAIN_TYPES } from './trainTypes';
import { UENO_TOKYO_TRACK_SEGMENTS } from './trackGeometry';

export const uenoTokyoLine: LineDefinition = {
  id: 'ueno_tokyo',
  name: 'JR上野東京ライン',
  shortName: '上野東京ライン',
  operator: 'JR東日本',
  lineColor: '#8b5a2b',
  accentColor: '#8b5a2b',
  defaultCars: 15,
  defaultBounds: [
    [35.675, 139.760],
    [35.720, 139.785],
  ],
  directionNames: {
    inbound: '東京方面',
    outbound: '上野方面',
    inboundFull: '上り 東京・品川・東海道線方面',
    outboundFull: '下り 上野・大宮・宇都宮・高崎・常磐線方面',
    inboundShort: '東京方面',
    outboundShort: '上野方面',
  },
  stations: UENO_TOKYO_STATIONS,
  trackSegments: UENO_TOKYO_TRACK_SEGMENTS,
  trainTypes: UENO_TOKYO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
