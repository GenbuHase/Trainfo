import type { LineDefinition } from '../../../types';
import { UTSUNOMIYA_LIGHT_RAIL_STATIONS } from './stations';
import { UTSUNOMIYA_LIGHT_RAIL_TRACK_SEGMENTS } from './trackGeometry';
import { UTSUNOMIYA_LIGHT_RAIL_TRAIN_TYPES } from './trainTypes';

export const utsunomiyaLightRailLine: LineDefinition = {
  id: 'utsunomiya_light_rail',
  name: '宇都宮ライトレール',
  shortName: 'ライトライン',
  operator: '宇都宮ライトレール',
  area: 'kanto',
  lineColor: '#ffd400',
  accentColor: '#1e293b',
  defaultCars: 3,
  defaultBounds: [
    [36.5300, 139.8845],
    [36.5937, 140.0295],
  ],
  directionNames: {
    "inbound": "宇都宮駅東口方面",
    "outbound": "芳賀・高根沢工業団地方面",
    "inboundFull": "上り 宇都宮駅東口方面",
    "outboundFull": "下り 芳賀・高根沢工業団地方面",
    "inboundShort": "宇都宮駅東口方面",
    "outboundShort": "芳賀"
},
  stations: UTSUNOMIYA_LIGHT_RAIL_STATIONS,
  trackSegments: UTSUNOMIYA_LIGHT_RAIL_TRACK_SEGMENTS,
  trainTypes: UTSUNOMIYA_LIGHT_RAIL_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
