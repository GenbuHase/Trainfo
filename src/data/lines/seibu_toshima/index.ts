import type { LineDefinition } from '../../../types';
import { SEIBU_TOSHIMA_STATIONS } from './stations';
import { SEIBU_TOSHIMA_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_TOSHIMA_TRAIN_TYPES } from './trainTypes';

export const seibuToshimaLine: LineDefinition = {
  id: 'seibu_toshima',
  name: '西武豊島線',
  shortName: '豊島線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#ff6600',
  accentColor: '#cc5200',
  defaultCars: 8,
  defaultBounds: [
    [35.7229, 139.6330],
    [35.7566, 139.6691],
  ],
  directionNames: {
    "inbound": "練馬・池袋方面",
    "outbound": "豊島園方面",
    "inboundFull": "上り 練馬・池袋方面",
    "outboundFull": "下り 豊島園方面",
    "inboundShort": "上り（練馬方面）",
    "outboundShort": "下り（豊島園方面）"
},
  stations: SEIBU_TOSHIMA_STATIONS,
  trackSegments: SEIBU_TOSHIMA_TRACK_SEGMENTS,
  trainTypes: SEIBU_TOSHIMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
