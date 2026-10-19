import type { LineDefinition } from '../../../types';
import { TOBU_SANO_STATIONS } from './stations';
import { TOBU_SANO_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuSanoLine: LineDefinition = {
  id: 'tobu_sano',
  name: '東武佐野線',
  shortName: '佐野線',
  operator: '東武鉄道',
  lineColor: '#e40012',
  accentColor: '#004098',
  defaultCars: 3,
  defaultBounds: [[36.23,139.53],[36.4,139.62]],
  directionNames: {
      "inbound": "館林方面",
      "outbound": "佐野・葛生方面",
      "inboundFull": "上り 館林方面",
      "outboundFull": "下り 佐野・葛生方面",
      "inboundShort": "館林方面",
      "outboundShort": "葛生方面"
  },
  stations: TOBU_SANO_STATIONS,
  trackSegments: TOBU_SANO_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
