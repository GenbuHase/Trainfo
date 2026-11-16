import type { LineDefinition } from '../../../types';
import { JR_SANGU_STATIONS } from './stations';
import { JR_SANGU_TRAIN_TYPES } from './trainTypes';
import { JR_SANGU_TRACK_SEGMENTS } from './trackGeometry';

export const jrSanguLine: LineDefinition = {
  id: 'jr_sangu',
  name: 'JR参宮線',
  shortName: '参宮線',
  operator: 'JR東海',
  lineColor: '#ff7322',
  accentColor: '#ffd700',
  defaultCars: 2,
  defaultBounds: [[34.4369,136.5244],[34.5653,136.8931]],
  directionNames: {
    "inbound": "多気・亀山・名古屋方面",
    "outbound": "伊勢市・鳥羽方面",
    "inboundFull": "上り 多気・亀山・名古屋方面",
    "outboundFull": "下り 伊勢市・鳥羽方面",
    "inboundShort": "多気方面",
    "outboundShort": "鳥羽方面"
},
  stations: JR_SANGU_STATIONS,
  trackSegments: JR_SANGU_TRACK_SEGMENTS,
  trainTypes: JR_SANGU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
