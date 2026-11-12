import type { LineDefinition } from '../../../types';
import { JR_AKO_STATIONS } from './stations';
import { JR_AKO_TRAIN_TYPES } from './trainTypes';
import { JR_AKO_TRACK_SEGMENTS } from './trackGeometry';

export const jrAkoLine: LineDefinition = {
  id: 'jr_ako',
  name: 'JR赤穂線',
  shortName: '赤穂線',
  operator: 'JR西日本',
  lineColor: '#e6b422',
  accentColor: '#ffffff',
  defaultCars: 4,
  defaultBounds: [[34.6114,133.9372],[34.868,134.5235]],
  directionNames: {
  "inbound": "播州赤穂・相生・姫路方面",
  "outbound": "日生・西大寺・岡山方面",
  "inboundFull": "上り 播州赤穂・相生・姫路方面",
  "outboundFull": "下り 日生・西大寺・岡山方面",
  "inboundShort": "相生方面",
  "outboundShort": "東岡山方面"
},
  stations: JR_AKO_STATIONS,
  trackSegments: JR_AKO_TRACK_SEGMENTS,
  trainTypes: JR_AKO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
