import type { LineDefinition } from '../../../types';
import { SAITAMA_RAPID_STATIONS } from './stations';
import { SAITAMA_RAPID_TRACK_SEGMENTS } from './trackGeometry';
import { SAITAMA_RAPID_TRAIN_TYPES } from './trainTypes';

export const saitamaRapidLine: LineDefinition = {
  id: 'saitama_rapid',
  name: '埼玉高速鉄道埼玉スタジアム線',
  shortName: '埼玉スタジアム線',
  operator: '埼玉高速鉄道',
  area: 'kanto',
  lineColor: '#2957a4',
  accentColor: '#1b3b73',
  defaultCars: 8,
  defaultBounds: [
    [35.7684, 139.7069],
    [35.9093, 139.7688],
  ],
  directionNames: {
    "inbound": "赤羽岩淵・南北線・東急線方面",
    "outbound": "東川口・浦和美園方面",
    "inboundFull": "上り 赤羽岩淵・南北線・東急線方面",
    "outboundFull": "下り 東川口・浦和美園方面",
    "inboundShort": "上り（赤羽岩淵方面）",
    "outboundShort": "下り（浦和美園方面）"
},
  stations: SAITAMA_RAPID_STATIONS,
  trackSegments: SAITAMA_RAPID_TRACK_SEGMENTS,
  trainTypes: SAITAMA_RAPID_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
