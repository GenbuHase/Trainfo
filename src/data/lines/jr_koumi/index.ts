import type { LineDefinition } from '../../../types';
import { JR_KOUMI_STATIONS } from './stations';
import { JR_KOUMI_TRACK_SEGMENTS } from './trackGeometry';
import { JR_KOUMI_TRAIN_TYPES } from './trainTypes';

export const jrKoumiLine: LineDefinition = {
  id: 'jr_koumi',
  name: 'JR小海線',
  shortName: '小海線',
  operator: 'JR東日本',
  area: 'koshinetsu',
  lineColor: '#009944',
  accentColor: '#006622',
  defaultCars: 2,
  defaultBounds: [
    [35.8439, 138.2960],
    [36.3458, 138.5468],
  ],
  directionNames: {
    "inbound": "小淵沢方面",
    "outbound": "小諸方面",
    "inboundFull": "上り 野辺山・小淵沢方面",
    "outboundFull": "下り 小海・佐久平・小諸方面",
    "inboundShort": "上り（小淵沢方面）",
    "outboundShort": "下り（小諸方面）"
},
  stations: JR_KOUMI_STATIONS,
  trackSegments: JR_KOUMI_TRACK_SEGMENTS,
  trainTypes: JR_KOUMI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
