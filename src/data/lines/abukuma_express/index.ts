import type { LineDefinition } from '../../../types';
import { ABUKUMA_EXPRESS_STATIONS } from './stations';
import { ABUKUMA_EXPRESS_TRACK_SEGMENTS } from './trackGeometry';
import { ABUKUMA_EXPRESS_TRAIN_TYPES } from './trainTypes';

export const abukumaExpressLine: LineDefinition = {
  id: 'abukuma_express',
  name: '阿武隈急行線',
  shortName: '阿武隈急行線',
  operator: '阿武隈急行',
  area: 'tohoku',
  lineColor: '#0099cc',
  accentColor: '#22ac38',
  defaultCars: 2,
  defaultBounds: [[37.7352,140.44],[38.0987,140.8298]],
  directionNames: {
    "inbound": "梁川・福島方面",
    "outbound": "梁川・丸森・槻木・仙台方面",
    "inboundFull": "上り 梁川・福島方面",
    "outboundFull": "下り 丸森・槻木・仙台方面",
    "inboundShort": "福島方面",
    "outboundShort": "槻木方面"
},
  stations: ABUKUMA_EXPRESS_STATIONS,
  trackSegments: ABUKUMA_EXPRESS_TRACK_SEGMENTS,
  trainTypes: ABUKUMA_EXPRESS_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
