import type { LineDefinition } from '../../../types';
import { NAGANO_DENTETSU_STATIONS } from './stations';
import { NAGANO_DENTETSU_TRACK_SEGMENTS } from './trackGeometry';
import { NAGANO_DENTETSU_TRAIN_TYPES } from './trainTypes';

export const naganoDentetsuLine: LineDefinition = {
  id: 'nagano_dentetsu',
  name: '長野電鉄長野線',
  shortName: '長野線',
  operator: '長野電鉄',
  area: 'koshinetsu',
  lineColor: '#d32f2f',
  accentColor: '#1976d2',
  defaultCars: 3,
  defaultBounds: [
    [36.6248, 138.1692],
    [36.7809, 138.4348],
  ],
  directionNames: {
    "inbound": "須坂・長野方面",
    "outbound": "須坂・湯田中方面",
    "inboundFull": "上り 信州中野・須坂・長野方面",
    "outboundFull": "下り 須坂・信州中野・湯田中方面",
    "inboundShort": "上り（長野方面）",
    "outboundShort": "下り（湯田中方面）"
},
  stations: NAGANO_DENTETSU_STATIONS,
  trackSegments: NAGANO_DENTETSU_TRACK_SEGMENTS,
  trainTypes: NAGANO_DENTETSU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
