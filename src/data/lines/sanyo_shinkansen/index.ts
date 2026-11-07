import type { LineDefinition } from '../../../types';
import { SANYO_SHINKANSEN_STATIONS } from './stations';
import { SANYO_SHINKANSEN_TRAIN_TYPES } from './trainTypes';
import { SANYO_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';

export const sanyoShinkansenLine: LineDefinition = {
  id: 'sanyo_shinkansen',
  name: 'JR山陽新幹線',
  shortName: '山陽新幹線',
  operator: 'JR西日本',
  lineColor: '#002060',
  accentColor: '#1f3a93',
  defaultCars: 16,
  defaultBounds: [[33.5578,130.3911],[34.8563,135.5323]],
  directionNames: {
      "inbound": "新大阪・東京方面",
      "outbound": "広島・博多方面",
      "inboundFull": "上り 岡山・新大阪・東京方面",
      "outboundFull": "下り 岡山・広島・小倉・博多方面",
      "inboundShort": "新大阪方面",
      "outboundShort": "博多方面"
  },
  stations: SANYO_SHINKANSEN_STATIONS,
  trackSegments: SANYO_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: SANYO_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
