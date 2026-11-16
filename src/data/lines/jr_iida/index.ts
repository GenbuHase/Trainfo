import type { LineDefinition } from '../../../types';
import { JR_IIDA_STATIONS } from './stations';
import { JR_IIDA_TRAIN_TYPES } from './trainTypes';
import { JR_IIDA_TRACK_SEGMENTS } from './trackGeometry';

export const jrIidaLine: LineDefinition = {
  id: 'jr_iida',
  name: 'JR飯田線',
  shortName: '飯田線',
  operator: 'JR東海',
  lineColor: '#228b22',
  accentColor: '#ff7322',
  defaultCars: 3,
  defaultBounds: [[34.7117,137.3131],[36.0347,138.0481]],
  directionNames: {
    "inbound": "豊川・豊橋方面",
    "outbound": "天竜峡・飯田・辰野方面",
    "inboundFull": "上り 豊川・豊橋方面",
    "outboundFull": "下り 天竜峡・飯田・辰野方面",
    "inboundShort": "豊橋方面",
    "outboundShort": "辰野方面"
},
  stations: JR_IIDA_STATIONS,
  trackSegments: JR_IIDA_TRACK_SEGMENTS,
  trainTypes: JR_IIDA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
