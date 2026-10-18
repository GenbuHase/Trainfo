import type { LineDefinition } from '../../../types';
import { TOBU_UTSUNOMIYA_STATIONS } from './stations';
import { TOBU_UTSUNOMIYA_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuUtsunomiyaLine: LineDefinition = {
  id: 'tobu_utsunomiya',
  name: '東武宇都宮線',
  shortName: '宇都宮線',
  operator: '東武鉄道',
  lineColor: '#f6a202',
  accentColor: '#004098',
  defaultCars: 4,
  defaultBounds: [[36.4,139.75],[36.56,139.88]],
  directionNames: {
      "inbound": "新栃木・栃木方面",
      "outbound": "東武宇都宮方面",
      "inboundFull": "上り 新栃木・栃木方面",
      "outboundFull": "下り 東武宇都宮方面",
      "inboundShort": "新栃木方面",
      "outboundShort": "宇都宮方面"
  },
  stations: TOBU_UTSUNOMIYA_STATIONS,
  trackSegments: TOBU_UTSUNOMIYA_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
