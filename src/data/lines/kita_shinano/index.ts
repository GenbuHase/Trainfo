import type { LineDefinition } from '../../../types';
import { KITA_SHINANO_STATIONS } from './stations';
import { KITA_SHINANO_TRACK_SEGMENTS } from './trackGeometry';
import { KITA_SHINANO_TRAIN_TYPES } from './trainTypes';

export const kitaShinanoLine: LineDefinition = {
  id: 'kita_shinano',
  name: 'しなの鉄道北しなの線',
  shortName: '北しなの線',
  operator: 'しなの鉄道',
  lineColor: '#c8102e',
  accentColor: '#0066cc',
  defaultCars: 3,
  defaultBounds: [
    [36.594, 138.140],
    [36.923, 138.325],
  ],
  directionNames: {
    inbound: '長野方面',
    outbound: '妙高高原方面',
    inboundFull: '上り 豊野・長野方面',
    outboundFull: '下り 黒姫・妙高高原方面',
    inboundShort: '長野方面',
    outboundShort: '妙高高原方面',
  },
  stations: KITA_SHINANO_STATIONS,
  trackSegments: KITA_SHINANO_TRACK_SEGMENTS,
  trainTypes: KITA_SHINANO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
