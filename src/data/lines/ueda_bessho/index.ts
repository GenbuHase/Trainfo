import type { LineDefinition } from '../../../types';
import { UEDA_BESSHO_STATIONS } from './stations';
import { UEDA_BESSHO_TRACK_SEGMENTS } from './trackGeometry';
import { UEDA_BESSHO_TRAIN_TYPES } from './trainTypes';

export const uedaBesshoLine: LineDefinition = {
  id: 'ueda_bessho',
  name: '上田電鉄別所線',
  shortName: '別所線',
  operator: '上田電鉄',
  area: 'koshinetsu',
  lineColor: '#1a237e',
  accentColor: '#c62828',
  defaultCars: 2,
  defaultBounds: [
    [36.3335, 138.1421],
    [36.4158, 138.2703],
  ],
  directionNames: {
    "inbound": "上田方面",
    "outbound": "別所温泉方面",
    "inboundFull": "上り 下之郷・上田方面",
    "outboundFull": "下り 下之郷・別所温泉方面",
    "inboundShort": "上田方面",
    "outboundShort": "別所温泉方面"
},
  stations: UEDA_BESSHO_STATIONS,
  trackSegments: UEDA_BESSHO_TRACK_SEGMENTS,
  trainTypes: UEDA_BESSHO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
