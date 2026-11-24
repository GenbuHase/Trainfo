import type { LineDefinition } from '../../../types';
import { SEIBU_KOKUBUNJI_STATIONS } from './stations';
import { SEIBU_KOKUBUNJI_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_KOKUBUNJI_TRAIN_TYPES } from './trainTypes';

export const seibuKokubunjiLine: LineDefinition = {
  id: 'seibu_kokubunji',
  name: '西武国分寺線',
  shortName: '国分寺線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#009944',
  accentColor: '#007a36',
  defaultCars: 6,
  defaultBounds: [
    [35.6851, 139.4461],
    [35.7759, 139.4950],
  ],
  directionNames: {
    "inbound": "国分寺方面",
    "outbound": "東村山方面",
    "inboundFull": "上り 国分寺方面",
    "outboundFull": "下り 東村山方面",
    "inboundShort": "上り（国分寺方面）",
    "outboundShort": "下り（東村山方面）"
},
  stations: SEIBU_KOKUBUNJI_STATIONS,
  trackSegments: SEIBU_KOKUBUNJI_TRACK_SEGMENTS,
  trainTypes: SEIBU_KOKUBUNJI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
