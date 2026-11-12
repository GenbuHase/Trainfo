import type { LineDefinition } from '../../../types';
import { JR_CHUO_WEST_STATIONS } from './stations';
import { JR_CHUO_WEST_TRAIN_TYPES } from './trainTypes';
import { JR_CHUO_WEST_TRACK_SEGMENTS } from './trackGeometry';

export const jrChuoWestLine: LineDefinition = {
  id: 'jr_chuo_west',
  name: 'JR中央本線（名古屋～塩尻）',
  shortName: '中央本線（中央西線）',
  operator: 'JR東海',
  lineColor: '#187fc4',
  accentColor: '#ff7322',
  defaultCars: 8,
  defaultBounds: [[35.0927,136.8303],[36.1645,137.9976]],
  directionNames: {
    "inbound": "名古屋方面",
    "outbound": "中津川・塩尻方面",
    "inboundFull": "上り 多治見・名古屋方面",
    "outboundFull": "下り 中津川・木曽福島・塩尻方面",
    "inboundShort": "名古屋方面",
    "outboundShort": "塩尻方面"
},
  stations: JR_CHUO_WEST_STATIONS,
  trackSegments: JR_CHUO_WEST_TRACK_SEGMENTS,
  trainTypes: JR_CHUO_WEST_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
