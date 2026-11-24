import type { LineDefinition } from '../../../types';
import { JOSHIN_STATIONS } from './stations';
import { JOSHIN_TRACK_SEGMENTS } from './trackGeometry';
import { JOSHIN_TRAIN_TYPES } from './trainTypes';

export const joshinLine: LineDefinition = {
  id: 'joshin',
  name: '上信電鉄上信線',
  shortName: '上信線',
  operator: '上信電鉄',
  area: 'kanto',
  lineColor: '#e65100',
  accentColor: '#bf360c',
  defaultCars: 2,
  defaultBounds: [
    [36.1955, 138.7721],
    [36.3354, 139.0531],
  ],
  directionNames: {
    "inbound": "高崎方面",
    "outbound": "富岡・下仁田方面",
    "inboundFull": "上り 高崎方面",
    "outboundFull": "下り 富岡・下仁田方面",
    "inboundShort": "上り（高崎方面）",
    "outboundShort": "下り（下仁田方面）"
},
  stations: JOSHIN_STATIONS,
  trackSegments: JOSHIN_TRACK_SEGMENTS,
  trainTypes: JOSHIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
