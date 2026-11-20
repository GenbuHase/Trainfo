import type { LineDefinition } from '../../../types';
import { TOKYU_TAMAGAWA_STATIONS } from './stations';
import { TOKYU_TAMAGAWA_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_TAMAGAWA_TRAIN_TYPES } from './trainTypes';

export const tokyuTamagawaLine: LineDefinition = {
  id: 'tokyu_tamagawa',
  name: '東急多摩川線',
  shortName: '東急多摩川線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#ae0378',
  accentColor: '#800258',
  defaultCars: 3,
  defaultBounds: [
    [35.5467, 139.6539],
    [35.6039, 139.7298],
  ],
  directionNames: {
    "inbound": "多摩川方面",
    "outbound": "蒲田方面",
    "inboundFull": "上り 多摩川方面",
    "outboundFull": "下り 蒲田方面",
    "inboundShort": "多摩川方面",
    "outboundShort": "蒲田方面"
},
  stations: TOKYU_TAMAGAWA_STATIONS,
  trackSegments: TOKYU_TAMAGAWA_TRACK_SEGMENTS,
  trainTypes: TOKYU_TAMAGAWA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
