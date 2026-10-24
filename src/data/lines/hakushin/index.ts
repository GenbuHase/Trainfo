import type { LineDefinition } from '../../../types';
import { HAKUSHIN_STATIONS } from './stations';
import { HAKUSHIN_TRACK_SEGMENTS } from './trackGeometry';
import { HAKUSHIN_TRAIN_TYPES } from './trainTypes';

export const hakushinLine: LineDefinition = {
  id: 'hakushin',
  name: 'JR白新線',
  shortName: '白新線',
  operator: 'JR東日本',
  lineColor: '#e91e63',
  accentColor: '#c2185b',
  defaultCars: 4,
  defaultBounds: [
    [37.88, 139.00],
    [38.06, 139.26],
  ],
  directionNames: {
    inbound: '新潟方面',
    outbound: '新発田方面',
    inboundFull: '上り 新潟方面',
    outboundFull: '下り 新発田方面',
    inboundShort: '新潟方面',
    outboundShort: '新発田方面',
  },
  stations: HAKUSHIN_STATIONS,
  trackSegments: HAKUSHIN_TRACK_SEGMENTS,
  trainTypes: HAKUSHIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
