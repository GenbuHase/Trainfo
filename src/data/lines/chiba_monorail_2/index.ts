import type { LineDefinition } from '../../../types';
import { CHIBA_MONORAIL_2_STATIONS } from './stations';
import { CHIBA_MONORAIL_2_TRACK_SEGMENTS } from './trackGeometry';
import { CHIBA_MONORAIL_2_TRAIN_TYPES } from './trainTypes';

export const chibaMonorail2Line: LineDefinition = {
  id: 'chiba_monorail_2',
  name: '千葉都市モノレール2号線',
  shortName: 'モノレール2号線',
  operator: '千葉都市モノレール',
  area: 'kanto',
  lineColor: '#005bac',
  accentColor: '#003d75',
  defaultCars: 2,
  defaultBounds: [
    [35.5974, 140.0972],
    [35.6586, 140.2032],
  ],
  directionNames: {
    "inbound": "千葉・千葉みなと方面",
    "outbound": "都賀・千城台方面",
    "inboundFull": "上り 千葉・千葉みなと方面",
    "outboundFull": "下り 都賀・千城台方面",
    "inboundShort": "千葉",
    "outboundShort": "都賀"
},
  stations: CHIBA_MONORAIL_2_STATIONS,
  trackSegments: CHIBA_MONORAIL_2_TRACK_SEGMENTS,
  trainTypes: CHIBA_MONORAIL_2_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
