import type { LineDefinition } from '../../../types';
import { TOKYU_SHIN_YOKOHAMA_STATIONS } from './stations';
import { TOKYU_SHIN_YOKOHAMA_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_SHIN_YOKOHAMA_TRAIN_TYPES } from './trainTypes';

export const tokyuShinYokohamaLine: LineDefinition = {
  id: 'tokyu_shin_yokohama',
  name: '東急新横浜線',
  shortName: '東急新横浜線',
  operator: '東急電鉄',
  lineColor: '#8a1186', // 東急新横浜線パープル
  accentColor: '#ea5504',
  defaultCars: 8,
  defaultBounds: [
    [35.500, 139.610], // 新横浜周辺
    [35.560, 139.660], // 日吉周辺
  ],
  directionNames: {
    inbound: '日吉方面',
    outbound: '新横浜方面',
    inboundFull: '上り 日吉・渋谷・目黒方面',
    outboundFull: '下り 新横浜・相鉄線方面',
    inboundShort: '日吉方面',
    outboundShort: '新横浜方面',
  },
  stations: TOKYU_SHIN_YOKOHAMA_STATIONS,
  trackSegments: TOKYU_SHIN_YOKOHAMA_TRACK_SEGMENTS,
  trainTypes: TOKYU_SHIN_YOKOHAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
