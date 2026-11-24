import type { LineDefinition } from '../../../types';
import { KONAN_KONAN_STATIONS } from './stations';
import { KONAN_KONAN_TRACK_SEGMENTS } from './trackGeometry';
import { KONAN_KONAN_TRAIN_TYPES } from './trainTypes';

export const konanKonanLine: LineDefinition = {
  id: 'konan_konan',
  name: '弘南鉄道弘南線',
  shortName: '弘南線',
  operator: '弘南鉄道',
  area: 'tohoku',
  lineColor: '#000000',
  accentColor: '#2e7d32',
  defaultCars: 2,
  defaultBounds: [[40.5651,140.4658],[40.6691,140.6116]],
  directionNames: {
    "inbound": "平賀・弘前方面",
    "outbound": "平賀・黒石方面",
    "inboundFull": "上り 平賀・弘前方面",
    "outboundFull": "下り 平賀・黒石方面",
    "inboundShort": "弘前方面",
    "outboundShort": "黒石方面"
},
  stations: KONAN_KONAN_STATIONS,
  trackSegments: KONAN_KONAN_TRACK_SEGMENTS,
  trainTypes: KONAN_KONAN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
