import type { LineDefinition } from '../../../types';
import { KEISEI_OSHIAGE_STATIONS } from './stations';
import { KEISEI_OSHIAGE_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_OSHIAGE_TRAIN_TYPES } from './trainTypes';

export const keiseiOshiageLine: LineDefinition = {
  id: 'keisei_oshiage',
  name: '京成押上線',
  shortName: '押上線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#005aaa',
  accentColor: '#e85298',
  defaultCars: 8,
  defaultBounds: [
    [35.6957, 139.7982],
    [35.7614, 139.8717],
  ],
  directionNames: {
    "inbound": "押上・都営浅草線方面",
    "outbound": "青砥・京成高砂方面",
    "inboundFull": "上り 押上・都営浅草線方面",
    "outboundFull": "下り 青砥・京成高砂方面",
    "inboundShort": "上り（押上方面）",
    "outboundShort": "下り（青砥・高砂方面）"
},
  stations: KEISEI_OSHIAGE_STATIONS,
  trackSegments: KEISEI_OSHIAGE_TRACK_SEGMENTS,
  trainTypes: KEISEI_OSHIAGE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
