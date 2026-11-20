import type { LineDefinition } from '../../../types';
import { JR_KASHIMA_STATIONS } from './stations';
import { JR_KASHIMA_TRACK_SEGMENTS } from './trackGeometry';
import { JR_KASHIMA_TRAIN_TYPES } from './trainTypes';

export const jrKashimaLine: LineDefinition = {
  id: 'jr_kashima',
  name: 'JR鹿島線',
  shortName: '鹿島線',
  operator: 'JR東日本',
  area: 'kanto',
  lineColor: '#c56e2e',
  accentColor: '#8d4b1b',
  defaultCars: 4,
  defaultBounds: [
    [35.8830, 140.5187],
    [36.0084, 140.6508],
  ],
  directionNames: {
    "inbound": "香取・佐原・千葉方面",
    "outbound": "鹿島神宮・鹿島サッカースタジアム方面",
    "inboundFull": "上り 香取・佐原・千葉方面",
    "outboundFull": "下り 鹿島神宮・鹿島サッカースタジアム方面",
    "inboundShort": "香取",
    "outboundShort": "鹿島神宮"
},
  stations: JR_KASHIMA_STATIONS,
  trackSegments: JR_KASHIMA_TRACK_SEGMENTS,
  trainTypes: JR_KASHIMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
