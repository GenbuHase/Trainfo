import type { LineDefinition } from '../../../types';
import { TOBU_URBAN_PARK_STATIONS } from './stations';
import { TOBU_URBAN_PARK_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuUrbanParkLine: LineDefinition = {
  id: 'tobu_urban_park',
  name: '東武アーバンパークライン',
  shortName: 'アーバンパークライン',
  operator: '東武鉄道',
  lineColor: '#41b3e5',
  accentColor: '#009966',
  defaultCars: 6,
  defaultBounds: [[35.7,139.62],[35.98,140]],
  directionNames: {
      "inbound": "大宮方面",
      "outbound": "柏・船橋方面",
      "inboundFull": "大宮方面",
      "outboundFull": "柏・船橋方面",
      "inboundShort": "大宮方面",
      "outboundShort": "船橋方面"
  },
  stations: TOBU_URBAN_PARK_STATIONS,
  trackSegments: TOBU_URBAN_PARK_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
