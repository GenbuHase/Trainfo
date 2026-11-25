import type { LineDefinition } from '../../../types';
import { KEIKYU_KURIHAMA_STATIONS } from './stations';
import { KEIKYU_KURIHAMA_TRACK_SEGMENTS } from './trackGeometry';
import { KEIKYU_KURIHAMA_TRAIN_TYPES } from './trainTypes';

export const keikyuKurihamaLine: LineDefinition = {
  id: 'keikyu_kurihama',
  name: '京急久里浜線',
  shortName: '京急久里浜線',
  operator: '京浜急行電鉄',
  area: 'kanto',
  lineColor: '#e60012',
  accentColor: '#00bfff',
  defaultCars: 8,
  defaultBounds: [
    [35.1633, 139.6184],
    [35.2778, 139.7173],
  ],
  directionNames: {
    "inbound": "堀ノ内・横浜・品川方面",
    "outbound": "京急久里浜・三崎口方面",
    "inboundFull": "上り 堀ノ内・横浜・品川方面",
    "outboundFull": "下り 京急久里浜・三崎口方面",
    "inboundShort": "上り（品川・横浜方面）",
    "outboundShort": "下り（三崎口方面）"
},
  stations: KEIKYU_KURIHAMA_STATIONS,
  trackSegments: KEIKYU_KURIHAMA_TRACK_SEGMENTS,
  trainTypes: KEIKYU_KURIHAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
