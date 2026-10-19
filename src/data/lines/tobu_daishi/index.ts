import type { LineDefinition } from '../../../types';
import { TOBU_DAISHI_STATIONS } from './stations';
import { TOBU_DAISHI_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuDaishiLine: LineDefinition = {
  id: 'tobu_daishi',
  name: '東武大師線',
  shortName: '大師線',
  operator: '東武鉄道',
  lineColor: '#226bb8',
  accentColor: '#004098',
  defaultCars: 2,
  defaultBounds: [[35.77,139.78],[35.79,139.8]],
  directionNames: {
      "inbound": "西新井方面",
      "outbound": "大師前方面",
      "inboundFull": "上り 西新井方面",
      "outboundFull": "下り 大師前方面",
      "inboundShort": "西新井方面",
      "outboundShort": "大師前方面"
  },
  stations: TOBU_DAISHI_STATIONS,
  trackSegments: TOBU_DAISHI_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
