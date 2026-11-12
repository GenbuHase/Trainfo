import type { LineDefinition } from '../../../types';
import { JR_TAKAYAMA_STATIONS } from './stations';
import { JR_TAKAYAMA_TRAIN_TYPES } from './trainTypes';
import { JR_TAKAYAMA_TRACK_SEGMENTS } from './trackGeometry';

export const jrTakayamaLine: LineDefinition = {
  id: 'jr_takayama',
  name: 'JR高山本線',
  shortName: '高山本線',
  operator: 'JR東海',
  lineColor: '#9b1b30',
  accentColor: '#ff7322',
  defaultCars: 4,
  defaultBounds: [[35.3477,136.7077],[36.7514,137.3374]],
  directionNames: {
    "inbound": "岐阜方面",
    "outbound": "美濃太田・高山・富山方面",
    "inboundFull": "上り 美濃太田・岐阜方面",
    "outboundFull": "下り 高山・富山方面",
    "inboundShort": "岐阜方面",
    "outboundShort": "富山方面"
},
  stations: JR_TAKAYAMA_STATIONS,
  trackSegments: JR_TAKAYAMA_TRACK_SEGMENTS,
  trainTypes: JR_TAKAYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
