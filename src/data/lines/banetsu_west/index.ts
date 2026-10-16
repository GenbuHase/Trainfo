import type { LineDefinition } from '../../../types';
import { BANETSU_WEST_STATIONS } from './stations';
import { BANETSU_WEST_TRACK_SEGMENTS } from './trackGeometry';
import { BANETSU_WEST_TRAIN_TYPES } from './trainTypes';

export const banetsuWestLine: LineDefinition = {
  id: 'banetsu_west',
  name: 'JR磐越西線',
  shortName: '磐越西線',
  operator: 'JR東日本',
  lineColor: '#bc6e23',
  accentColor: '#c53030',
  defaultCars: 2,
  defaultBounds: [
    [37.35, 139.05],
    [37.82, 140.42],
  ],
  directionNames: {
    inbound: '郡山方面',
    outbound: '新津方面',
    inboundFull: '上り 猪苗代・郡山方面',
    outboundFull: '下り 会津若松・新津方面',
    inboundShort: '郡山方面',
    outboundShort: '新津方面',
  },
  stations: BANETSU_WEST_STATIONS,
  trackSegments: BANETSU_WEST_TRACK_SEGMENTS,
  trainTypes: BANETSU_WEST_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
