import type { LineDefinition } from '../../../types';
import { AIZU_STATIONS } from './stations';
import { AIZU_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const aizuLine: LineDefinition = {
  id: 'aizu',
  name: '会津鉄道会津線',
  shortName: '会津線',
  operator: '会津鉄道',
  lineColor: '#d9333f',
  accentColor: '#f39700',
  defaultCars: 2,
  defaultBounds: [[37.07,139.7],[37.52,139.92]],
  directionNames: {
      "inbound": "会津高原尾瀬口・浅草方面",
      "outbound": "会津若松方面",
      "inboundFull": "上り 会津高原尾瀬口・浅草方面",
      "outboundFull": "下り 会津若松方面",
      "inboundShort": "尾瀬口方面",
      "outboundShort": "会津若松方面"
  },
  stations: AIZU_STATIONS,
  trackSegments: AIZU_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
