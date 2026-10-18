import type { LineDefinition } from '../../../types';
import { TOBU_KOIZUMI_STATIONS } from './stations';
import { TOBU_KOIZUMI_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuKoizumiLine: LineDefinition = {
  id: 'tobu_koizumi',
  name: '東武小泉線',
  shortName: '小泉線',
  operator: '東武鉄道',
  lineColor: '#e40012',
  accentColor: '#004098',
  defaultCars: 2,
  defaultBounds: [[36.23,139.4],[36.31,139.55]],
  directionNames: {
      "inbound": "館林方面",
      "outbound": "西小泉・太田方面",
      "inboundFull": "上り 館林方面",
      "outboundFull": "下り 西小泉・太田方面",
      "inboundShort": "館林方面",
      "outboundShort": "西小泉方面"
  },
  stations: TOBU_KOIZUMI_STATIONS,
  trackSegments: TOBU_KOIZUMI_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
