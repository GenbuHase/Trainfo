import type { LineDefinition } from '../../../types';
import { TOKYU_OIMACHI_STATIONS } from './stations';
import { TOKYU_OIMACHI_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_OIMACHI_TRAIN_TYPES } from './trainTypes';

export const tokyuOimachiLine: LineDefinition = {
  id: 'tokyu_oimachi',
  name: '東急大井町線',
  shortName: '大井町線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#f18c43',
  accentColor: '#c46a25',
  defaultCars: 5,
  defaultBounds: [
    [35.5848, 139.5955],
    [35.6270, 139.7487],
  ],
  directionNames: {
    "inbound": "自由が丘・大井町方面",
    "outbound": "二子玉川・溝の口方面",
    "inboundFull": "上り 自由が丘・大井町方面",
    "outboundFull": "下り 二子玉川・溝の口方面",
    "inboundShort": "自由が丘",
    "outboundShort": "二子玉川"
},
  stations: TOKYU_OIMACHI_STATIONS,
  trackSegments: TOKYU_OIMACHI_TRACK_SEGMENTS,
  trainTypes: TOKYU_OIMACHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
