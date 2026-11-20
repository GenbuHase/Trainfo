import type { LineDefinition } from '../../../types';
import { KEIKYU_DAISHI_STATIONS } from './stations';
import { KEIKYU_DAISHI_TRACK_SEGMENTS } from './trackGeometry';
import { KEIKYU_DAISHI_TRAIN_TYPES } from './trainTypes';

export const keikyuDaishiLine: LineDefinition = {
  id: 'keikyu_daishi',
  name: '京急大師線',
  shortName: '京急大師線',
  operator: '京浜急行電鉄',
  area: 'kanto',
  lineColor: '#e60012',
  accentColor: '#00bfff',
  defaultCars: 4,
  defaultBounds: [
    [35.5176, 139.6856],
    [35.5516, 139.7622],
  ],
  directionNames: {
    "inbound": "京急川崎方面",
    "outbound": "川崎大師・小島新田方面",
    "inboundFull": "上り 京急川崎方面",
    "outboundFull": "下り 川崎大師・小島新田方面",
    "inboundShort": "京急川崎方面",
    "outboundShort": "川崎大師"
},
  stations: KEIKYU_DAISHI_STATIONS,
  trackSegments: KEIKYU_DAISHI_TRACK_SEGMENTS,
  trainTypes: KEIKYU_DAISHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
