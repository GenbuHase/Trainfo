import type { LineDefinition } from '../../../types';
import { JR_WADAMISAKI_STATIONS } from './stations';
import { JR_WADAMISAKI_TRAIN_TYPES } from './trainTypes';
import { JR_WADAMISAKI_TRACK_SEGMENTS } from './trackGeometry';

export const jrWadamisakiLine: LineDefinition = {
  id: 'jr_wadamisaki',
  name: 'JR和田岬線',
  shortName: '和田岬線',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#ffffff',
  defaultCars: 6,
  defaultBounds: [[34.6075,135.1144],[34.7179,135.2238]],
  directionNames: {
  "inbound": "兵庫・神戸方面",
  "outbound": "和田岬方面",
  "inboundFull": "上り 兵庫方面",
  "outboundFull": "下り 和田岬方面",
  "inboundShort": "兵庫方面",
  "outboundShort": "和田岬方面"
},
  stations: JR_WADAMISAKI_STATIONS,
  trackSegments: JR_WADAMISAKI_TRACK_SEGMENTS,
  trainTypes: JR_WADAMISAKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
