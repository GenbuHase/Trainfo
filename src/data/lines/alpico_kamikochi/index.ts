import type { LineDefinition } from '../../../types';
import { ALPICO_KAMIKOCHI_STATIONS } from './stations';
import { ALPICO_KAMIKOCHI_TRACK_SEGMENTS } from './trackGeometry';
import { ALPICO_KAMIKOCHI_TRAIN_TYPES } from './trainTypes';

export const alpicoKamikochiLine: LineDefinition = {
  id: 'alpico_kamikochi',
  name: 'アルピコ交通上高地線',
  shortName: '上高地線',
  operator: 'アルピコ交通',
  area: 'koshinetsu',
  lineColor: '#2e7d32',
  accentColor: '#e65100',
  defaultCars: 2,
  defaultBounds: [
    [36.1700, 137.8021],
    [36.2515, 137.9836],
  ],
  directionNames: {
    "inbound": "松本方面",
    "outbound": "新島々方面",
    "inboundFull": "上り 新村・松本方面",
    "outboundFull": "下り 波田・新島々方面",
    "inboundShort": "松本方面",
    "outboundShort": "新島々方面"
},
  stations: ALPICO_KAMIKOCHI_STATIONS,
  trackSegments: ALPICO_KAMIKOCHI_TRACK_SEGMENTS,
  trainTypes: ALPICO_KAMIKOCHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
