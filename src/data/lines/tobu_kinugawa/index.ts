import type { LineDefinition } from '../../../types';
import { TOBU_KINUGAWA_STATIONS } from './stations';
import { TOBU_KINUGAWA_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuKinugawaLine: LineDefinition = {
  id: 'tobu_kinugawa',
  name: '東武鬼怒川線',
  shortName: '鬼怒川線',
  operator: '東武鉄道',
  lineColor: '#f6a202',
  accentColor: '#004098',
  defaultCars: 3,
  defaultBounds: [[36.72,139.68],[36.85,139.72]],
  directionNames: {
      "inbound": "下今市・浅草方面",
      "outbound": "鬼怒川温泉・新藤原方面",
      "inboundFull": "上り 下今市・浅草方面",
      "outboundFull": "下り 鬼怒川温泉・新藤原方面",
      "inboundShort": "下今市方面",
      "outboundShort": "新藤原方面"
  },
  stations: TOBU_KINUGAWA_STATIONS,
  trackSegments: TOBU_KINUGAWA_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
