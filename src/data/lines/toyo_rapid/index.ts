import type { LineDefinition } from '../../../types';
import { TOYO_RAPID_STATIONS } from './stations';
import { TOYO_RAPID_TRACK_SEGMENTS } from './trackGeometry';
import { TOYO_RAPID_TRAIN_TYPES } from './trainTypes';

export const toyoRapidLine: LineDefinition = {
  id: 'toyo_rapid',
  name: '東葉高速鉄道東葉高速線',
  shortName: '東葉高速線',
  operator: '東葉高速鉄道',
  area: 'kanto',
  lineColor: '#53b332',
  accentColor: '#3a8420',
  defaultCars: 10,
  defaultBounds: [
    [35.6904, 139.9439],
    [35.7439, 140.1411],
  ],
  directionNames: {
    "inbound": "西船橋・東京メトロ東西線方面",
    "outbound": "北習志野・東葉勝田台方面",
    "inboundFull": "上り 西船橋・東京メトロ東西線方面",
    "outboundFull": "下り 北習志野・東葉勝田台方面",
    "inboundShort": "上り（西船橋方面）",
    "outboundShort": "下り（東葉勝田台方面）"
},
  stations: TOYO_RAPID_STATIONS,
  trackSegments: TOYO_RAPID_TRACK_SEGMENTS,
  trainTypes: TOYO_RAPID_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
