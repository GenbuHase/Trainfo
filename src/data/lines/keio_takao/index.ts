import type { LineDefinition } from '../../../types';
import { KEIO_TAKAO_STATIONS } from './stations';
import { KEIO_TAKAO_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_TAKAO_TRAIN_TYPES } from './trainTypes';

export const keioTakaoLine: LineDefinition = {
  id: 'keio_takao',
  name: '京王高尾線',
  shortName: '高尾線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#dd0077',
  accentColor: '#1d2088',
  defaultCars: 10,
  defaultBounds: [
    [35.6178, 139.2551],
    [35.6594, 139.3693],
  ],
  directionNames: {
    "inbound": "北野・新宿方面",
    "outbound": "めじろ台・高尾山口方面",
    "inboundFull": "上り 北野・新宿方面",
    "outboundFull": "下り めじろ台・高尾山口方面",
    "inboundShort": "北野",
    "outboundShort": "めじろ台"
},
  stations: KEIO_TAKAO_STATIONS,
  trackSegments: KEIO_TAKAO_TRACK_SEGMENTS,
  trainTypes: KEIO_TAKAO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
