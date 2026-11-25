import type { LineDefinition } from '../../../types';
import { TOKYU_DENENTOSHI_STATIONS } from './stations';
import { TOKYU_DENENTOSHI_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_DENENTOSHI_TRAIN_TYPES } from './trainTypes';

export const tokyuDenentoshiLine: LineDefinition = {
  id: 'tokyu_denentoshi',
  name: '東急田園都市線',
  shortName: '田園都市線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#20a288',
  accentColor: '#147561',
  defaultCars: 10,
  defaultBounds: [
    [35.4929, 139.4309],
    [35.6746, 139.7171],
  ],
  directionNames: {
    "inbound": "渋谷・半蔵門線・東武線方面",
    "outbound": "二子玉川・長津田・中央林間方面",
    "inboundFull": "上り 渋谷・半蔵門線・東武線方面",
    "outboundFull": "下り 二子玉川・長津田・中央林間方面",
    "inboundShort": "上り（渋谷方面）",
    "outboundShort": "下り（中央林間方面）"
},
  stations: TOKYU_DENENTOSHI_STATIONS,
  trackSegments: TOKYU_DENENTOSHI_TRACK_SEGMENTS,
  trainTypes: TOKYU_DENENTOSHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
