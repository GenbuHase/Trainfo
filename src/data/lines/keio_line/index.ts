import type { LineDefinition } from '../../../types';
import { KEIO_LINE_STATIONS } from './stations';
import { KEIO_LINE_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_LINE_TRAIN_TYPES } from './trainTypes';

export const keioLineLine: LineDefinition = {
  id: 'keio_line',
  name: '京王線',
  shortName: '京王線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#dd0077',
  accentColor: '#1d2088',
  defaultCars: 10,
  defaultBounds: [
    [35.6278, 139.3281],
    [35.7045, 139.7142],
  ],
  directionNames: {
    "inbound": "調布・明大前・新宿方面",
    "outbound": "府中・高幡不動・京王八王子方面",
    "inboundFull": "上り 調布・明大前・新宿方面",
    "outboundFull": "下り 府中・高幡不動・京王八王子方面",
    "inboundShort": "調布",
    "outboundShort": "府中"
},
  stations: KEIO_LINE_STATIONS,
  trackSegments: KEIO_LINE_TRACK_SEGMENTS,
  trainTypes: KEIO_LINE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
