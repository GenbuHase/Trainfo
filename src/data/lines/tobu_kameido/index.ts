import type { LineDefinition } from '../../../types';
import { TOBU_KAMEIDO_STATIONS } from './stations';
import { TOBU_KAMEIDO_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuKameidoLine: LineDefinition = {
  id: 'tobu_kameido',
  name: '東武亀戸線',
  shortName: '亀戸線',
  operator: '東武鉄道',
  lineColor: '#226bb8',
  accentColor: '#004098',
  defaultCars: 2,
  defaultBounds: [[35.69,139.81],[35.72,139.83]],
  directionNames: {
      "inbound": "曳舟方面",
      "outbound": "亀戸方面",
      "inboundFull": "上り 曳舟方面",
      "outboundFull": "下り 亀戸方面",
      "inboundShort": "曳舟方面",
      "outboundShort": "亀戸方面"
  },
  stations: TOBU_KAMEIDO_STATIONS,
  trackSegments: TOBU_KAMEIDO_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
