import type { LineDefinition } from '../../../types';
import { OFUNATO_BRT_STATIONS } from './stations';
import { OFUNATO_BRT_TRACK_SEGMENTS } from './trackGeometry';
import { OFUNATO_BRT_TRAIN_TYPES } from './trainTypes';

export const ofunatoBrtLine: LineDefinition = {
  id: 'ofunato_brt',
  name: 'JR大船渡線BRT',
  shortName: '大船渡線BRT',
  operator: 'JR東日本',
  lineColor: '#ea580c',
  accentColor: '#c2410c',
  defaultCars: 1,
  defaultBounds: [[38.8888,141.5393],[39.1059,141.7412]],
  directionNames: {
    "inbound": "陸前高田・気仙沼方面",
    "outbound": "陸前高田・大船渡・盛 / 上鹿折 / 陸前矢作方面",
    "inboundFull": "上り 陸前高田・気仙沼方面",
    "outboundFull": "下り 盛・上鹿折・陸前矢作方面",
    "inboundShort": "上り (気仙沼方面)",
    "outboundShort": "下り (盛・矢作・上鹿折方面)"
},
  stations: OFUNATO_BRT_STATIONS,
  trackSegments: OFUNATO_BRT_TRACK_SEGMENTS,
  trainTypes: OFUNATO_BRT_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
