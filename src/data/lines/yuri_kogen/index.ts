import type { LineDefinition } from '../../../types';
import { YURI_KOGEN_STATIONS } from './stations';
import { YURI_KOGEN_TRACK_SEGMENTS } from './trackGeometry';
import { YURI_KOGEN_TRAIN_TYPES } from './trainTypes';

export const yuriKogenLine: LineDefinition = {
  id: 'yuri_kogen',
  name: '由利高原鉄道鳥海山ろく線',
  shortName: '鳥海山ろく線',
  operator: '由利高原鉄道',
  area: 'tohoku',
  lineColor: '#0072bc',
  accentColor: '#2f6f3e',
  defaultCars: 1,
  defaultBounds: [[39.2104,140.0287],[39.4067,140.1589]],
  directionNames: {
    "inbound": "前郷・羽後本荘方面",
    "outbound": "前郷・矢島方面",
    "inboundFull": "上り 羽後本荘方面",
    "outboundFull": "下り 矢島方面",
    "inboundShort": "上り（羽後本荘方面）",
    "outboundShort": "下り（矢島方面）"
},
  stations: YURI_KOGEN_STATIONS,
  trackSegments: YURI_KOGEN_TRACK_SEGMENTS,
  trainTypes: YURI_KOGEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
