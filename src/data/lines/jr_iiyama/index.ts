import type { LineDefinition } from '../../../types';
import { JR_IIYAMA_STATIONS } from './stations';
import { JR_IIYAMA_TRACK_SEGMENTS } from './trackGeometry';
import { JR_IIYAMA_TRAIN_TYPES } from './trainTypes';

export const jrIiyamaLine: LineDefinition = {
  id: 'jr_iiyama',
  name: 'JR飯山線',
  shortName: '飯山線',
  operator: 'JR東日本',
  area: 'koshinetsu',
  lineColor: '#7cbb42',
  accentColor: '#4b8b1b',
  defaultCars: 2,
  defaultBounds: [
    [36.6909, 138.2553],
    [37.2929, 138.8820],
  ],
  directionNames: {
    "inbound": "長野・豊野方面",
    "outbound": "十日町・越後川口方面",
    "inboundFull": "上り 飯山・豊野・長野方面",
    "outboundFull": "下り 戸狩野沢温泉・十日町・越後川口方面",
    "inboundShort": "豊野方面",
    "outboundShort": "越後川口方面"
},
  stations: JR_IIYAMA_STATIONS,
  trackSegments: JR_IIYAMA_TRACK_SEGMENTS,
  trainTypes: JR_IIYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
