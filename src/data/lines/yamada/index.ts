import type { LineDefinition } from '../../../types';
import { YAMADA_STATIONS } from './stations';
import { YAMADA_TRACK_SEGMENTS } from './trackGeometry';
import { YAMADA_TRAIN_TYPES } from './trainTypes';

export const yamadaLine: LineDefinition = {
  id: 'yamada',
  name: 'JR山田線',
  shortName: '山田線',
  operator: 'JR東日本',
  lineColor: '#a52a2a',
  accentColor: '#7f1d1d',
  defaultCars: 2,
  defaultBounds: [[39.5772,141.1168],[39.7639,141.9675]],
  directionNames: {
    "inbound": "上米内・盛岡方面",
    "outbound": "上米内・茂市・宮古方面",
    "inboundFull": "上り 盛岡方面",
    "outboundFull": "下り 上米内・宮古方面",
    "inboundShort": "上り (盛岡方面)",
    "outboundShort": "下り (宮古方面)"
},
  stations: YAMADA_STATIONS,
  trackSegments: YAMADA_TRACK_SEGMENTS,
  trainTypes: YAMADA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
