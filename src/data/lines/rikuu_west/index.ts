import type { LineDefinition } from '../../../types';
import { RIKUU_WEST_STATIONS } from './stations';
import { RIKUU_WEST_TRACK_SEGMENTS } from './trackGeometry';
import { RIKUU_WEST_TRAIN_TYPES } from './trainTypes';

export const rikuuWestLine: LineDefinition = {
  id: 'rikuu_west',
  name: 'JR陸羽西線',
  shortName: '陸羽西線',
  operator: 'JR東日本',
  lineColor: '#6fbf7f',
  accentColor: '#3d8b4e',
  defaultCars: 2,
  defaultBounds: [[38.7172,139.8916],[38.8643,140.326]],
  directionNames: {
    "inbound": "古口・新庄方面",
    "outbound": "古口・余目方面",
    "inboundFull": "上り 古口・新庄方面",
    "outboundFull": "下り 古口・余目・酒田方面",
    "inboundShort": "新庄方面",
    "outboundShort": "余目・酒田方面"
},
  stations: RIKUU_WEST_STATIONS,
  trackSegments: RIKUU_WEST_TRACK_SEGMENTS,
  trainTypes: RIKUU_WEST_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
