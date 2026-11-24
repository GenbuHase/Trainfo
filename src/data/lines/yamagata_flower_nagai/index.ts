import type { LineDefinition } from '../../../types';
import { YAMAGATA_FLOWER_NAGAI_STATIONS } from './stations';
import { YAMAGATA_FLOWER_NAGAI_TRACK_SEGMENTS } from './trackGeometry';
import { YAMAGATA_FLOWER_NAGAI_TRAIN_TYPES } from './trainTypes';

export const yamagataFlowerNagaiLine: LineDefinition = {
  id: 'yamagata_flower_nagai',
  name: '山形鉄道フラワー長井線',
  shortName: 'フラワー長井線',
  operator: '山形鉄道',
  area: 'tohoku',
  lineColor: '#e85298',
  accentColor: '#07c63e',
  defaultCars: 1,
  defaultBounds: [[38.0278,140.0097],[38.2081,140.1692]],
  directionNames: {
    "inbound": "今泉・赤湯方面",
    "outbound": "長井・荒砥方面",
    "inboundFull": "上り 今泉・赤湯方面",
    "outboundFull": "下り 長井・荒砥方面",
    "inboundShort": "赤湯方面",
    "outboundShort": "荒砥方面"
},
  stations: YAMAGATA_FLOWER_NAGAI_STATIONS,
  trackSegments: YAMAGATA_FLOWER_NAGAI_TRACK_SEGMENTS,
  trainTypes: YAMAGATA_FLOWER_NAGAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
