import type { LineDefinition } from '../../../types';
import { JR_AGATSUMA_STATIONS } from './stations';
import { JR_AGATSUMA_TRACK_SEGMENTS } from './trackGeometry';
import { JR_AGATSUMA_TRAIN_TYPES } from './trainTypes';

export const jrAgatsumaLine: LineDefinition = {
  id: 'jr_agatsuma',
  name: 'JR吾妻線',
  shortName: '吾妻線',
  operator: 'JR東日本',
  area: 'kanto',
  lineColor: '#00897b',
  accentColor: '#005b50',
  defaultCars: 4,
  defaultBounds: [
    [36.4757, 138.5137],
    [36.6004, 139.0236],
  ],
  directionNames: {
    "inbound": "高崎・渋川方面",
    "outbound": "長野原草津口・大前方面",
    "inboundFull": "上り 高崎・渋川方面",
    "outboundFull": "下り 長野原草津口・大前方面",
    "inboundShort": "高崎",
    "outboundShort": "長野原草津口"
},
  stations: JR_AGATSUMA_STATIONS,
  trackSegments: JR_AGATSUMA_TRACK_SEGMENTS,
  trainTypes: JR_AGATSUMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
