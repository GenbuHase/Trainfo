import type { LineDefinition } from '../../../types';
import { FUKUSHIMA_IIZAKA_STATIONS } from './stations';
import { FUKUSHIMA_IIZAKA_TRACK_SEGMENTS } from './trackGeometry';
import { FUKUSHIMA_IIZAKA_TRAIN_TYPES } from './trainTypes';

export const fukushimaIizakaLine: LineDefinition = {
  id: 'fukushima_iizaka',
  name: '福島交通飯坂線',
  shortName: '飯坂線',
  operator: '福島交通',
  area: 'tohoku',
  lineColor: '#c8102e',
  accentColor: '#0072bc',
  defaultCars: 2,
  defaultBounds: [[37.7352,140.4197],[37.8499,140.4801]],
  directionNames: {
    "inbound": "桜水・福島方面",
    "outbound": "桜水・飯坂温泉方面",
    "inboundFull": "上り 福島方面",
    "outboundFull": "下り 飯坂温泉方面",
    "inboundShort": "上り（福島方面）",
    "outboundShort": "下り（飯坂温泉方面）"
},
  stations: FUKUSHIMA_IIZAKA_STATIONS,
  trackSegments: FUKUSHIMA_IIZAKA_TRACK_SEGMENTS,
  trainTypes: FUKUSHIMA_IIZAKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
