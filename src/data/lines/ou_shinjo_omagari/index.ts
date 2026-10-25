import type { LineDefinition } from '../../../types';
import { OU_SHINJO_OMAGARI_STATIONS } from './stations';
import { OU_SHINJO_OMAGARI_TRACK_SEGMENTS } from './trackGeometry';
import { OU_SHINJO_OMAGARI_TRAIN_TYPES } from './trainTypes';

export const ouShinjoOmagariLine: LineDefinition = {
  id: 'ou_shinjo_omagari',
  name: 'JR奥羽本線（新庄～大曲）',
  shortName: '奥羽本線（新庄～大曲）',
  operator: 'JR東日本',
  lineColor: '#ff7e1c',
  accentColor: '#0073bc',
  defaultCars: 2,
  defaultBounds: [[38.7226, 140.2022], [39.5055, 140.6005]],
  directionNames: {
  "inbound": "新庄方面",
  "outbound": "大曲方面",
  "inboundFull": "上り 新庄方面",
  "outboundFull": "下り 大曲方面",
  "inboundShort": "新庄方面",
  "outboundShort": "大曲方面"
},
  stations: OU_SHINJO_OMAGARI_STATIONS,
  trackSegments: OU_SHINJO_OMAGARI_TRACK_SEGMENTS,
  trainTypes: OU_SHINJO_OMAGARI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
