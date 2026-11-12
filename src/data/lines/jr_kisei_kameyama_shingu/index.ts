import type { LineDefinition } from '../../../types';
import { JR_KISEI_KAMEYAMA_SHINGU_STATIONS } from './stations';
import { JR_KISEI_KAMEYAMA_SHINGU_TRAIN_TYPES } from './trainTypes';
import { JR_KISEI_KAMEYAMA_SHINGU_TRACK_SEGMENTS } from './trackGeometry';

export const jrKiseiKameyamaShinguLine: LineDefinition = {
  id: 'jr_kisei_kameyama_shingu',
  name: 'JR紀勢本線（亀山～新宮）',
  shortName: '紀勢本線（亀山～新宮）',
  operator: 'JR東海',
  lineColor: '#ff7322',
  accentColor: '#00a7db',
  defaultCars: 4,
  defaultBounds: [[33.6758,135.9422],[34.9017,136.6244]],
  directionNames: {
    "inbound": "津・亀山方面",
    "outbound": "松阪・尾鷲・新宮方面",
    "inboundFull": "上り 津・亀山方面",
    "outboundFull": "下り 松阪・尾鷲・新宮方面",
    "inboundShort": "亀山方面",
    "outboundShort": "新宮方面"
},
  stations: JR_KISEI_KAMEYAMA_SHINGU_STATIONS,
  trackSegments: JR_KISEI_KAMEYAMA_SHINGU_TRACK_SEGMENTS,
  trainTypes: JR_KISEI_KAMEYAMA_SHINGU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
