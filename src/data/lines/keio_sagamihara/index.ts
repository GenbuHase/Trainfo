import type { LineDefinition } from '../../../types';
import { KEIO_SAGAMIHARA_STATIONS } from './stations';
import { KEIO_SAGAMIHARA_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_SAGAMIHARA_TRAIN_TYPES } from './trainTypes';

export const keioSagamiharaLine: LineDefinition = {
  id: 'keio_sagamihara',
  name: '京王相模原線',
  shortName: '相模原線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#dd0077',
  accentColor: '#1d2088',
  defaultCars: 10,
  defaultBounds: [
    [35.5807, 139.3277],
    [35.6664, 139.5609],
  ],
  directionNames: {
    "inbound": "調布・新宿方面",
    "outbound": "京王多摩センター・橋本方面",
    "inboundFull": "上り 調布・新宿方面",
    "outboundFull": "下り 京王多摩センター・橋本方面",
    "inboundShort": "調布",
    "outboundShort": "京王多摩センター"
},
  stations: KEIO_SAGAMIHARA_STATIONS,
  trackSegments: KEIO_SAGAMIHARA_TRACK_SEGMENTS,
  trainTypes: KEIO_SAGAMIHARA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
