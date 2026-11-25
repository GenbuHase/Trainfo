import type { LineDefinition } from '../../../types';
import { KANTO_JOSO_STATIONS } from './stations';
import { KANTO_JOSO_TRACK_SEGMENTS } from './trackGeometry';
import { KANTO_JOSO_TRAIN_TYPES } from './trainTypes';

export const kantoJosoLine: LineDefinition = {
  id: 'kanto_joso',
  name: '関東鉄道常総線',
  shortName: '常総線',
  operator: '関東鉄道',
  area: 'kanto',
  lineColor: '#0068b7',
  accentColor: '#004b85',
  defaultCars: 2,
  defaultBounds: [
    [35.8826, 139.9445],
    [36.3190, 140.0790],
  ],
  directionNames: {
    "inbound": "守谷・取手方面",
    "outbound": "水海道・下館方面",
    "inboundFull": "上り 守谷・取手方面",
    "outboundFull": "下り 水海道・下館方面",
    "inboundShort": "上り（取手方面）",
    "outboundShort": "下り（下館方面）"
},
  stations: KANTO_JOSO_STATIONS,
  trackSegments: KANTO_JOSO_TRACK_SEGMENTS,
  trainTypes: KANTO_JOSO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
