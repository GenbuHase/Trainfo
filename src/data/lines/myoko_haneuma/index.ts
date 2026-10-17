import type { LineDefinition } from '../../../types';
import { MYOKO_HANEUMA_STATIONS } from './stations';
import { MYOKO_HANEUMA_TRACK_SEGMENTS } from './trackGeometry';
import { MYOKO_HANEUMA_TRAIN_TYPES } from './trainTypes';

export const myokoHaneumaLine: LineDefinition = {
  id: 'myoko_haneuma',
  name: 'えちごトキめき鉄道妙高はねうまライン',
  shortName: '妙高はねうまライン',
  operator: 'えちごトキめき鉄道',
  lineColor: '#8cc63f',
  accentColor: '#00a0e9',
  defaultCars: 2,
  defaultBounds: [
    [36.823, 138.162],
    [37.220, 138.308],
  ],
  directionNames: {
    inbound: '妙高高原方面',
    outbound: '直江津方面',
    inboundFull: '上り 妙高高原方面',
    outboundFull: '下り 新井・高田・直江津方面',
    inboundShort: '妙高高原方面',
    outboundShort: '直江津方面',
  },
  stations: MYOKO_HANEUMA_STATIONS,
  trackSegments: MYOKO_HANEUMA_TRACK_SEGMENTS,
  trainTypes: MYOKO_HANEUMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
