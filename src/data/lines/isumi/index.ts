import type { LineDefinition } from '../../../types';
import { ISUMI_STATIONS } from './stations';
import { ISUMI_TRACK_SEGMENTS } from './trackGeometry';
import { ISUMI_TRAIN_TYPES } from './trainTypes';

export const isumiLine: LineDefinition = {
  id: 'isumi',
  name: 'いすみ鉄道いすみ線',
  shortName: 'いすみ線',
  operator: 'いすみ鉄道',
  area: 'kanto',
  lineColor: '#fdd835',
  accentColor: '#2e7d32',
  defaultCars: 1,
  defaultBounds: [
    [35.2256, 140.1842],
    [35.3068, 140.4060],
  ],
  directionNames: {
    "inbound": "大原方面",
    "outbound": "大多喜・上総中野方面",
    "inboundFull": "上り 大原方面",
    "outboundFull": "下り 大多喜・上総中野方面",
    "inboundShort": "大原方面",
    "outboundShort": "大多喜"
},
  stations: ISUMI_STATIONS,
  trackSegments: ISUMI_TRACK_SEGMENTS,
  trainTypes: ISUMI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
