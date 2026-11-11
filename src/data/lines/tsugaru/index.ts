import type { LineDefinition } from '../../../types';
import { TSUGARU_STATIONS } from './stations';
import { TSUGARU_TRACK_SEGMENTS } from './trackGeometry';
import { TSUGARU_TRAIN_TYPES } from './trainTypes';

export const tsugaruLine: LineDefinition = {
  id: 'tsugaru',
  name: 'JR津軽線',
  shortName: '津軽線',
  operator: 'JR東日本',
  lineColor: '#15a2c4',
  accentColor: '#0e7490',
  defaultCars: 2,
  defaultBounds: [[40.8099,140.4245],[41.2054,140.7542]],
  directionNames: {
    "inbound": "蟹田・青森方面",
    "outbound": "蟹田・今別・三厩方面",
    "inboundFull": "上り 蟹田・青森方面",
    "outboundFull": "下り 蟹田・三厩方面",
    "inboundShort": "上り (青森方面)",
    "outboundShort": "下り (三厩方面)"
},
  stations: TSUGARU_STATIONS,
  trackSegments: TSUGARU_TRACK_SEGMENTS,
  trainTypes: TSUGARU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
