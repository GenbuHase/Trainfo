import type { LineDefinition } from '../../../types';
import { IZUHAKONE_DAIYUZAN_STATIONS } from './stations';
import { IZUHAKONE_DAIYUZAN_TRACK_SEGMENTS } from './trackGeometry';
import { IZUHAKONE_DAIYUZAN_TRAIN_TYPES } from './trainTypes';

export const izuhakoneDaiyuzanLine: LineDefinition = {
  id: 'izuhakone_daiyuzan',
  name: '伊豆箱根鉄道大雄山線',
  shortName: '大雄山線',
  operator: '伊豆箱根鉄道',
  area: 'kanto',
  lineColor: '#0073be',
  accentColor: '#00528a',
  defaultCars: 3,
  defaultBounds: [
    [35.2417, 139.0887],
    [35.3340, 139.1738],
  ],
  directionNames: {
    "inbound": "小田原方面",
    "outbound": "大雄山方面",
    "inboundFull": "上り 小田原方面",
    "outboundFull": "下り 大雄山方面",
    "inboundShort": "小田原方面",
    "outboundShort": "大雄山方面"
},
  stations: IZUHAKONE_DAIYUZAN_STATIONS,
  trackSegments: IZUHAKONE_DAIYUZAN_TRACK_SEGMENTS,
  trainTypes: IZUHAKONE_DAIYUZAN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
