import type { LineDefinition } from '../../../types';
import { KEIO_INOKASHIRA_STATIONS } from './stations';
import { KEIO_INOKASHIRA_TRACK_SEGMENTS } from './trackGeometry';
import { KEIO_INOKASHIRA_TRAIN_TYPES } from './trainTypes';

export const keioInokashiraLine: LineDefinition = {
  id: 'keio_inokashira',
  name: '京王井の頭線',
  shortName: '井の頭線',
  operator: '京王電鉄',
  area: 'kanto',
  lineColor: '#1d2088',
  accentColor: '#00a0e9',
  defaultCars: 5,
  defaultBounds: [
    [35.6422, 139.5652],
    [35.7175, 139.7151],
  ],
  directionNames: {
    "inbound": "明大前・渋谷方面",
    "outbound": "久我山・吉祥寺方面",
    "inboundFull": "上り 明大前・渋谷方面",
    "outboundFull": "下り 久我山・吉祥寺方面",
    "inboundShort": "明大前",
    "outboundShort": "久我山"
},
  stations: KEIO_INOKASHIRA_STATIONS,
  trackSegments: KEIO_INOKASHIRA_TRACK_SEGMENTS,
  trainTypes: KEIO_INOKASHIRA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
