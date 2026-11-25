import type { LineDefinition } from '../../../types';
import { KOMINATO_STATIONS } from './stations';
import { KOMINATO_TRACK_SEGMENTS } from './trackGeometry';
import { KOMINATO_TRAIN_TYPES } from './trainTypes';

export const kominatoLine: LineDefinition = {
  id: 'kominato',
  name: '小湊鉄道線',
  shortName: '小湊鉄道線',
  operator: '小湊鉄道',
  area: 'kanto',
  lineColor: '#d32f2f',
  accentColor: '#9a1c1c',
  defaultCars: 2,
  defaultBounds: [
    [35.2352, 140.0760],
    [35.5290, 140.2142],
  ],
  directionNames: {
    "inbound": "五井方面",
    "outbound": "養老渓谷・上総中野方面",
    "inboundFull": "上り 五井方面",
    "outboundFull": "下り 養老渓谷・上総中野方面",
    "inboundShort": "上り（五井方面）",
    "outboundShort": "下り（上総中野方面）"
},
  stations: KOMINATO_STATIONS,
  trackSegments: KOMINATO_TRACK_SEGMENTS,
  trainTypes: KOMINATO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
