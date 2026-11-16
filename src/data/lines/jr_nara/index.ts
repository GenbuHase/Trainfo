import type { LineDefinition } from '../../../types';
import { JR_NARA_STATIONS } from './stations';
import { JR_NARA_TRAIN_TYPES } from './trainTypes';
import { JR_NARA_TRACK_SEGMENTS } from './trackGeometry';

export const jrNaraLine: LineDefinition = {
  id: 'jr_nara',
  name: 'JR奈良線',
  shortName: '奈良線',
  operator: 'JR西日本',
  lineColor: '#996633',
  accentColor: '#ffffff',
  defaultCars: 4,
  defaultBounds: [[34.6306,135.7087],[35.0357,135.8747]],
  directionNames: {
  "inbound": "宇治・京都方面",
  "outbound": "木津・奈良方面",
  "inboundFull": "上り 宇治・京都方面",
  "outboundFull": "下り 木津・奈良方面",
  "inboundShort": "京都方面",
  "outboundShort": "奈良方面"
},
  stations: JR_NARA_STATIONS,
  trackSegments: JR_NARA_TRACK_SEGMENTS,
  trainTypes: JR_NARA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
