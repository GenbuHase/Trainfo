import type { LineDefinition } from '../../../types';
import { JR_CHUO_TATSUNO_STATIONS } from './stations';
import { JR_CHUO_TATSUNO_TRACK_SEGMENTS } from './trackGeometry';
import { JR_CHUO_TATSUNO_TRAIN_TYPES } from './trainTypes';

export const jrChuoTatsunoLine: LineDefinition = {
  id: 'jr_chuo_tatsuno',
  name: 'JR中央本線（岡谷～辰野～塩尻）',
  shortName: '中央本線（辰野支線）',
  operator: 'JR東日本',
  area: 'koshinetsu',
  lineColor: '#0072bc',
  accentColor: '#eb5c01',
  defaultCars: 2,
  defaultBounds: [
    [35.9639, 137.9276],
    [36.1345, 138.0648],
  ],
  directionNames: {
    "inbound": "辰野・岡谷方面",
    "outbound": "辰野・塩尻方面",
    "inboundFull": "上り 辰野・岡谷・上諏訪方面",
    "outboundFull": "下り 辰野・塩尻・松本方面",
    "inboundShort": "岡谷方面",
    "outboundShort": "塩尻方面"
},
  stations: JR_CHUO_TATSUNO_STATIONS,
  trackSegments: JR_CHUO_TATSUNO_TRACK_SEGMENTS,
  trainTypes: JR_CHUO_TATSUNO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
