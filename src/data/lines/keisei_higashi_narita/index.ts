import type { LineDefinition } from '../../../types';
import { KEISEI_HIGASHI_NARITA_STATIONS } from './stations';
import { KEISEI_HIGASHI_NARITA_TRACK_SEGMENTS } from './trackGeometry';
import { KEISEI_HIGASHI_NARITA_TRAIN_TYPES } from './trainTypes';

export const keiseiHigashiNaritaLine: LineDefinition = {
  id: 'keisei_higashi_narita',
  name: '京成東成田線',
  shortName: '東成田線',
  operator: '京成電鉄',
  area: 'kanto',
  lineColor: '#005aaa',
  accentColor: '#00a051',
  defaultCars: 6,
  defaultBounds: [
    [35.7553, 140.2998],
    [35.7908, 140.4018],
  ],
  directionNames: {
    "inbound": "京成成田方面",
    "outbound": "東成田・芝山千代田方面",
    "inboundFull": "上り 京成成田方面",
    "outboundFull": "下り 東成田・芝山千代田方面",
    "inboundShort": "京成成田方面",
    "outboundShort": "東成田"
},
  stations: KEISEI_HIGASHI_NARITA_STATIONS,
  trackSegments: KEISEI_HIGASHI_NARITA_TRACK_SEGMENTS,
  trainTypes: KEISEI_HIGASHI_NARITA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
