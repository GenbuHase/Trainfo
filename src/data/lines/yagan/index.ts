import type { LineDefinition } from '../../../types';
import { YAGAN_STATIONS } from './stations';
import { YAGAN_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const yaganLine: LineDefinition = {
  id: 'yagan',
  name: '野岩鉄道会津鬼怒川線',
  shortName: '会津鬼怒川線',
  operator: '野岩鉄道',
  lineColor: '#1b813e',
  accentColor: '#f39700',
  defaultCars: 2,
  defaultBounds: [[36.84,139.71],[37.07,139.68]],
  directionNames: {
      "inbound": "新藤原・浅草方面",
      "outbound": "会津田島・会津若松方面",
      "inboundFull": "上り 新藤原・浅草方面",
      "outboundFull": "下り 会津田島・会津若松方面",
      "inboundShort": "新藤原方面",
      "outboundShort": "会津田島方面"
  },
  stations: YAGAN_STATIONS,
  trackSegments: YAGAN_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
