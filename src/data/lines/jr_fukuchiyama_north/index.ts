import type { LineDefinition } from '../../../types';
import { JR_FUKUCHIYAMA_NORTH_STATIONS } from './stations';
import { JR_FUKUCHIYAMA_NORTH_TRAIN_TYPES } from './trainTypes';
import { JR_FUKUCHIYAMA_NORTH_TRACK_SEGMENTS } from './trackGeometry';

export const jrFukuchiyamaNorthLine: LineDefinition = {
  id: 'jr_fukuchiyama_north',
  name: 'JR福知山線（篠山口～福知山）',
  shortName: '福知山線（篠山口～福知山）',
  operator: 'JR西日本',
  lineColor: '#fcc800',
  accentColor: '#ffffff',
  defaultCars: 4,
  defaultBounds: [[35.0069,134.9991],[35.3458,135.2264]],
  directionNames: {
    "inbound": "篠山口・宝塚方面",
    "outbound": "谷川・福知山方面",
    "inboundFull": "上り 篠山口・三田・宝塚方面",
    "outboundFull": "下り 谷川・柏原・福知山方面",
    "inboundShort": "篠山口方面",
    "outboundShort": "福知山方面"
},
  stations: JR_FUKUCHIYAMA_NORTH_STATIONS,
  trackSegments: JR_FUKUCHIYAMA_NORTH_TRACK_SEGMENTS,
  trainTypes: JR_FUKUCHIYAMA_NORTH_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
