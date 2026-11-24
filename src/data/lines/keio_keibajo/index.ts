import type { LineDefinition } from '../../../types';
import { KEIO_KEIBAJO_STATIONS } from './stations';
import { KEIO_KEIBAJO_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_KEIBAJO_TRAIN_TYPES } from './trainTypes';

export const keioKeibajoLine: LineDefinition = {
  id: 'keio_keibajo',
  name: '京王競馬場線',
  shortName: '競馬場線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#dd0077',
  accentColor: '#1d2088',
  defaultCars: 8,
  defaultBounds: [
    [35.6534, 139.4695],
    [35.6840, 139.5098],
  ],
  directionNames: {
    "inbound": "東府中方面",
    "outbound": "府中競馬正門前方面",
    "inboundFull": "上り 東府中方面",
    "outboundFull": "下り 府中競馬正門前方面",
    "inboundShort": "上り（東府中方面）",
    "outboundShort": "下り（府中競馬正門前方面）"
},
  stations: KEIO_KEIBAJO_STATIONS,
  trackSegments: KEIO_KEIBAJO_TRACK_SEGMENTS,
  trainTypes: KEIO_KEIBAJO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
