import type { LineDefinition } from '../../../types';
import { KEISEI_MAIN_STATIONS } from './stations';
import { KEISEI_MAIN_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_MAIN_TRAIN_TYPES } from './trainTypes';

export const keiseiMainLine: LineDefinition = {
  id: 'keisei_main',
  name: '京成本線',
  shortName: '京成本線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#005aaa',
  accentColor: '#e60012',
  defaultCars: 8,
  defaultBounds: [
    [35.6688, 139.7561],
    [35.7908, 140.4021],
  ],
  directionNames: {
    "inbound": "青砥・日暮里・京成上野方面",
    "outbound": "京成津田沼・京成成田・成田空港方面",
    "inboundFull": "上り 青砥・日暮里・京成上野方面",
    "outboundFull": "下り 京成津田沼・京成成田・成田空港方面",
    "inboundShort": "上り（京成上野方面）",
    "outboundShort": "下り（成田空港方面）"
},
  stations: KEISEI_MAIN_STATIONS,
  trackSegments: KEISEI_MAIN_TRACK_SEGMENTS,
  trainTypes: KEISEI_MAIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
