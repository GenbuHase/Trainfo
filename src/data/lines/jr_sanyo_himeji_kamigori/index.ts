import type { LineDefinition } from '../../../types';
import { JR_SANYO_HIMEJI_KAMIGORI_STATIONS } from './stations';
import { JR_SANYO_HIMEJI_KAMIGORI_TRAIN_TYPES } from './trainTypes';
import { JR_SANYO_HIMEJI_KAMIGORI_TRACK_SEGMENTS } from './trackGeometry';

export const jrSanyoHimejiKamigoriLine: LineDefinition = {
  id: 'jr_sanyo_himeji_kamigori',
  name: 'JR山陽本線（姫路～上郡）',
  shortName: '山陽本線（姫路～上郡）',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.7602,134.3033],[34.9161,134.7408]],
  directionNames: {
  "inbound": "姫路・神戸・大阪方面",
  "outbound": "相生・上郡・岡山方面",
  "inboundFull": "上り 姫路・神戸・大阪方面",
  "outboundFull": "下り 相生・上郡・岡山方面",
  "inboundShort": "姫路方面",
  "outboundShort": "上郡方面"
},
  stations: JR_SANYO_HIMEJI_KAMIGORI_STATIONS,
  trackSegments: JR_SANYO_HIMEJI_KAMIGORI_TRACK_SEGMENTS,
  trainTypes: JR_SANYO_HIMEJI_KAMIGORI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
