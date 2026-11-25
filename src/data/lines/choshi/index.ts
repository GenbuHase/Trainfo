import type { LineDefinition } from '../../../types';
import { CHOSHI_STATIONS } from './stations';
import { CHOSHI_TRACK_SEGMENTS } from './trackGeometry';
import { CHOSHI_TRAIN_TYPES } from './trainTypes';

export const choshiLine: LineDefinition = {
  id: 'choshi',
  name: '銚子電気鉄道線',
  shortName: '銚子電鉄線',
  operator: '銚子電気鉄道',
  area: 'kanto',
  lineColor: '#c8102e',
  accentColor: '#960018',
  defaultCars: 2,
  defaultBounds: [
    [35.6846, 140.8111],
    [35.7459, 140.8778],
  ],
  directionNames: {
    "inbound": "銚子方面",
    "outbound": "犬吠・外川方面",
    "inboundFull": "上り 銚子方面",
    "outboundFull": "下り 犬吠・外川方面",
    "inboundShort": "上り（銚子方面）",
    "outboundShort": "下り（外川方面）"
},
  stations: CHOSHI_STATIONS,
  trackSegments: CHOSHI_TRACK_SEGMENTS,
  trainTypes: CHOSHI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
