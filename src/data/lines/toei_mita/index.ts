import type { LineDefinition } from '../../../types';
import { TOEI_MITA_STATIONS } from './stations';
import { TOEI_MITA_TRACK_SEGMENTS } from './trackGeometry';
import { TOEI_MITA_TRAIN_TYPES } from './trainTypes';

export const toeiMitaLine: LineDefinition = {
  id: 'toei_mita',
  name: '都営三田線',
  shortName: '三田線',
  operator: '東京都交通局',
  area: 'kanto',
  lineColor: '#0079c2',
  accentColor: '#00558a',
  defaultCars: 8,
  defaultBounds: [
    [35.6175, 139.6296],
    [35.8071, 139.7779],
  ],
  directionNames: {
    "inbound": "目黒・東急目黒線方面",
    "outbound": "巣鴨・西高島平方面",
    "inboundFull": "上り 目黒・東急目黒線方面",
    "outboundFull": "下り 巣鴨・西高島平方面",
    "inboundShort": "目黒",
    "outboundShort": "巣鴨"
},
  stations: TOEI_MITA_STATIONS,
  trackSegments: TOEI_MITA_TRACK_SEGMENTS,
  trainTypes: TOEI_MITA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
