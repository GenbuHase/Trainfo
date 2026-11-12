import type { LineDefinition } from '../../../types';
import { HACHINOHE_STATIONS } from './stations';
import { HACHINOHE_TRACK_SEGMENTS } from './trackGeometry';
import { HACHINOHE_TRAIN_TYPES } from './trainTypes';

export const hachinoheLine: LineDefinition = {
  id: 'hachinohe',
  name: 'JR八戸線',
  shortName: '八戸線',
  operator: 'JR東日本',
  lineColor: '#ff0000',
  accentColor: '#b91c1c',
  defaultCars: 2,
  defaultBounds: [[40.1703,141.4114],[40.5506,141.8122]],
  directionNames: {
    "inbound": "八戸方面",
    "outbound": "本八戸・鮫・久慈方面",
    "inboundFull": "上り 八戸方面",
    "outboundFull": "下り 本八戸・鮫・久慈方面",
    "inboundShort": "上り (八戸方面)",
    "outboundShort": "下り (久慈方面)"
},
  stations: HACHINOHE_STATIONS,
  trackSegments: HACHINOHE_TRACK_SEGMENTS,
  trainTypes: HACHINOHE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
