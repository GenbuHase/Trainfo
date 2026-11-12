import type { LineDefinition } from '../../../types';
import { RIKUU_EAST_STATIONS } from './stations';
import { RIKUU_EAST_TRACK_SEGMENTS } from './trackGeometry';
import { RIKUU_EAST_TRAIN_TYPES } from './trainTypes';

export const rikuuEastLine: LineDefinition = {
  id: 'rikuu_east',
  name: 'JR陸羽東線',
  shortName: '陸羽東線',
  operator: 'JR東日本',
  lineColor: '#75787a',
  accentColor: '#475569',
  defaultCars: 2,
  defaultBounds: [[38.5211,140.286],[38.786,141.0843]],
  directionNames: {
    "inbound": "古川・小牛田方面",
    "outbound": "鳴子温泉・新庄方面",
    "inboundFull": "上り 鳴子温泉・古川・小牛田方面",
    "outboundFull": "下り 古川・鳴子温泉・新庄方面",
    "inboundShort": "小牛田方面",
    "outboundShort": "新庄方面"
},
  stations: RIKUU_EAST_STATIONS,
  trackSegments: RIKUU_EAST_TRACK_SEGMENTS,
  trainTypes: RIKUU_EAST_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
