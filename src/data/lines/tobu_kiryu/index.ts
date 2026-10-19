import type { LineDefinition } from '../../../types';
import { TOBU_KIRYU_STATIONS } from './stations';
import { TOBU_KIRYU_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuKiryuLine: LineDefinition = {
  id: 'tobu_kiryu',
  name: '東武桐生線',
  shortName: '桐生線',
  operator: '東武鉄道',
  lineColor: '#e40012',
  accentColor: '#004098',
  defaultCars: 3,
  defaultBounds: [[36.29,139.26],[36.43,139.38]],
  directionNames: {
      "inbound": "太田方面",
      "outbound": "新桐生・赤城方面",
      "inboundFull": "上り 太田方面",
      "outboundFull": "下り 新桐生・赤城方面",
      "inboundShort": "太田方面",
      "outboundShort": "赤城方面"
  },
  stations: TOBU_KIRYU_STATIONS,
  trackSegments: TOBU_KIRYU_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
