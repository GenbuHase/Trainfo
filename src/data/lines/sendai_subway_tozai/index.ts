import type { LineDefinition } from '../../../types';
import { SENDAI_SUBWAY_TOZAI_STATIONS } from './stations';
import { SENDAI_SUBWAY_TOZAI_TRACK_SEGMENTS } from './trackGeometry';
import { SENDAI_SUBWAY_TOZAI_TRAIN_TYPES } from './trainTypes';

export const sendaiSubwayTozaiLine: LineDefinition = {
  id: 'sendai_subway_tozai',
  name: '仙台市地下鉄東西線',
  shortName: '地下鉄東西線',
  operator: '仙台市交通局',
  area: 'tohoku',
  lineColor: '#00b1dd',
  accentColor: '#007ea6',
  defaultCars: 4,
  defaultBounds: [[38.2234,140.8153],[38.2809,140.9686]],
  directionNames: {
    "inbound": "仙台・八木山動物公園方面",
    "outbound": "仙台・荒井方面",
    "inboundFull": "西行 仙台・八木山動物公園方面",
    "outboundFull": "東行 仙台・荒井方面",
    "inboundShort": "上り（八木山動物公園方面）",
    "outboundShort": "下り（荒井方面）"
},
  stations: SENDAI_SUBWAY_TOZAI_STATIONS,
  trackSegments: SENDAI_SUBWAY_TOZAI_TRACK_SEGMENTS,
  trainTypes: SENDAI_SUBWAY_TOZAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
