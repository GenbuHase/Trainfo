import type { LineDefinition } from '../../../types';
import { KEISEI_MATSUDO_STATIONS } from './stations';
import { KEISEI_MATSUDO_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_MATSUDO_TRAIN_TYPES } from './trainTypes';

export const keiseiMatsudoLine: LineDefinition = {
  id: 'keisei_matsudo',
  name: '京成松戸線',
  shortName: '松戸線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#ef59a1',
  accentColor: '#c2185b',
  defaultCars: 6,
  defaultBounds: [
    [35.6688, 139.8863],
    [35.8183, 140.0576],
  ],
  directionNames: {
    "inbound": "新鎌ヶ谷・松戸方面",
    "outbound": "新津田沼・京成津田沼方面",
    "inboundFull": "上り 新鎌ヶ谷・松戸方面",
    "outboundFull": "下り 新津田沼・京成津田沼方面",
    "inboundShort": "新鎌ヶ谷",
    "outboundShort": "新津田沼"
},
  stations: KEISEI_MATSUDO_STATIONS,
  trackSegments: KEISEI_MATSUDO_TRACK_SEGMENTS,
  trainTypes: KEISEI_MATSUDO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
