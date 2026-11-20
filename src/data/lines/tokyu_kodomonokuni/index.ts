import type { LineDefinition } from '../../../types';
import { TOKYU_KODOMONOKUNI_STATIONS } from './stations';
import { TOKYU_KODOMONOKUNI_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_KODOMONOKUNI_TRAIN_TYPES } from './trainTypes';

export const tokyuKodomonokuniLine: LineDefinition = {
  id: 'tokyu_kodomonokuni',
  name: '東急こどもの国線',
  shortName: 'こどもの国線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#0068b7',
  accentColor: '#004b85',
  defaultCars: 2,
  defaultBounds: [
    [35.5170, 139.4716],
    [35.5734, 139.5078],
  ],
  directionNames: {
    "inbound": "長津田方面",
    "outbound": "こどもの国方面",
    "inboundFull": "上り 長津田方面",
    "outboundFull": "下り こどもの国方面",
    "inboundShort": "長津田方面",
    "outboundShort": "こどもの国方面"
},
  stations: TOKYU_KODOMONOKUNI_STATIONS,
  trackSegments: TOKYU_KODOMONOKUNI_TRACK_SEGMENTS,
  trainTypes: TOKYU_KODOMONOKUNI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
