import type { LineDefinition } from '../../../types';
import { SHINANO_SHINANO_STATIONS } from './stations';
import { SHINANO_SHINANO_TRACK_SEGMENTS } from './trackGeometry';
import { SHINANO_SHINANO_TRAIN_TYPES } from './trainTypes';

export const shinanoLine: LineDefinition = {
  id: 'shinano_shinano',
  name: 'しなの鉄道線',
  shortName: 'しなの鉄道線',
  operator: 'しなの鉄道',
  area: 'koshinetsu',
  lineColor: '#f0a401',
  accentColor: '#0066cc',
  defaultCars: 3,
  defaultBounds: [
    [36.2885, 138.1084],
    [36.6632, 138.6554],
  ],
  directionNames: {
    "inbound": "上田・軽井沢方面",
    "outbound": "篠ノ井・長野方面",
    "inboundFull": "上り 上田・小諸・軽井沢方面",
    "outboundFull": "下り 戸倉・篠ノ井・長野方面",
    "inboundShort": "軽井沢方面",
    "outboundShort": "長野方面"
},
  stations: SHINANO_SHINANO_STATIONS,
  trackSegments: SHINANO_SHINANO_TRACK_SEGMENTS,
  trainTypes: SHINANO_SHINANO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
