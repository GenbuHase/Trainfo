import type { LineDefinition } from '../../../types';
import { KANTO_RYUGASAKI_STATIONS } from './stations';
import { KANTO_RYUGASAKI_TRACK_SEGMENTS } from './trackGeometry';
import { KANTO_RYUGASAKI_TRAIN_TYPES } from './trainTypes';

export const kantoRyugasakiLine: LineDefinition = {
  id: 'kanto_ryugasaki',
  name: '関東鉄道竜ヶ崎線',
  shortName: '竜ヶ崎線',
  operator: '関東鉄道',
  area: 'kanto',
  lineColor: '#0068b7',
  accentColor: '#004b85',
  defaultCars: 1,
  defaultBounds: [
    [35.8934, 140.1233],
    [35.9447, 140.1943],
  ],
  directionNames: {
    "inbound": "佐貫方面",
    "outbound": "竜ヶ崎方面",
    "inboundFull": "上り 佐貫方面",
    "outboundFull": "下り 竜ヶ崎方面",
    "inboundShort": "上り（佐貫方面）",
    "outboundShort": "下り（竜ヶ崎方面）"
},
  stations: KANTO_RYUGASAKI_STATIONS,
  trackSegments: KANTO_RYUGASAKI_TRACK_SEGMENTS,
  trainTypes: KANTO_RYUGASAKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
