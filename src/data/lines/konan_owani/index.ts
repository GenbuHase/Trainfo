import type { LineDefinition } from '../../../types';
import { KONAN_OWANI_STATIONS } from './stations';
import { KONAN_OWANI_TRACK_SEGMENTS } from './trackGeometry';
import { KONAN_OWANI_TRAIN_TYPES } from './trainTypes';

export const konanOwaniLine: LineDefinition = {
  id: 'konan_owani',
  name: '弘南鉄道大鰐線',
  shortName: '大鰐線',
  operator: '弘南鉄道',
  area: 'tohoku',
  lineColor: '#d70a19',
  accentColor: '#16a34a',
  defaultCars: 2,
  defaultBounds: [[40.5018,140.4482],[40.6194,140.587]],
  directionNames: {
    "inbound": "津軽大沢・中央弘前方面",
    "outbound": "津軽大沢・大鰐方面",
    "inboundFull": "上り 中央弘前方面",
    "outboundFull": "下り 大鰐方面",
    "inboundShort": "上り（中央弘前方面）",
    "outboundShort": "下り（大鰐方面）"
},
  stations: KONAN_OWANI_STATIONS,
  trackSegments: KONAN_OWANI_TRACK_SEGMENTS,
  trainTypes: KONAN_OWANI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
