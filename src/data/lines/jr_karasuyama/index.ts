import type { LineDefinition } from '../../../types';
import { JR_KARASUYAMA_STATIONS } from './stations';
import { JR_KARASUYAMA_TRACK_SEGMENTS } from './trackGeometry';
import { JR_KARASUYAMA_TRAIN_TYPES } from './trainTypes';

export const jrKarasuyamaLine: LineDefinition = {
  id: 'jr_karasuyama',
  name: 'JR烏山線',
  shortName: '烏山線',
  operator: 'JR東日本',
  area: 'kanto',
  lineColor: '#ef6c00',
  accentColor: '#2e7d32',
  defaultCars: 2,
  defaultBounds: [
    [36.6165, 139.9645],
    [36.6815, 140.1698],
  ],
  directionNames: {
    "inbound": "宝積寺・宇都宮方面",
    "outbound": "烏山方面",
    "inboundFull": "上り 宝積寺・宇都宮方面",
    "outboundFull": "下り 烏山方面",
    "inboundShort": "宝積寺",
    "outboundShort": "烏山方面"
},
  stations: JR_KARASUYAMA_STATIONS,
  trackSegments: JR_KARASUYAMA_TRACK_SEGMENTS,
  trainTypes: JR_KARASUYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
