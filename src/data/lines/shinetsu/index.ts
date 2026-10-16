import type { LineDefinition } from '../../../types';
import { SHINETSU_STATIONS } from './stations';
import { SHINETSU_TRACK_SEGMENTS } from './trackGeometry';
import { SHINETSU_TRAIN_TYPES } from './trainTypes';

export const shinetsuLine: LineDefinition = {
  id: 'shinetsu',
  name: 'JR信越本線',
  shortName: '信越本線',
  operator: 'JR東日本',
  lineColor: '#00acd1',
  accentColor: '#f18d00',
  defaultCars: 4,
  defaultBounds: [
    [37.15, 138.20],
    [37.95, 139.15],
  ],
  directionNames: {
    inbound: '直江津方面',
    outbound: '新潟方面',
    inboundFull: '上り 長岡・直江津方面',
    outboundFull: '下り 新津・新潟方面',
    inboundShort: '直江津方面',
    outboundShort: '新潟方面',
  },
  stations: SHINETSU_STATIONS,
  trackSegments: SHINETSU_TRACK_SEGMENTS,
  trainTypes: SHINETSU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
