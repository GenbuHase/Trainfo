import type { LineDefinition } from '../../../types';
import { JR_WAKAYAMA_STATIONS } from './stations';
import { JR_WAKAYAMA_TRAIN_TYPES } from './trainTypes';
import { JR_WAKAYAMA_TRACK_SEGMENTS } from './trackGeometry';

export const jrWakayamaLine: LineDefinition = {
  id: 'jr_wakayama',
  name: 'JR和歌山線',
  shortName: '和歌山線',
  operator: 'JR西日本',
  lineColor: '#e60072',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[34.1825,135.1417],[34.6478,135.8131]],
  directionNames: {
  "inbound": "高田・王寺方面",
  "outbound": "橋本・五条・和歌山方面",
  "inboundFull": "上り 高田・王寺方面",
  "outboundFull": "下り 橋本・五条・和歌山方面",
  "inboundShort": "王寺方面",
  "outboundShort": "和歌山方面"
},
  stations: JR_WAKAYAMA_STATIONS,
  trackSegments: JR_WAKAYAMA_TRACK_SEGMENTS,
  trainTypes: JR_WAKAYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
