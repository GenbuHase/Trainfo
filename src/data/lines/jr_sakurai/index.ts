import type { LineDefinition } from '../../../types';
import { JR_SAKURAI_STATIONS } from './stations';
import { JR_SAKURAI_TRAIN_TYPES } from './trainTypes';
import { JR_SAKURAI_TRACK_SEGMENTS } from './trackGeometry';

export const jrSakuraiLine: LineDefinition = {
  id: 'jr_sakurai',
  name: 'JR万葉まほろば線',
  shortName: '万葉まほろば線',
  operator: 'JR西日本',
  lineColor: '#be0049',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[34.4582,135.6946],[34.7306,135.8984]],
  directionNames: {
  "inbound": "天理・奈良方面",
  "outbound": "桜井・高田・王寺方面",
  "inboundFull": "上り 天理・奈良方面",
  "outboundFull": "下り 桜井・高田・王寺方面",
  "inboundShort": "奈良方面",
  "outboundShort": "高田方面"
},
  stations: JR_SAKURAI_STATIONS,
  trackSegments: JR_SAKURAI_TRACK_SEGMENTS,
  trainTypes: JR_SAKURAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
