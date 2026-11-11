import type { LineDefinition } from '../../../types';
import { TOKAIDO_TOYOHASHI_MAIBARA_STATIONS } from './stations';
import { TOKAIDO_TOYOHASHI_MAIBARA_TRAIN_TYPES } from './trainTypes';
import { TOKAIDO_TOYOHASHI_MAIBARA_TRACK_SEGMENTS } from './trackGeometry';

export const tokaidoToyohashiMaibaraLine: LineDefinition = {
  id: 'tokaido_toyohashi_maibara',
  name: 'JR東海道本線（豊橋～米原）',
  shortName: '東海道本線（名古屋地区）',
  operator: 'JR東海',
  lineColor: '#ff7322',
  accentColor: '#0072bc',
  defaultCars: 6,
  defaultBounds: [[34.7317,136.2606],[35.4394,137.4129]],
  directionNames: {
      "inbound": "岡崎・豊橋方面",
      "outbound": "名古屋・大垣・米原方面",
      "inboundFull": "上り 岡崎・蒲郡・豊橋方面",
      "outboundFull": "下り 名古屋・岐阜・大垣・米原方面",
      "inboundShort": "豊橋方面",
      "outboundShort": "米原方面"
  },
  stations: TOKAIDO_TOYOHASHI_MAIBARA_STATIONS,
  trackSegments: TOKAIDO_TOYOHASHI_MAIBARA_TRACK_SEGMENTS,
  trainTypes: TOKAIDO_TOYOHASHI_MAIBARA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
