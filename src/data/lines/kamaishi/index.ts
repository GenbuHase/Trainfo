import type { LineDefinition } from '../../../types';
import { KAMAISHI_STATIONS } from './stations';
import { KAMAISHI_TRACK_SEGMENTS } from './trackGeometry';
import { KAMAISHI_TRAIN_TYPES } from './trainTypes';

export const kamaishiLine: LineDefinition = {
  id: 'kamaishi',
  name: 'JR釜石線',
  shortName: '釜石線',
  operator: 'JR東日本',
  lineColor: '#3399ff',
  accentColor: '#0284c7',
  defaultCars: 2,
  defaultBounds: [[39.2222,141.0903],[39.4285,141.8925]],
  directionNames: {
    "inbound": "花巻・盛岡方面",
    "outbound": "遠野・釜石方面",
    "inboundFull": "上り 花巻・盛岡方面",
    "outboundFull": "下り 遠野・釜石方面",
    "inboundShort": "上り (花巻方面)",
    "outboundShort": "下り (釜石方面)"
},
  stations: KAMAISHI_STATIONS,
  trackSegments: KAMAISHI_TRACK_SEGMENTS,
  trainTypes: KAMAISHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
