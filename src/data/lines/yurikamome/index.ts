import type { LineDefinition } from '../../../types';
import { YURIKAMOME_STATIONS } from './stations';
import { YURIKAMOME_TRACK_SEGMENTS } from './trackGeometry';
import { YURIKAMOME_TRAIN_TYPES } from './trainTypes';

export const yurikamomeLine: LineDefinition = {
  id: 'yurikamome',
  name: 'ゆりかもめ',
  shortName: 'ゆりかもめ',
  operator: 'ゆりかもめ',
  area: 'kanto',
  lineColor: '#00b5ad',
  accentColor: '#00827c',
  defaultCars: 6,
  defaultBounds: [
    [35.6025, 139.7429],
    [35.6808, 139.8108],
  ],
  directionNames: {
    "inbound": "新橋方面",
    "outbound": "お台場・有明・豊洲方面",
    "inboundFull": "上り 新橋方面",
    "outboundFull": "下り お台場・有明・豊洲方面",
    "inboundShort": "新橋方面",
    "outboundShort": "お台場"
},
  stations: YURIKAMOME_STATIONS,
  trackSegments: YURIKAMOME_TRACK_SEGMENTS,
  trainTypes: YURIKAMOME_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
