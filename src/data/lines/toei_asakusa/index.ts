import type { LineDefinition } from '../../../types';
import { TOEI_ASAKUSA_STATIONS } from './stations';
import { TOEI_ASAKUSA_TRACK_SEGMENTS } from './trackGeometry';
import { TOEI_ASAKUSA_TRAIN_TYPES } from './trainTypes';

export const toeiAsakusaLine: LineDefinition = {
  id: 'toei_asakusa',
  name: '都営浅草線',
  shortName: '浅草線',
  operator: '東京都交通局',
  area: 'kanto',
  lineColor: '#e85298',
  accentColor: '#b83272',
  defaultCars: 8,
  defaultBounds: [
    [35.5729, 139.6918],
    [35.7256, 139.8281],
  ],
  directionNames: {
    "inbound": "五反田・西馬込・京急線方面",
    "outbound": "日本橋・押上・京成線方面",
    "inboundFull": "上り 五反田・西馬込・京急線方面",
    "outboundFull": "下り 日本橋・押上・京成線方面",
    "inboundShort": "上り（西馬込方面）",
    "outboundShort": "下り（押上方面）"
},
  stations: TOEI_ASAKUSA_STATIONS,
  trackSegments: TOEI_ASAKUSA_TRACK_SEGMENTS,
  trainTypes: TOEI_ASAKUSA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
