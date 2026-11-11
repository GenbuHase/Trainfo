import type { LineDefinition } from '../../../types';
import { OGA_STATIONS } from './stations';
import { OGA_TRACK_SEGMENTS } from './trackGeometry';
import { OGA_TRAIN_TYPES } from './trainTypes';

export const ogaLine: LineDefinition = {
  id: 'oga',
  name: 'JR男鹿線',
  shortName: '男鹿線',
  operator: 'JR東日本',
  lineColor: '#008000',
  accentColor: '#005a00',
  defaultCars: 2,
  defaultBounds: [[39.7899,139.8287],[39.9352,140.0779]],
  directionNames: {
    "inbound": "追分・秋田方面",
    "outbound": "男鹿方面",
    "inboundFull": "上り 追分・秋田方面",
    "outboundFull": "下り 男鹿方面",
    "inboundShort": "上り (追分・秋田方面)",
    "outboundShort": "下り (男鹿方面)"
},
  stations: OGA_STATIONS,
  trackSegments: OGA_TRACK_SEGMENTS,
  trainTypes: OGA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
