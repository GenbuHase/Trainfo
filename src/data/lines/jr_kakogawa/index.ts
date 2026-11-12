import type { LineDefinition } from '../../../types';
import { JR_KAKOGAWA_STATIONS } from './stations';
import { JR_KAKOGAWA_TRAIN_TYPES } from './trainTypes';
import { JR_KAKOGAWA_TRACK_SEGMENTS } from './trackGeometry';

export const jrKakogawaLine: LineDefinition = {
  id: 'jr_kakogawa',
  name: 'JR加古川線',
  shortName: '加古川線',
  operator: 'JR西日本',
  lineColor: '#008e74',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[34.7176,134.7899],[35.1332,135.0991]],
  directionNames: {
  "inbound": "厄神・加古川方面",
  "outbound": "西脇市・谷川方面",
  "inboundFull": "上り 厄神・加古川方面",
  "outboundFull": "下り 西脇市・谷川方面",
  "inboundShort": "加古川方面",
  "outboundShort": "谷川方面"
},
  stations: JR_KAKOGAWA_STATIONS,
  trackSegments: JR_KAKOGAWA_TRACK_SEGMENTS,
  trainTypes: JR_KAKOGAWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
