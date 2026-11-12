import type { LineDefinition } from '../../../types';
import { JR_OBAMA_STATIONS } from './stations';
import { JR_OBAMA_TRAIN_TYPES } from './trainTypes';
import { JR_OBAMA_TRACK_SEGMENTS } from './trackGeometry';

export const jrObamaLine: LineDefinition = {
  id: 'jr_obama',
  name: 'JR小浜線',
  shortName: '小浜線',
  operator: 'JR西日本',
  lineColor: '#0099cc',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[35.4137,135.3448],[35.6958,136.1279]],
  directionNames: {
  "inbound": "小浜・敦賀方面",
  "outbound": "小浜・東舞鶴方面",
  "inboundFull": "上り 小浜・敦賀方面",
  "outboundFull": "下り 小浜・東舞鶴方面",
  "inboundShort": "敦賀方面",
  "outboundShort": "東舞鶴方面"
},
  stations: JR_OBAMA_STATIONS,
  trackSegments: JR_OBAMA_TRACK_SEGMENTS,
  trainTypes: JR_OBAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
