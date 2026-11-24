import type { LineDefinition } from '../../../types';
import { KEIO_NEW_STATIONS } from './stations';
import { KEIO_NEW_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_NEW_TRAIN_TYPES } from './trainTypes';

export const keioNewLine: LineDefinition = {
  id: 'keio_new',
  name: '京王新線',
  shortName: '京王新線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#dd0077',
  accentColor: '#6cbb5a',
  defaultCars: 10,
  defaultBounds: [
    [35.6584, 139.6515],
    [35.7045, 139.7142],
  ],
  directionNames: {
    "inbound": "新宿・都営新宿線方面",
    "outbound": "幡ヶ谷・笹塚・橋本方面",
    "inboundFull": "上り 新宿・都営新宿線方面",
    "outboundFull": "下り 幡ヶ谷・笹塚・橋本方面",
    "inboundShort": "上り（新宿方面）",
    "outboundShort": "下り（笹塚・橋本方面）"
},
  stations: KEIO_NEW_STATIONS,
  trackSegments: KEIO_NEW_TRACK_SEGMENTS,
  trainTypes: KEIO_NEW_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
