import type { LineDefinition } from '../../../types';
import { KEISEI_CHIHARA_STATIONS } from './stations';
import { KEISEI_CHIHARA_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_CHIHARA_TRAIN_TYPES } from './trainTypes';

export const keiseiChiharaLine: LineDefinition = {
  id: 'keisei_chihara',
  name: '京成千原線',
  shortName: '千原線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#005aaa',
  accentColor: '#003d75',
  defaultCars: 6,
  defaultBounds: [
    [35.5194, 140.1031],
    [35.6217, 140.1852],
  ],
  directionNames: {
    "inbound": "千葉中央・京成津田沼方面",
    "outbound": "ちはら台方面",
    "inboundFull": "上り 千葉中央・京成津田沼方面",
    "outboundFull": "下り ちはら台方面",
    "inboundShort": "上り（千葉中央方面）",
    "outboundShort": "下り（ちはら台方面）"
},
  stations: KEISEI_CHIHARA_STATIONS,
  trackSegments: KEISEI_CHIHARA_TRACK_SEGMENTS,
  trainTypes: KEISEI_CHIHARA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
