import type { LineDefinition } from '../../../types';
import { JR_BANTAN_STATIONS } from './stations';
import { JR_BANTAN_TRAIN_TYPES } from './trainTypes';
import { JR_BANTAN_TRACK_SEGMENTS } from './trackGeometry';

export const jrBantanLine: LineDefinition = {
  id: 'jr_bantan',
  name: 'JR播但線',
  shortName: '播但線',
  operator: 'JR西日本',
  lineColor: '#a22041',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[34.7776,134.6404],[35.3914,134.9014]],
  directionNames: {
  "inbound": "福崎・姫路方面",
  "outbound": "寺前・生野・和田山方面",
  "inboundFull": "上り 福崎・姫路方面",
  "outboundFull": "下り 寺前・生野・和田山方面",
  "inboundShort": "姫路方面",
  "outboundShort": "和田山方面"
},
  stations: JR_BANTAN_STATIONS,
  trackSegments: JR_BANTAN_TRACK_SEGMENTS,
  trainTypes: JR_BANTAN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
