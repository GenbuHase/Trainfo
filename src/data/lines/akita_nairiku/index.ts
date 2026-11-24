import type { LineDefinition } from '../../../types';
import { AKITA_NAIRIKU_STATIONS } from './stations';
import { AKITA_NAIRIKU_TRACK_SEGMENTS } from './trackGeometry';
import { AKITA_NAIRIKU_TRAIN_TYPES } from './trainTypes';

export const akitaNairikuLine: LineDefinition = {
  id: 'akita_nairiku',
  name: '秋田内陸縦貫鉄道秋田内陸線',
  shortName: '秋田内陸線',
  operator: '秋田内陸縦貫鉄道',
  area: 'tohoku',
  lineColor: '#16a34a',
  accentColor: '#ea5504',
  defaultCars: 1,
  defaultBounds: [[39.572,140.3104],[40.2519,140.6227]],
  directionNames: {
    "inbound": "阿仁合・鷹巣方面",
    "outbound": "阿仁合・角館方面",
    "inboundFull": "上り 阿仁合・鷹巣方面",
    "outboundFull": "下り 阿仁合・角館方面",
    "inboundShort": "鷹巣方面",
    "outboundShort": "角館方面"
},
  stations: AKITA_NAIRIKU_STATIONS,
  trackSegments: AKITA_NAIRIKU_TRACK_SEGMENTS,
  trainTypes: AKITA_NAIRIKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
