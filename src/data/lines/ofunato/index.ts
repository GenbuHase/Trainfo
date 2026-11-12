import type { LineDefinition } from '../../../types';
import { OFUNATO_STATIONS } from './stations';
import { OFUNATO_TRACK_SEGMENTS } from './trackGeometry';
import { OFUNATO_TRAIN_TYPES } from './trainTypes';

export const ofunatoLine: LineDefinition = {
  id: 'ofunato',
  name: 'JR大船渡線',
  shortName: '大船渡線',
  operator: 'JR東日本',
  lineColor: '#ffa500',
  accentColor: '#c2410c',
  defaultCars: 2,
  defaultBounds: [[38.8884,141.118],[39.0168,141.5792]],
  directionNames: {
    "inbound": "一ノ関方面",
    "outbound": "千厩・気仙沼方面",
    "inboundFull": "上り 一ノ関方面",
    "outboundFull": "下り 千厩・気仙沼方面",
    "inboundShort": "上り (一ノ関方面)",
    "outboundShort": "下り (気仙沼方面)"
},
  stations: OFUNATO_STATIONS,
  trackSegments: OFUNATO_TRACK_SEGMENTS,
  trainTypes: OFUNATO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
