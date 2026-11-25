import type { LineDefinition } from '../../../types';
import { TOKYU_SETAGAYA_STATIONS } from './stations';
import { TOKYU_SETAGAYA_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_SETAGAYA_TRAIN_TYPES } from './trainTypes';

export const tokyuSetagayaLine: LineDefinition = {
  id: 'tokyu_setagaya',
  name: '東急世田谷線',
  shortName: '世田谷線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#fcc70d',
  accentColor: '#d4a300',
  defaultCars: 2,
  defaultBounds: [
    [35.6285, 139.6269],
    [35.6808, 139.6838],
  ],
  directionNames: {
    "inbound": "三軒茶屋方面",
    "outbound": "下高井戸方面",
    "inboundFull": "上り 三軒茶屋方面",
    "outboundFull": "下り 下高井戸方面",
    "inboundShort": "上り（三軒茶屋方面）",
    "outboundShort": "下り（下高井戸方面）"
},
  stations: TOKYU_SETAGAYA_STATIONS,
  trackSegments: TOKYU_SETAGAYA_TRACK_SEGMENTS,
  trainTypes: TOKYU_SETAGAYA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
