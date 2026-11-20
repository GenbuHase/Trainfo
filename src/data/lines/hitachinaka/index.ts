import type { LineDefinition } from '../../../types';
import { HITACHINAKA_STATIONS } from './stations';
import { HITACHINAKA_TRACK_SEGMENTS } from './trackGeometry';
import { HITACHINAKA_TRAIN_TYPES } from './trainTypes';

export const hitachinakaLine: LineDefinition = {
  id: 'hitachinaka',
  name: 'ひたちなか海浜鉄道湊線',
  shortName: '湊線',
  operator: 'ひたちなか海浜鉄道',
  area: 'kanto',
  lineColor: '#ff8f00',
  accentColor: '#c66900',
  defaultCars: 1,
  defaultBounds: [
    [36.3300, 140.5093],
    [36.4079, 140.6329],
  ],
  directionNames: {
    "inbound": "勝田方面",
    "outbound": "那珂湊・阿字ヶ浦方面",
    "inboundFull": "上り 勝田方面",
    "outboundFull": "下り 那珂湊・阿字ヶ浦方面",
    "inboundShort": "勝田方面",
    "outboundShort": "那珂湊"
},
  stations: HITACHINAKA_STATIONS,
  trackSegments: HITACHINAKA_TRACK_SEGMENTS,
  trainTypes: HITACHINAKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
