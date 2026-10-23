import type { LineDefinition } from '../../../types';
import { TOZAI_STATIONS } from './stations';
import { TOZAI_TRACK_SEGMENTS } from './trackGeometry';
import { TOZAI_TRAIN_TYPES } from './trainTypes';

export const tozaiLine: LineDefinition = {
  id: 'tozai',
  name: '東京メトロ東西線',
  shortName: '東西線',
  operator: '東京メトロ',
  lineColor: '#00a7db',
  accentColor: '#e60012',
  defaultCars: 10,
  defaultBounds: [
    [35.670, 139.650],
    [35.720, 139.990],
  ],
  directionNames: {
    inbound: '中野・三鷹方面',
    outbound: '西船橋・東葉勝田台方面',
    inboundFull: '上り 大手町・飯田橋・中野・JR中央線方面',
    outboundFull: '下り 東陽町・浦安・西船橋・東葉高速線方面',
    inboundShort: '中野方面',
    outboundShort: '西船橋方面',
  },
  stations: TOZAI_STATIONS,
  trackSegments: TOZAI_TRACK_SEGMENTS,
  trainTypes: TOZAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
