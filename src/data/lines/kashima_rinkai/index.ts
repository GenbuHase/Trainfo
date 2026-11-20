import type { LineDefinition } from '../../../types';
import { KASHIMA_RINKAI_STATIONS } from './stations';
import { KASHIMA_RINKAI_TRACK_SEGMENTS } from './trackGeometry';
import { KASHIMA_RINKAI_TRAIN_TYPES } from './trainTypes';

export const kashimaRinkaiLine: LineDefinition = {
  id: 'kashima_rinkai',
  name: '鹿島臨海鉄道大洗鹿島線',
  shortName: '大洗鹿島線',
  operator: '鹿島臨海鉄道',
  area: 'kanto',
  lineColor: '#d32f2f',
  accentColor: '#9a1c1c',
  defaultCars: 2,
  defaultBounds: [
    [35.9556, 140.4633],
    [36.3859, 140.6508],
  ],
  directionNames: {
    "inbound": "水戸方面",
    "outbound": "大洗・鹿島神宮方面",
    "inboundFull": "上り 水戸方面",
    "outboundFull": "下り 大洗・鹿島神宮方面",
    "inboundShort": "水戸方面",
    "outboundShort": "大洗"
},
  stations: KASHIMA_RINKAI_STATIONS,
  trackSegments: KASHIMA_RINKAI_TRACK_SEGMENTS,
  trainTypes: KASHIMA_RINKAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
