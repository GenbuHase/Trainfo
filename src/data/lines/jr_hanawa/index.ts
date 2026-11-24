import type { LineDefinition } from '../../../types';
import { HANAWA_STATIONS } from './stations';
import { HANAWA_TRACK_SEGMENTS } from './trackGeometry';
import { HANAWA_TRAIN_TYPES } from './trainTypes';

export const hanawaLine: LineDefinition = {
  id: 'jr_hanawa',
  name: 'JR花輪線',
  shortName: '花輪線',
  operator: 'JR東日本',
  area: 'tohoku',
  lineColor: '#b31c31',
  accentColor: '#880e4f',
  defaultCars: 2,
  defaultBounds: [[39.6807,140.5346],[40.3083,141.1935]],
  directionNames: {
    "inbound": "鹿角花輪・好摩・盛岡方面",
    "outbound": "鹿角花輪・十和田南・大館方面",
    "inboundFull": "上り 好摩・盛岡方面",
    "outboundFull": "下り 鹿角花輪・大館方面",
    "inboundShort": "盛岡方面",
    "outboundShort": "大館方面"
},
  stations: HANAWA_STATIONS,
  trackSegments: HANAWA_TRACK_SEGMENTS,
  trainTypes: HANAWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
