import type { LineDefinition } from '../../../types';
import { JR_KISHIN_STATIONS } from './stations';
import { JR_KISHIN_TRAIN_TYPES } from './trainTypes';
import { JR_KISHIN_TRACK_SEGMENTS } from './trackGeometry';

export const jrKishinLine: LineDefinition = {
  id: 'jr_kishin',
  name: 'JR姫新線',
  shortName: '姫新線',
  operator: 'JR西日本',
  lineColor: '#e83929',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[34.7776,134.2725],[35.0537,134.7404]],
  directionNames: {
  "inbound": "播磨新宮・姫路方面",
  "outbound": "佐用・上月方面",
  "inboundFull": "上り 播磨新宮・姫路方面",
  "outboundFull": "下り 佐用・上月方面",
  "inboundShort": "姫路方面",
  "outboundShort": "上月方面"
},
  stations: JR_KISHIN_STATIONS,
  trackSegments: JR_KISHIN_TRACK_SEGMENTS,
  trainTypes: JR_KISHIN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
