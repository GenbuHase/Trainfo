import type { LineDefinition } from '../../../types';
import { JR_MINOBU_STATIONS } from './stations';
import { JR_MINOBU_TRAIN_TYPES } from './trainTypes';
import { JR_MINOBU_TRACK_SEGMENTS } from './trackGeometry';

export const jrMinobuLine: LineDefinition = {
  id: 'jr_minobu',
  name: 'JR身延線',
  shortName: '身延線',
  operator: 'JR東海',
  lineColor: '#931b2c',
  accentColor: '#ff7322',
  defaultCars: 3,
  defaultBounds: [[35.1013,138.4021],[35.7172,138.7013]],
  directionNames: {
    "inbound": "富士宮・富士方面",
    "outbound": "身延・甲府方面",
    "inboundFull": "上り 富士宮・富士方面",
    "outboundFull": "下り 身延・甲府方面",
    "inboundShort": "富士方面",
    "outboundShort": "甲府方面"
},
  stations: JR_MINOBU_STATIONS,
  trackSegments: JR_MINOBU_TRACK_SEGMENTS,
  trainTypes: JR_MINOBU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
