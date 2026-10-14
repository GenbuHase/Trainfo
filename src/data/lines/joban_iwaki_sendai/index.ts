import type { LineDefinition } from '../../../types';
import { JOBAN_IWAKI_SENDAI_STATIONS } from './stations';
import { JOBAN_IWAKI_SENDAI_TRAIN_TYPES } from './trainTypes';
import { JOBAN_IWAKI_SENDAI_TRACK_SEGMENTS } from './trackGeometry';

export const jobanIwakiSendaiLine: LineDefinition = {
  id: 'joban_iwaki_sendai',
  name: 'JR常磐線（いわき～仙台）',
  shortName: '常磐線（いわき～仙台）',
  operator: 'JR東日本',
  lineColor: '#005aaa',
  accentColor: '#005aaa',
  defaultCars: 4,
  defaultBounds: [
    [37.050, 140.880], // いわき周辺
    [38.270, 140.890], // 仙台周辺
  ],
  directionNames: {
    inbound: '原ノ町・いわき方面',
    outbound: '岩沼・名取・仙台方面',
    inboundFull: '上り 原ノ町・いわき・水戸・品川方面',
    outboundFull: '下り 岩沼・名取・仙台方面',
    inboundShort: 'いわき方面',
    outboundShort: '仙台方面',
  },
  stations: JOBAN_IWAKI_SENDAI_STATIONS,
  trackSegments: JOBAN_IWAKI_SENDAI_TRACK_SEGMENTS,
  trainTypes: JOBAN_IWAKI_SENDAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
