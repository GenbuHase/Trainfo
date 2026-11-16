import type { LineDefinition } from '../../../types';
import { JR_KOSEI_STATIONS } from './stations';
import { JR_KOSEI_TRAIN_TYPES } from './trainTypes';
import { JR_KOSEI_TRACK_SEGMENTS } from './trackGeometry';

export const jrKoseiLine: LineDefinition = {
  id: 'jr_kosei',
  name: 'JR湖西線',
  shortName: '湖西線',
  operator: 'JR西日本',
  lineColor: '#00a0e9',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.9426,135.7651],[35.5983,136.1958]],
  directionNames: {
  "inbound": "京都・大阪方面",
  "outbound": "近江今津・近江塩津・敦賀方面",
  "inboundFull": "上り 京都・大阪方面",
  "outboundFull": "下り 近江今津・近江塩津・敦賀方面",
  "inboundShort": "京都方面",
  "outboundShort": "近江塩津方面"
},
  stations: JR_KOSEI_STATIONS,
  trackSegments: JR_KOSEI_TRACK_SEGMENTS,
  trainTypes: JR_KOSEI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
