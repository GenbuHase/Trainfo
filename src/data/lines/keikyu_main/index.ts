import type { LineDefinition } from '../../../types';
import { KEIKYU_MAIN_STATIONS } from './stations';
import { KEIKYU_MAIN_TRACK_SEGMENTS } from './trackGeometry';
import { KEIKYU_MAIN_TRAIN_TYPES } from './trainTypes';

export const keikyuMainLine: LineDefinition = {
  id: 'keikyu_main',
  name: '京急本線',
  shortName: '京急本線',
  operator: '京浜急行電鉄',
  area: 'kanto',
  lineColor: '#e60012',
  accentColor: '#00bfff',
  defaultCars: 8,
  defaultBounds: [
    [35.2369, 139.5816],
    [35.6538, 139.7580],
  ],
  directionNames: {
    "inbound": "品川・泉岳寺・浅草線方面",
    "outbound": "横浜・横須賀中央・浦賀方面",
    "inboundFull": "上り 品川・泉岳寺・浅草線方面",
    "outboundFull": "下り 横浜・横須賀中央・浦賀方面",
    "inboundShort": "品川",
    "outboundShort": "横浜"
},
  stations: KEIKYU_MAIN_STATIONS,
  trackSegments: KEIKYU_MAIN_TRACK_SEGMENTS,
  trainTypes: KEIKYU_MAIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
