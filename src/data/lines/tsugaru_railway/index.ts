import type { LineDefinition } from '../../../types';
import { TSUGARU_RAILWAY_STATIONS } from './stations';
import { TSUGARU_RAILWAY_TRACK_SEGMENTS } from './trackGeometry';
import { TSUGARU_RAILWAY_TRAIN_TYPES } from './trainTypes';

export const tsugaruRailwayLine: LineDefinition = {
  id: 'tsugaru_railway',
  name: '津軽鉄道線',
  shortName: '津軽鉄道線',
  operator: '津軽鉄道',
  area: 'tohoku',
  lineColor: '#ea5504',
  accentColor: '#b45309',
  defaultCars: 1,
  defaultBounds: [[40.7899,140.4173],[40.9846,140.4994]],
  directionNames: {
    "inbound": "金木・津軽五所川原方面",
    "outbound": "金木・津軽中里方面",
    "inboundFull": "上り 津軽五所川原方面",
    "outboundFull": "下り 津軽中里方面",
    "inboundShort": "上り（津軽五所川原方面）",
    "outboundShort": "下り（津軽中里方面）"
},
  stations: TSUGARU_RAILWAY_STATIONS,
  trackSegments: TSUGARU_RAILWAY_TRACK_SEGMENTS,
  trainTypes: TSUGARU_RAILWAY_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
