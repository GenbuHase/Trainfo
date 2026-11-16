import type { LineDefinition } from '../../../types';
import { JR_TAKARAZUKA_STATIONS } from './stations';
import { JR_TAKARAZUKA_TRAIN_TYPES } from './trainTypes';
import { JR_TAKARAZUKA_TRACK_SEGMENTS } from './trackGeometry';

export const jrTakarazukaLine: LineDefinition = {
  id: 'jr_takarazuka',
  name: 'JR宝塚線',
  shortName: '宝塚線',
  operator: 'JR西日本',
  lineColor: '#fcc800',
  accentColor: '#ffffff',
  defaultCars: 7,
  defaultBounds: [[34.6694,135.1024],[35.1069,135.4819]],
  directionNames: {
    "inbound": "尼崎・大阪方面",
    "outbound": "宝塚・三田・篠山口方面",
    "inboundFull": "上り 尼崎・大阪・JR東西線方面",
    "outboundFull": "下り 宝塚・三田・篠山口方面",
    "inboundShort": "尼崎方面",
    "outboundShort": "篠山口方面"
},
  stations: JR_TAKARAZUKA_STATIONS,
  trackSegments: JR_TAKARAZUKA_TRACK_SEGMENTS,
  trainTypes: JR_TAKARAZUKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
