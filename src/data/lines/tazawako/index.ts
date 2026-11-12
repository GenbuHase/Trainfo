import type { LineDefinition } from '../../../types';
import { TAZAWAKO_STATIONS } from './stations';
import { TAZAWAKO_TRACK_SEGMENTS } from './trackGeometry';
import { TAZAWAKO_TRAIN_TYPES } from './trainTypes';

export const tazawakoLine: LineDefinition = {
  id: 'tazawako',
  name: 'JR田沢湖線',
  shortName: '田沢湖線',
  operator: 'JR東日本',
  lineColor: '#9d72b0',
  accentColor: '#7e5292',
  defaultCars: 2,
  defaultBounds: [[39.4455,140.4598],[39.7329,141.1568]],
  directionNames: {
    "inbound": "田沢湖・盛岡方面",
    "outbound": "雫石・角館・大曲方面",
    "inboundFull": "上り 田沢湖・盛岡方面",
    "outboundFull": "下り 雫石・角館・大曲方面",
    "inboundShort": "上り (盛岡方面)",
    "outboundShort": "下り (大曲方面)"
},
  stations: TAZAWAKO_STATIONS,
  trackSegments: TAZAWAKO_TRACK_SEGMENTS,
  trainTypes: TAZAWAKO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
