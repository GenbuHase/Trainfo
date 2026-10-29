import type { LineDefinition } from '../../../types';
import { TSURUMI_STATIONS } from './stations';
import { TSURUMI_TRAIN_TYPES } from './trainTypes';
import { TSURUMI_TRACK_SEGMENTS } from './trackGeometry';

export const tsurumiLine: LineDefinition = {
  id: 'tsurumi',
  name: 'JR鶴見線',
  shortName: '鶴見線',
  operator: 'JR東日本',
  lineColor: '#ffd400',
  accentColor: '#0074be',
  defaultCars: 3,
  defaultBounds: [[35.48,139.66],[35.53,139.73]],
  directionNames: {
  "inbound": "上り 鶴見方面",
  "outbound": "下り 浜川崎・扇町方面",
  "inboundFull": "上り 鶴見方面",
  "outboundFull": "下り 弁天橋・浜川崎・扇町・海芝浦方面",
  "inboundShort": "鶴見方面",
  "outboundShort": "扇町方面"
},
  stations: TSURUMI_STATIONS,
  trackSegments: TSURUMI_TRACK_SEGMENTS,
  trainTypes: TSURUMI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
