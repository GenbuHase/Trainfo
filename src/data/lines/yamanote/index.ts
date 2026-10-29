import type { LineDefinition } from '../../../types';
import { YAMANOTE_STATIONS } from './stations';
import { YAMANOTE_TRAIN_TYPES } from './trainTypes';
import { YAMANOTE_TRACK_SEGMENTS } from './trackGeometry';

export const yamanoteLine: LineDefinition = {
  id: 'yamanote',
  name: 'JR山手線',
  shortName: '山手線',
  operator: 'JR東日本',
  lineColor: '#80c241',
  accentColor: '#80c241',
  defaultCars: 11,
  defaultBounds: [[35.61,139.69],[35.74,139.78]],
  directionNames: {
  "inbound": "内回り（品川・東京方面）",
  "outbound": "外回り（渋谷・新宿方面）",
  "inboundFull": "内回り 品川・東京・上野方面",
  "outboundFull": "外回り 渋谷・新宿・池袋方面",
  "inboundShort": "内回り",
  "outboundShort": "外回り"
},
  stations: YAMANOTE_STATIONS,
  trackSegments: YAMANOTE_TRACK_SEGMENTS,
  trainTypes: YAMANOTE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
