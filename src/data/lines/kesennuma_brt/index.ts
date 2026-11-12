import type { LineDefinition } from '../../../types';
import { KESENNUMA_BRT_STATIONS } from './stations';
import { KESENNUMA_BRT_TRACK_SEGMENTS } from './trackGeometry';
import { KESENNUMA_BRT_TRAIN_TYPES } from './trainTypes';

export const kesennumaBrtLine: LineDefinition = {
  id: 'kesennuma_brt',
  name: 'JR気仙沼線BRT',
  shortName: '気仙沼線BRT',
  operator: 'JR東日本',
  lineColor: '#7c3aed',
  accentColor: '#5b21b6',
  defaultCars: 1,
  defaultBounds: [[38.4923,141.1739],[38.9298,141.604]],
  directionNames: {
    "inbound": "志津川・柳津・前谷地方面",
    "outbound": "志津川・本吉・気仙沼方面",
    "inboundFull": "上り 志津川・柳津・前谷地方面",
    "outboundFull": "下り 志津川・本吉・気仙沼方面",
    "inboundShort": "上り (前谷地・柳津方面)",
    "outboundShort": "下り (気仙沼方面)"
},
  stations: KESENNUMA_BRT_STATIONS,
  trackSegments: KESENNUMA_BRT_TRACK_SEGMENTS,
  trainTypes: KESENNUMA_BRT_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
