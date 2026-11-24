import type { LineDefinition } from '../../../types';
import { KEIKYU_AIRPORT_STATIONS } from './stations';
import { KEIKYU_AIRPORT_TRACK_SEGMENTS } from './trackGeometry';
import { KEIKYU_AIRPORT_TRAIN_TYPES } from './trainTypes';

export const keikyuAirportLine: LineDefinition = {
  id: 'keikyu_airport',
  name: '京急空港線',
  shortName: '京急空港線',
  operator: '京浜急行電鉄',
  area: 'kanto',
  lineColor: '#e60012',
  accentColor: '#00bfff',
  defaultCars: 8,
  defaultBounds: [
    [35.5298, 139.7093],
    [35.5766, 139.8014],
  ],
  directionNames: {
    "inbound": "京急蒲田・品川・横浜方面",
    "outbound": "羽田空港第1・第2ターミナル方面",
    "inboundFull": "上り 京急蒲田・品川・横浜方面",
    "outboundFull": "下り 羽田空港第1・第2ターミナル方面",
    "inboundShort": "上り（京急蒲田方面）",
    "outboundShort": "下り（羽田空港方面）"
},
  stations: KEIKYU_AIRPORT_STATIONS,
  trackSegments: KEIKYU_AIRPORT_TRACK_SEGMENTS,
  trainTypes: KEIKYU_AIRPORT_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
