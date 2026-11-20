import type { LineDefinition } from '../../../types';
import { HOKUSO_STATIONS } from './stations';
import { HOKUSO_TRACK_SEGMENTS } from './trackGeometry';
import { HOKUSO_TRAIN_TYPES } from './trainTypes';

export const hokusoLine: LineDefinition = {
  id: 'hokuso',
  name: '北総鉄道北総線',
  shortName: '北総線',
  operator: '北総鉄道',
  area: 'kanto',
  lineColor: '#0080c6',
  accentColor: '#00558c',
  defaultCars: 8,
  defaultBounds: [
    [35.7358, 139.8507],
    [35.8186, 140.2175],
  ],
  directionNames: {
    "inbound": "京成高砂・押上・浅草線方面",
    "outbound": "新鎌ヶ谷・印旛日本医大方面",
    "inboundFull": "上り 京成高砂・押上・浅草線方面",
    "outboundFull": "下り 新鎌ヶ谷・印旛日本医大方面",
    "inboundShort": "京成高砂",
    "outboundShort": "新鎌ヶ谷"
},
  stations: HOKUSO_STATIONS,
  trackSegments: HOKUSO_TRACK_SEGMENTS,
  trainTypes: HOKUSO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
