import type { LineDefinition } from '../../../types';
import { KEISEI_KANAMACHI_STATIONS } from './stations';
import { KEISEI_KANAMACHI_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_KANAMACHI_TRAIN_TYPES } from './trainTypes';

export const keiseiKanamachiLine: LineDefinition = {
  id: 'keisei_kanamachi',
  name: '京成金町線',
  shortName: '金町線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#005aaa',
  accentColor: '#003d75',
  defaultCars: 4,
  defaultBounds: [
    [35.7358, 139.8507],
    [35.7837, 139.8903],
  ],
  directionNames: {
    "inbound": "京成高砂方面",
    "outbound": "京成金町方面",
    "inboundFull": "上り 京成高砂方面",
    "outboundFull": "下り 京成金町方面",
    "inboundShort": "京成高砂方面",
    "outboundShort": "京成金町方面"
},
  stations: KEISEI_KANAMACHI_STATIONS,
  trackSegments: KEISEI_KANAMACHI_TRACK_SEGMENTS,
  trainTypes: KEISEI_KANAMACHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
