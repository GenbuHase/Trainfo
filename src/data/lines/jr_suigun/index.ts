import type { LineDefinition } from '../../../types';
import { JR_SUIGUN_STATIONS } from './stations';
import { JR_SUIGUN_TRACK_SEGMENTS } from './trackGeometry';
import { JR_SUIGUN_TRAIN_TYPES } from './trainTypes';

export const jrSuigunLine: LineDefinition = {
  id: 'jr_suigun',
  name: 'JR水郡線',
  shortName: '水郡線',
  operator: 'JR東日本',
  area: 'kanto',
  lineColor: '#2e7d32',
  accentColor: '#1b5e20',
  defaultCars: 2,
  defaultBounds: [
    [36.3559, 140.3355],
    [37.4141, 140.5429],
  ],
  directionNames: {
    "inbound": "常陸大子・水戸方面",
    "outbound": "常陸太田・郡山方面",
    "inboundFull": "上り 常陸大子・水戸方面",
    "outboundFull": "下り 常陸太田・郡山方面",
    "inboundShort": "上り（水戸方面）",
    "outboundShort": "下り（常陸太田・郡山方面）"
},
  stations: JR_SUIGUN_STATIONS,
  trackSegments: JR_SUIGUN_TRACK_SEGMENTS,
  trainTypes: JR_SUIGUN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
