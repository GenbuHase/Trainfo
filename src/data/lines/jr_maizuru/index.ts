import type { LineDefinition } from '../../../types';
import { JR_MAIZURU_STATIONS } from './stations';
import { JR_MAIZURU_TRAIN_TYPES } from './trainTypes';
import { JR_MAIZURU_TRACK_SEGMENTS } from './trackGeometry';

export const jrMaizuruLine: LineDefinition = {
  id: 'jr_maizuru',
  name: 'JR舞鶴線',
  shortName: '舞鶴線',
  operator: 'JR西日本',
  lineColor: '#008080',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[35.2521,135.2019],[35.5186,135.4448]],
  directionNames: {
  "inbound": "綾部・福知山・京都方面",
  "outbound": "西舞鶴・東舞鶴方面",
  "inboundFull": "上り 綾部・福知山・京都方面",
  "outboundFull": "下り 西舞鶴・東舞鶴方面",
  "inboundShort": "綾部方面",
  "outboundShort": "東舞鶴方面"
},
  stations: JR_MAIZURU_STATIONS,
  trackSegments: JR_MAIZURU_TRACK_SEGMENTS,
  trainTypes: JR_MAIZURU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
