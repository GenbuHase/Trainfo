import type { LineDefinition } from '../../../types';
import { HOKURIKU_SHINKANSEN_STATIONS } from './stations';
import { HOKURIKU_SHINKANSEN_TRACK_SEGMENTS } from './trackGeometry';
import { HOKURIKU_SHINKANSEN_TRAIN_TYPES } from './trainTypes';

export const hokurikuShinkansenLine: LineDefinition = {
  id: 'hokuriku_shinkansen',
  name: 'JR北陸新幹線',
  shortName: '北陸新幹線',
  operator: 'JR東日本',
  lineColor: '#c5a059',
  accentColor: '#0078b6',
  defaultCars: 12,
  defaultBounds: [
    [35.595, 136.028],
    [37.131, 139.827],
  ],
  directionNames: {
    inbound: '東京方面',
    outbound: '長野・金沢・敦賀方面',
    inboundFull: '上り 長野・大宮・東京方面',
    outboundFull: '下り 長野・富山・金沢・敦賀方面',
    inboundShort: '東京方面',
    outboundShort: '金沢・敦賀方面',
  },
  stations: HOKURIKU_SHINKANSEN_STATIONS,
  trackSegments: HOKURIKU_SHINKANSEN_TRACK_SEGMENTS,
  trainTypes: HOKURIKU_SHINKANSEN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
