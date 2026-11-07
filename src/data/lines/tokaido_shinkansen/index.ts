import type { LineDefinition } from '../../../types';
import { TOKAIDO_SHINKANSEN_STATIONS } from './stations';
import { TOKAIDO_SHINKANSEN_TRAIN_TYPES } from './trainTypes';
import { TOKAIDO_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';

export const tokaidoShinkansenLine: LineDefinition = {
  id: 'tokaido_shinkansen',
  name: 'JR東海道新幹線',
  shortName: '東海道新幹線',
  operator: 'JR東海',
  lineColor: '#002060',
  accentColor: '#07407b',
  defaultCars: 16,
  defaultBounds: [[34.6738,135.4723],[35.711,139.7974]],
  directionNames: {
      "inbound": "名古屋・東京方面",
      "outbound": "名古屋・新大阪方面",
      "inboundFull": "上り 名古屋・新横浜・東京方面",
      "outboundFull": "下り 名古屋・京都・新大阪方面",
      "inboundShort": "東京方面",
      "outboundShort": "新大阪方面"
  },
  stations: TOKAIDO_SHINKANSEN_STATIONS,
  trackSegments: TOKAIDO_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: TOKAIDO_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
