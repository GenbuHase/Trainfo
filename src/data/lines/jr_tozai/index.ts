import type { LineDefinition } from '../../../types';
import { JR_TOZAI_STATIONS } from './stations';
import { JR_TOZAI_TRAIN_TYPES } from './trainTypes';
import { JR_TOZAI_TRACK_SEGMENTS } from './trackGeometry';

export const jrTozaiLine: LineDefinition = {
  id: 'jr_tozai',
  name: 'JR東西線',
  shortName: 'JR東西線',
  operator: 'JR西日本',
  lineColor: '#e85298',
  accentColor: '#ffffff',
  defaultCars: 7,
  defaultBounds: [[34.6443,135.3819],[34.7777,135.5839]],
  directionNames: {
    "inbound": "京橋・学研都市線方面",
    "outbound": "尼崎・宝塚・神戸線方面",
    "inboundFull": "上り 京橋・四条畷・同志社前方面",
    "outboundFull": "下り 尼崎・宝塚・三ノ宮方面",
    "inboundShort": "京橋方面",
    "outboundShort": "尼崎方面"
},
  stations: JR_TOZAI_STATIONS,
  trackSegments: JR_TOZAI_TRACK_SEGMENTS,
  trainTypes: JR_TOZAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
