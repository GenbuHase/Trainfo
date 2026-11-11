import type { LineDefinition } from '../../../types';
import { TOHOKU_FUKUSHIMA_SENDAI_STATIONS } from './stations';
import { TOHOKU_FUKUSHIMA_SENDAI_TRACK_SEGMENTS } from './trackGeometry';
import { TOHOKU_FUKUSHIMA_SENDAI_TRAIN_TYPES } from './trainTypes';

export const tohokuFukushimaSendaiLine: LineDefinition = {
  id: 'tohoku_fukushima_sendai',
  name: 'JR東北本線（福島～仙台）',
  shortName: '東北本線（福島～仙台）',
  operator: 'JR東日本',
  lineColor: '#00bb85',
  accentColor: '#00897b',
  defaultCars: 4,
  defaultBounds: [[37.7349,140.4398],[38.2807,140.9055]],
  directionNames: {
    "inbound": "白石・福島方面",
    "outbound": "岩沼・仙台方面",
    "inboundFull": "上り 白石・福島方面",
    "outboundFull": "下り 岩沼・仙台方面",
    "inboundShort": "福島方面",
    "outboundShort": "仙台方面"
},
  stations: TOHOKU_FUKUSHIMA_SENDAI_STATIONS,
  trackSegments: TOHOKU_FUKUSHIMA_SENDAI_TRACK_SEGMENTS,
  trainTypes: TOHOKU_FUKUSHIMA_SENDAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
