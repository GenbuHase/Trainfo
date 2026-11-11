import type { LineDefinition } from '../../../types';
import { SENZAN_STATIONS } from './stations';
import { SENZAN_TRACK_SEGMENTS } from './trackGeometry';
import { SENZAN_TRAIN_TYPES } from './trainTypes';

export const senzanLine: LineDefinition = {
  id: 'senzan',
  name: 'JR仙山線',
  shortName: '仙山線',
  operator: 'JR東日本',
  lineColor: '#77dd00',
  accentColor: '#4d7c0f',
  defaultCars: 4,
  defaultBounds: [[38.2407,140.3222],[38.3531,140.9064]],
  directionNames: {
    "inbound": "仙台方面",
    "outbound": "愛子・作並・山形方面",
    "inboundFull": "上り 仙台方面",
    "outboundFull": "下り 愛子・作並・山形方面",
    "inboundShort": "上り (仙台方面)",
    "outboundShort": "下り (山形方面)"
},
  stations: SENZAN_STATIONS,
  trackSegments: SENZAN_TRACK_SEGMENTS,
  trainTypes: SENZAN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
