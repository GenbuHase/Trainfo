import type { LineDefinition } from '../../../types';
import { KEISEI_CHIBA_STATIONS } from './stations';
import { KEISEI_CHIBA_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_CHIBA_TRAIN_TYPES } from './trainTypes';

export const keiseiChibaLine: LineDefinition = {
  id: 'keisei_chiba',
  name: '京成千葉線',
  shortName: '千葉線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#005aaa',
  accentColor: '#ef59a1',
  defaultCars: 6,
  defaultBounds: [
    [35.5917, 140.0091],
    [35.6988, 140.1331],
  ],
  directionNames: {
    "inbound": "京成津田沼・松戸・上野方面",
    "outbound": "京成千葉・千葉中央方面",
    "inboundFull": "上り 京成津田沼・松戸・上野方面",
    "outboundFull": "下り 京成千葉・千葉中央方面",
    "inboundShort": "上り（京成津田沼方面）",
    "outboundShort": "下り（千葉中央方面）"
},
  stations: KEISEI_CHIBA_STATIONS,
  trackSegments: KEISEI_CHIBA_TRACK_SEGMENTS,
  trainTypes: KEISEI_CHIBA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
