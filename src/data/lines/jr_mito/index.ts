import type { LineDefinition } from '../../../types';
import { JR_MITO_STATIONS } from './stations';
import { JR_MITO_TRACK_SEGMENTS } from './trackGeometry';
import { JR_MITO_TRAIN_TYPES } from './trainTypes';

export const jrMitoLine: LineDefinition = {
  id: 'jr_mito',
  name: 'JR水戸線',
  shortName: '水戸線',
  operator: 'JR東日本',
  area: 'kanto',
  lineColor: '#0071c5',
  accentColor: '#004e8a',
  defaultCars: 5,
  defaultBounds: [
    [36.2809, 139.7909],
    [36.3880, 140.3213],
  ],
  directionNames: {
    "inbound": "下館・小山方面",
    "outbound": "笠間・友部・水戸方面",
    "inboundFull": "上り 下館・小山方面",
    "outboundFull": "下り 笠間・友部・水戸方面",
    "inboundShort": "下館",
    "outboundShort": "笠間"
},
  stations: JR_MITO_STATIONS,
  trackSegments: JR_MITO_TRACK_SEGMENTS,
  trainTypes: JR_MITO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
