import type { LineDefinition } from '../../../types';
import { JR_KANSAI_AIRPORT_STATIONS } from './stations';
import { JR_KANSAI_AIRPORT_TRAIN_TYPES } from './trainTypes';
import { JR_KANSAI_AIRPORT_TRACK_SEGMENTS } from './trackGeometry';

export const jrKansaiAirportLine: LineDefinition = {
  id: 'jr_kansai_airport',
  name: 'JR関西空港線',
  shortName: '関西空港線',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.3411,135.1936],[34.4853,135.3842]],
  directionNames: {
    "inbound": "日根野・天王寺・大阪方面",
    "outbound": "関西空港方面",
    "inboundFull": "上り 日根野・天王寺・大阪方面",
    "outboundFull": "下り りんくうタウン・関西空港方面",
    "inboundShort": "日根野方面",
    "outboundShort": "関西空港方面"
},
  stations: JR_KANSAI_AIRPORT_STATIONS,
  trackSegments: JR_KANSAI_AIRPORT_TRACK_SEGMENTS,
  trainTypes: JR_KANSAI_AIRPORT_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
