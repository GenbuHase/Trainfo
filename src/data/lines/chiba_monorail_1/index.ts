import type { LineDefinition } from '../../../types';
import { CHIBA_MONORAIL_1_STATIONS } from './stations';
import { CHIBA_MONORAIL_1_TRACK_SEGMENTS } from './trackGeometry';
import { CHIBA_MONORAIL_1_TRAIN_TYPES } from './trainTypes';

export const chibaMonorail1Line: LineDefinition = {
  id: 'chiba_monorail_1',
  name: '千葉都市モノレール1号線',
  shortName: 'モノレール1号線',
  operator: '千葉都市モノレール',
  area: 'kanto',
  lineColor: '#005bac',
  accentColor: '#003d75',
  defaultCars: 2,
  defaultBounds: [
    [35.5890, 140.0883],
    [35.6277, 140.1370],
  ],
  directionNames: {
    "inbound": "千葉みなと方面",
    "outbound": "千葉・県庁前方面",
    "inboundFull": "上り 千葉みなと方面",
    "outboundFull": "下り 千葉・県庁前方面",
    "inboundShort": "千葉みなと方面",
    "outboundShort": "千葉"
},
  stations: CHIBA_MONORAIL_1_STATIONS,
  trackSegments: CHIBA_MONORAIL_1_TRACK_SEGMENTS,
  trainTypes: CHIBA_MONORAIL_1_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
