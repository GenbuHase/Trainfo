import type { LineDefinition } from '../../../types';
import { YAMAMAN_YUKARIGAOKA_STATIONS } from './stations';
import { YAMAMAN_YUKARIGAOKA_TRACK_SEGMENTS } from './trackGeometry';
import { YAMAMAN_YUKARIGAOKA_TRAIN_TYPES } from './trainTypes';

export const yamamanYukarigaokaLine: LineDefinition = {
  id: 'yamaman_yukarigaoka',
  name: '山万ユーカリが丘線',
  shortName: 'ユーカリが丘線',
  operator: '山万',
  area: 'kanto',
  lineColor: '#00a896',
  accentColor: '#007568',
  defaultCars: 3,
  defaultBounds: [
    [35.7074, 140.1334],
    [35.7548, 140.1720],
  ],
  directionNames: {
    "inbound": "ユーカリが丘方面",
    "outbound": "女子大・井野・ユーカリが丘循環",
    "inboundFull": "上り ユーカリが丘方面",
    "outboundFull": "下り 女子大・井野・ユーカリが丘循環",
    "inboundShort": "上り（ユーカリが丘方面）",
    "outboundShort": "下り（女子大・井野方面）"
},
  stations: YAMAMAN_YUKARIGAOKA_STATIONS,
  trackSegments: YAMAMAN_YUKARIGAOKA_TRACK_SEGMENTS,
  trainTypes: YAMAMAN_YUKARIGAOKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
