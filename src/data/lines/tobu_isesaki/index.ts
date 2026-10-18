import type { LineDefinition } from '../../../types';
import { TOBU_ISESAKI_STATIONS } from './stations';
import { TOBU_ISESAKI_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuIsesakiLine: LineDefinition = {
  id: 'tobu_isesaki',
  name: '東武伊勢崎線',
  shortName: '伊勢崎線',
  operator: '東武鉄道',
  lineColor: '#e40012',
  accentColor: '#004098',
  defaultCars: 6,
  defaultBounds: [[36.01,139.71],[36.32,139.19]],
  directionNames: {
      "inbound": "久喜・浅草方面",
      "outbound": "館林・伊勢崎方面",
      "inboundFull": "上り 久喜・浅草方面",
      "outboundFull": "下り 館林・伊勢崎方面",
      "inboundShort": "久喜方面",
      "outboundShort": "伊勢崎方面"
  },
  stations: TOBU_ISESAKI_STATIONS,
  trackSegments: TOBU_ISESAKI_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
