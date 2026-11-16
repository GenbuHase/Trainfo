import type { LineDefinition } from '../../../types';
import { JR_GAKKEN_TOSHI_STATIONS } from './stations';
import { JR_GAKKEN_TOSHI_TRAIN_TYPES } from './trainTypes';
import { JR_GAKKEN_TOSHI_TRACK_SEGMENTS } from './trackGeometry';

export const jrGakkenToshiLine: LineDefinition = {
  id: 'jr_gakken_toshi',
  name: 'JR学研都市線',
  shortName: '学研都市線',
  operator: 'JR西日本',
  lineColor: '#b2d235',
  accentColor: '#ffffff',
  defaultCars: 7,
  defaultBounds: [[34.6381,135.4839],[34.8826,135.8747]],
  directionNames: {
    "inbound": "四条畷・京橋方面",
    "outbound": "松井山手・同志社前・木津方面",
    "inboundFull": "上り 京橋・JR東西線方面",
    "outboundFull": "下り 四条畷・松井山手・同志社前・木津方面",
    "inboundShort": "京橋方面",
    "outboundShort": "木津方面"
},
  stations: JR_GAKKEN_TOSHI_STATIONS,
  trackSegments: JR_GAKKEN_TOSHI_TRACK_SEGMENTS,
  trainTypes: JR_GAKKEN_TOSHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
