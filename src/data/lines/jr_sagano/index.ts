import type { LineDefinition } from '../../../types';
import { JR_SAGANO_STATIONS } from './stations';
import { JR_SAGANO_TRAIN_TYPES } from './trainTypes';
import { JR_SAGANO_TRACK_SEGMENTS } from './trackGeometry';

export const jrSaganoLine: LineDefinition = {
  id: 'jr_sagano',
  name: 'JR嵯峨野線',
  shortName: '嵯峨野線',
  operator: 'JR西日本',
  lineColor: '#884898',
  accentColor: '#ffffff',
  defaultCars: 6,
  defaultBounds: [[34.9357,135.4335],[35.1522,135.8087]],
  directionNames: {
  "inbound": "京都方面",
  "outbound": "亀岡・園部方面",
  "inboundFull": "上り 二条・京都方面",
  "outboundFull": "下り 亀岡・園部方面",
  "inboundShort": "京都方面",
  "outboundShort": "園部方面"
},
  stations: JR_SAGANO_STATIONS,
  trackSegments: JR_SAGANO_TRACK_SEGMENTS,
  trainTypes: JR_SAGANO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
