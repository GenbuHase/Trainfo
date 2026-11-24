import type { LineDefinition } from '../../../types';
import { SENDAI_SUBWAY_NAMBOKU_STATIONS } from './stations';
import { SENDAI_SUBWAY_NAMBOKU_TRACK_SEGMENTS } from './trackGeometry';
import { SENDAI_SUBWAY_NAMBOKU_TRAIN_TYPES } from './trainTypes';

export const sendaiSubwayNambokuLine: LineDefinition = {
  id: 'sendai_subway_namboku',
  name: '仙台市地下鉄南北線',
  shortName: '地下鉄南北線',
  operator: '仙台市交通局',
  area: 'tohoku',
  lineColor: '#317c66',
  accentColor: '#007032',
  defaultCars: 4,
  defaultBounds: [[38.1945,140.8488],[38.3432,140.9079]],
  directionNames: {
    "inbound": "仙台・泉中央方面",
    "outbound": "仙台・富沢方面",
    "inboundFull": "北行 仙台・泉中央方面",
    "outboundFull": "南行 仙台・富沢方面",
    "inboundShort": "泉中央方面",
    "outboundShort": "富沢方面"
},
  stations: SENDAI_SUBWAY_NAMBOKU_STATIONS,
  trackSegments: SENDAI_SUBWAY_NAMBOKU_TRACK_SEGMENTS,
  trainTypes: SENDAI_SUBWAY_NAMBOKU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
