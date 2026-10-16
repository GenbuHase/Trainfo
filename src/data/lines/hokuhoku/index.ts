import type { LineDefinition } from '../../../types';
import { HOKUHOKU_STATIONS } from './stations';
import { HOKUHOKU_TRACK_SEGMENTS } from './trackGeometry';
import { HOKUHOKU_TRAIN_TYPES } from './trainTypes';

export const hokuhokuLine: LineDefinition = {
  id: 'hokuhoku',
  name: '北越急行ほくほく線',
  shortName: 'ほくほく線',
  operator: '北越急行',
  lineColor: '#005bac',
  accentColor: '#e60012',
  defaultCars: 2,
  defaultBounds: [
    [37.017, 138.256],
    [37.260, 138.927],
  ],
  directionNames: {
    inbound: '六日町・越後湯沢方面',
    outbound: '犀潟・直江津方面',
    inboundFull: '上り 十日町・六日町・越後湯沢方面',
    outboundFull: '下り まつだい・犀潟・直江津方面',
    inboundShort: '六日町方面',
    outboundShort: '犀潟・直江津方面',
  },
  stations: HOKUHOKU_STATIONS,
  trackSegments: HOKUHOKU_TRACK_SEGMENTS,
  trainTypes: HOKUHOKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
