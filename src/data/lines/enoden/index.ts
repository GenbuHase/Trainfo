import type { LineDefinition } from '../../../types';
import { ENODEN_STATIONS } from './stations';
import { ENODEN_TRACK_SEGMENTS } from './trackGeometry';
import { ENODEN_TRAIN_TYPES } from './trainTypes';

export const enodenLine: LineDefinition = {
  id: 'enoden',
  name: '江ノ島電鉄線',
  shortName: '江ノ電',
  operator: '江ノ島電鉄',
  area: 'kanto',
  lineColor: '#007f4e',
  accentColor: '#f39800',
  defaultCars: 4,
  defaultBounds: [
    [35.2893, 139.4678],
    [35.3522, 139.5651],
  ],
  directionNames: {
    "inbound": "江ノ島・藤沢方面",
    "outbound": "長谷・鎌倉方面",
    "inboundFull": "上り 江ノ島・藤沢方面",
    "outboundFull": "下り 長谷・鎌倉方面",
    "inboundShort": "上り（藤沢方面）",
    "outboundShort": "下り（鎌倉方面）"
},
  stations: ENODEN_STATIONS,
  trackSegments: ENODEN_TRACK_SEGMENTS,
  trainTypes: ENODEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
