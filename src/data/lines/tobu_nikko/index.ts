import type { LineDefinition } from '../../../types';
import { TOBU_NIKKO_STATIONS } from './stations';
import { TOBU_NIKKO_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuNikkoLine: LineDefinition = {
  id: 'tobu_nikko',
  name: '東武日光線',
  shortName: '日光線',
  operator: '東武鉄道',
  lineColor: '#f6a202',
  accentColor: '#004098',
  defaultCars: 6,
  defaultBounds: [[36.01,139.7],[36.75,139.61]],
  directionNames: {
      "inbound": "南栗橋・浅草方面",
      "outbound": "栃木・東武日光方面",
      "inboundFull": "上り 南栗橋・浅草方面",
      "outboundFull": "下り 栃木・東武日光方面",
      "inboundShort": "南栗橋方面",
      "outboundShort": "東武日光方面"
  },
  stations: TOBU_NIKKO_STATIONS,
  trackSegments: TOBU_NIKKO_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
