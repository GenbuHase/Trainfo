import type { LineDefinition } from '../../../types';
import { KEISEI_NARITA_SKY_ACCESS_STATIONS } from './stations';
import { KEISEI_NARITA_SKY_ACCESS_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_NARITA_SKY_ACCESS_TRAIN_TYPES } from './trainTypes';

export const keiseiNaritaSkyAccessLine: LineDefinition = {
  id: 'keisei_narita_sky_access',
  name: '京成成田スカイアクセス線',
  shortName: '成田スカイアクセス線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#f37321',
  accentColor: '#003686',
  defaultCars: 8,
  defaultBounds: [
    [35.7358, 139.8507],
    [35.8154, 140.4021],
  ],
  directionNames: {
    "inbound": "京成高砂・京成上野・押上方面",
    "outbound": "成田湯川・成田空港方面",
    "inboundFull": "上り 京成高砂・京成上野・押上方面",
    "outboundFull": "下り 成田湯川・成田空港方面",
    "inboundShort": "京成高砂",
    "outboundShort": "成田湯川"
},
  stations: KEISEI_NARITA_SKY_ACCESS_STATIONS,
  trackSegments: KEISEI_NARITA_SKY_ACCESS_TRACK_SEGMENTS,
  trainTypes: KEISEI_NARITA_SKY_ACCESS_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
