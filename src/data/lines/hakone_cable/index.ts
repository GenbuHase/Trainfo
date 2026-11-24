import type { LineDefinition } from '../../../types';
import { HAKONE_CABLE_STATIONS } from './stations';
import { HAKONE_CABLE_TRACK_SEGMENTS } from './trackGeometry';
import { HAKONE_CABLE_TRAIN_TYPES } from './trainTypes';

export const hakoneCableLine: LineDefinition = {
  id: 'hakone_cable',
  name: '小田急箱根鋼索線（箱根登山ケーブルカー）',
  shortName: '箱根登山ケーブルカー',
  operator: '小田急箱根',
  area: 'kanto',
  lineColor: '#dc3c00',
  accentColor: '#9e2a00',
  defaultCars: 2,
  defaultBounds: [
    [35.2313, 139.0204],
    [35.2656, 139.0626],
  ],
  directionNames: {
    "inbound": "強羅方面",
    "outbound": "早雲山方面",
    "inboundFull": "上り 強羅方面",
    "outboundFull": "下り 早雲山方面",
    "inboundShort": "上り（強羅方面）",
    "outboundShort": "下り（早雲山方面）"
},
  stations: HAKONE_CABLE_STATIONS,
  trackSegments: HAKONE_CABLE_TRACK_SEGMENTS,
  trainTypes: HAKONE_CABLE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
