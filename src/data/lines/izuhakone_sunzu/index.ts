import type { LineDefinition } from '../../../types';
import { IZUHAKONE_SUNZU_STATIONS } from './stations';
import { IZUHAKONE_SUNZU_TRAIN_TYPES } from './trainTypes';
import { IZUHAKONE_SUNZU_TRACK_SEGMENTS } from './trackGeometry';

export const izuhakoneSunzuLine: LineDefinition = {
  id: 'izuhakone_sunzu',
  name: '伊豆箱根鉄道駿豆線',
  shortName: '駿豆線',
  operator: '伊豆箱根鉄道',
  lineColor: '#0083ca',
  accentColor: '#ffdd00',
  defaultCars: 3,
  defaultBounds: [[34.9645,138.9066],[35.1411,138.9587]],
  directionNames: {
  "inbound": "三島方面",
  "outbound": "修善寺方面",
  "inboundFull": "上り 三島方面",
  "outboundFull": "下り 修善寺方面",
  "inboundShort": "三島方面",
  "outboundShort": "修善寺方面"
},
  stations: IZUHAKONE_SUNZU_STATIONS,
  trackSegments: IZUHAKONE_SUNZU_TRACK_SEGMENTS,
  trainTypes: IZUHAKONE_SUNZU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
