import type { LineDefinition } from '../../../types';
import { GOTEMBA_STATIONS } from './stations';
import { GOTEMBA_TRAIN_TYPES } from './trainTypes';
import { GOTEMBA_TRACK_SEGMENTS } from './trackGeometry';

export const gotembaLine: LineDefinition = {
  id: 'gotemba',
  name: 'JR御殿場線',
  shortName: '御殿場線',
  operator: 'JR東海',
  lineColor: '#449f44',
  accentColor: '#f39800',
  defaultCars: 3,
  defaultBounds: [[35.0769,138.8238],[35.3917,139.2497]],
  directionNames: {
  "inbound": "国府津方面",
  "outbound": "沼津方面",
  "inboundFull": "上り 国府津方面",
  "outboundFull": "下り 沼津方面",
  "inboundShort": "国府津方面",
  "outboundShort": "沼津方面"
},
  stations: GOTEMBA_STATIONS,
  trackSegments: GOTEMBA_TRACK_SEGMENTS,
  trainTypes: GOTEMBA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
