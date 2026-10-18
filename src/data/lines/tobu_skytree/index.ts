import type { LineDefinition } from '../../../types';
import { TOBU_SKYTREE_STATIONS } from './stations';
import { TOBU_SKYTREE_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuSkytreeLine: LineDefinition = {
  id: 'tobu_skytree',
  name: '東武スカイツリーライン',
  shortName: 'スカイツリーライン',
  operator: '東武鉄道',
  lineColor: '#226bb8',
  accentColor: '#f39700',
  defaultCars: 10,
  defaultBounds: [[35.7,139.78],[36.03,139.73]],
  directionNames: {
      "inbound": "浅草・押上方面",
      "outbound": "東武動物公園方面",
      "inboundFull": "上り 浅草・押上方面",
      "outboundFull": "下り 東武動物公園方面",
      "inboundShort": "浅草方面",
      "outboundShort": "動物公園方面"
  },
  stations: TOBU_SKYTREE_STATIONS,
  trackSegments: TOBU_SKYTREE_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
