import type { LineDefinition } from '../../../types';
import { JR_HANWA_STATIONS } from './stations';
import { JR_HANWA_TRAIN_TYPES } from './trainTypes';
import { JR_HANWA_TRACK_SEGMENTS } from './trackGeometry';

export const jrHanwaLine: LineDefinition = {
  id: 'jr_hanwa',
  name: 'JR阪和線',
  shortName: '阪和線',
  operator: 'JR西日本',
  lineColor: '#f39800',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.1825,135.1405],[34.6972,135.5738]],
  directionNames: {
    "inbound": "天王寺・大阪方面",
    "outbound": "鳳・日根野・和歌山方面",
    "inboundFull": "上り 天王寺・大阪環状線方面",
    "outboundFull": "下り 鳳・日根野・関西空港・和歌山方面",
    "inboundShort": "天王寺方面",
    "outboundShort": "和歌山方面"
},
  stations: JR_HANWA_STATIONS,
  trackSegments: JR_HANWA_TRACK_SEGMENTS,
  trainTypes: JR_HANWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
