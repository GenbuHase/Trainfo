import type { LineDefinition } from '../../../types';
import { JR_KUSATSU_STATIONS } from './stations';
import { JR_KUSATSU_TRAIN_TYPES } from './trainTypes';
import { JR_KUSATSU_TRACK_SEGMENTS } from './trackGeometry';

export const jrKusatsuLine: LineDefinition = {
  id: 'jr_kusatsu',
  name: 'JR草津線',
  shortName: '草津線',
  operator: 'JR西日本',
  lineColor: '#74a034',
  accentColor: '#ffffff',
  defaultCars: 4,
  defaultBounds: [[34.7968,135.9121],[35.0774,136.3062]],
  directionNames: {
  "inbound": "貴生川・柘植方面",
  "outbound": "草津・京都方面",
  "inboundFull": "上り 貴生川・柘植方面",
  "outboundFull": "下り 草津・京都方面",
  "inboundShort": "柘植方面",
  "outboundShort": "草津方面"
},
  stations: JR_KUSATSU_STATIONS,
  trackSegments: JR_KUSATSU_TRACK_SEGMENTS,
  trainTypes: JR_KUSATSU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
