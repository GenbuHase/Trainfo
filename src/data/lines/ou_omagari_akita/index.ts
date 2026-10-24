import type { LineDefinition } from '../../../types';
import { OU_OMAGARI_AKITA_STATIONS } from './stations';
import { OU_OMAGARI_AKITA_TRACK_SEGMENTS } from './trackGeometry';
import { OU_OMAGARI_AKITA_TRAIN_TYPES } from './trainTypes';

export const ouOmagariAkitaLine: LineDefinition = {
  id: 'ou_omagari_akita',
  name: 'JR奥羽本線（大曲～秋田）',
  shortName: '奥羽本線（大曲～秋田）',
  operator: 'JR東日本',
  lineColor: '#ff7e1c',
  accentColor: '#0073bc',
  defaultCars: 4,
  defaultBounds: [[39.4255, 140.0898], [39.7569, 140.5198]],
  directionNames: {
  "inbound": "大曲方面",
  "outbound": "秋田方面",
  "inboundFull": "上り 大曲方面",
  "outboundFull": "下り 秋田方面",
  "inboundShort": "大曲方面",
  "outboundShort": "秋田方面"
},
  stations: OU_OMAGARI_AKITA_STATIONS,
  trackSegments: OU_OMAGARI_AKITA_TRACK_SEGMENTS,
  trainTypes: OU_OMAGARI_AKITA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
