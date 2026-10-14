import type { LineDefinition } from '../../../types';
import { JOBAN_RAPID_STATIONS } from './stations';
import { JOBAN_RAPID_TRAIN_TYPES } from './trainTypes';
import { JOBAN_RAPID_TRACK_SEGMENTS } from './trackGeometry';

export const jobanRapidLine: LineDefinition = {
  id: 'joban_rapid',
  name: 'JR常磐線快速',
  shortName: '常磐線快速',
  operator: 'JR東日本',
  lineColor: '#00c18a', // 常磐線（快速）JJカラー
  accentColor: '#00c18a',
  defaultCars: 15,
  defaultBounds: [
    [35.620, 139.730], // 品川周辺
    [35.910, 140.080], // 取手周辺
  ],
  directionNames: {
    inbound: '上野・東京・品川方面',
    outbound: '柏・取手方面',
    inboundFull: '上り 上野・東京・品川方面',
    outboundFull: '下り 松戸・柏・取手方面',
    inboundShort: '品川方面',
    outboundShort: '取手方面',
  },
  stations: JOBAN_RAPID_STATIONS,
  trackSegments: JOBAN_RAPID_TRACK_SEGMENTS,
  trainTypes: JOBAN_RAPID_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
