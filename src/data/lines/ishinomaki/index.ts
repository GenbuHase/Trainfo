import type { LineDefinition } from '../../../types';
import { ISHINOMAKI_STATIONS } from './stations';
import { ISHINOMAKI_TRACK_SEGMENTS } from './trackGeometry';
import { ISHINOMAKI_TRAIN_TYPES } from './trainTypes';

export const ishinomakiLine: LineDefinition = {
  id: 'ishinomaki',
  name: 'JR石巻線',
  shortName: '石巻線',
  operator: 'JR東日本',
  lineColor: '#ed77a4',
  accentColor: '#c2185b',
  defaultCars: 2,
  defaultBounds: [[38.3998,141.0443],[38.5693,141.4636]],
  directionNames: {
    "inbound": "涌谷・小牛田方面",
    "outbound": "石巻・女川方面",
    "inboundFull": "上り 前谷地・小牛田方面",
    "outboundFull": "下り 石巻・女川方面",
    "inboundShort": "小牛田方面",
    "outboundShort": "女川方面"
},
  stations: ISHINOMAKI_STATIONS,
  trackSegments: ISHINOMAKI_TRACK_SEGMENTS,
  trainTypes: ISHINOMAKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
