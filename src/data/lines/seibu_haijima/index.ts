import type { LineDefinition } from '../../../types';
import { SEIBU_HAIJIMA_STATIONS } from './stations';
import { SEIBU_HAIJIMA_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_HAIJIMA_TRAIN_TYPES } from './trainTypes';

export const seibuHaijimaLine: LineDefinition = {
  id: 'seibu_haijima',
  name: '西武拝島線',
  shortName: '拝島線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#00a7db',
  accentColor: '#007ea6',
  defaultCars: 8,
  defaultBounds: [
    [35.7062, 139.3291],
    [35.7559, 139.5024],
  ],
  directionNames: {
    "inbound": "小平・西武新宿方面",
    "outbound": "玉川上水・拝島方面",
    "inboundFull": "上り 小平・西武新宿方面",
    "outboundFull": "下り 玉川上水・拝島方面",
    "inboundShort": "小平",
    "outboundShort": "玉川上水"
},
  stations: SEIBU_HAIJIMA_STATIONS,
  trackSegments: SEIBU_HAIJIMA_TRACK_SEGMENTS,
  trainTypes: SEIBU_HAIJIMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
