import type { LineDefinition } from '../../../types';
import { JR_OSAKA_HIGASHI_STATIONS } from './stations';
import { JR_OSAKA_HIGASHI_TRAIN_TYPES } from './trainTypes';
import { JR_OSAKA_HIGASHI_TRACK_SEGMENTS } from './trackGeometry';

export const jrOsakaHigashiLine: LineDefinition = {
  id: 'jr_osaka_higashi',
  name: 'JRおおさか東線',
  shortName: 'おおさか東線',
  operator: 'JR西日本',
  lineColor: '#384c97',
  accentColor: '#ffffff',
  defaultCars: 6,
  defaultBounds: [[34.5725,135.446],[34.7995,135.6347]],
  directionNames: {
    "inbound": "新大阪・大阪方面",
    "outbound": "放出・久宝寺方面",
    "inboundFull": "上り 新大阪・大阪方面",
    "outboundFull": "下り 放出・久宝寺・奈良方面",
    "inboundShort": "大阪方面",
    "outboundShort": "久宝寺方面"
},
  stations: JR_OSAKA_HIGASHI_STATIONS,
  trackSegments: JR_OSAKA_HIGASHI_TRACK_SEGMENTS,
  trainTypes: JR_OSAKA_HIGASHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
