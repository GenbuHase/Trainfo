import type { LineDefinition } from '../../../types';
import { JR_YUMESAKI_STATIONS } from './stations';
import { JR_YUMESAKI_TRAIN_TYPES } from './trainTypes';
import { JR_YUMESAKI_TRACK_SEGMENTS } from './trackGeometry';

export const jrYumesakiLine: LineDefinition = {
  id: 'jr_yumesaki',
  name: 'JRゆめ咲線',
  shortName: 'ゆめ咲線',
  operator: 'JR西日本',
  lineColor: '#001e62',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.6121,135.382],[34.7328,135.5167]],
  directionNames: {
    "inbound": "西九条・大阪環状線方面",
    "outbound": "ユニバーサルシティ・桜島方面",
    "inboundFull": "上り 西九条・大阪方面",
    "outboundFull": "下り ユニバーサルシティ・桜島方面",
    "inboundShort": "西九条方面",
    "outboundShort": "桜島方面"
},
  stations: JR_YUMESAKI_STATIONS,
  trackSegments: JR_YUMESAKI_TRACK_SEGMENTS,
  trainTypes: JR_YUMESAKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
