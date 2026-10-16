import type { LineDefinition } from '../../../types';
import { TADAMI_STATIONS } from './stations';
import { TADAMI_TRACK_SEGMENTS } from './trackGeometry';
import { TADAMI_TRAIN_TYPES } from './trainTypes';

export const tadamiLine: LineDefinition = {
  id: 'tadami',
  name: 'JR只見線',
  shortName: '只見線',
  operator: 'JR東日本',
  lineColor: '#0081b8',
  accentColor: '#2e8b57',
  defaultCars: 2,
  defaultBounds: [
    [37.15, 138.90],
    [37.58, 140.00],
  ],
  directionNames: {
    inbound: '会津若松方面',
    outbound: '小出方面',
    inboundFull: '上り 会津川口・会津若松方面',
    outboundFull: '下り 只見・小出方面',
    inboundShort: '会津若松方面',
    outboundShort: '小出方面',
  },
  stations: TADAMI_STATIONS,
  trackSegments: TADAMI_TRACK_SEGMENTS,
  trainTypes: TADAMI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
