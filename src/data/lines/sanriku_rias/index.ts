import type { LineDefinition } from '../../../types';
import { SANRIKU_RIAS_STATIONS } from './stations';
import { SANRIKU_RIAS_TRACK_SEGMENTS } from './trackGeometry';
import { SANRIKU_RIAS_TRAIN_TYPES } from './trainTypes';

export const sanrikuRiasLine: LineDefinition = {
  id: 'sanriku_rias',
  name: '三陸鉄道リアス線',
  shortName: 'リアス線',
  operator: '三陸鉄道',
  area: 'tohoku',
  lineColor: '#005bac',
  accentColor: '#e60012',
  defaultCars: 1,
  defaultBounds: [[39.0342,141.6909],[40.2103,141.994]],
  directionNames: {
    "inbound": "宮古・釜石・盛方面",
    "outbound": "釜石・宮古・久慈方面",
    "inboundFull": "上り 宮古・釜石・盛方面",
    "outboundFull": "下り 釜石・宮古・久慈方面",
    "inboundShort": "上り（盛方面）",
    "outboundShort": "下り（久慈方面）"
},
  stations: SANRIKU_RIAS_STATIONS,
  trackSegments: SANRIKU_RIAS_TRACK_SEGMENTS,
  trainTypes: SANRIKU_RIAS_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
