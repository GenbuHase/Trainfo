import type { LineDefinition } from '../../../types';
import { TOEI_NIPPORI_TONERI_STATIONS } from './stations';
import { TOEI_NIPPORI_TONERI_TRACK_SEGMENTS } from './trackGeometry';
import { TOEI_NIPPORI_TONERI_TRAIN_TYPES } from './trainTypes';

export const toeiNipporiToneriLine: LineDefinition = {
  id: 'toei_nippori_toneri',
  name: '日暮里・舎人ライナー',
  shortName: '日暮里・舎人ライナー',
  operator: '東京都交通局',
  area: 'kanto',
  lineColor: '#ff69b4',
  accentColor: '#d83473',
  defaultCars: 5,
  defaultBounds: [
    [35.7141, 139.7532],
    [35.8298, 139.7865],
  ],
  directionNames: {
    "inbound": "西日暮里・日暮里方面",
    "outbound": "江北・見沼代親水公園方面",
    "inboundFull": "上り 西日暮里・日暮里方面",
    "outboundFull": "下り 江北・見沼代親水公園方面",
    "inboundShort": "西日暮里",
    "outboundShort": "江北"
},
  stations: TOEI_NIPPORI_TONERI_STATIONS,
  trackSegments: TOEI_NIPPORI_TONERI_TRACK_SEGMENTS,
  trainTypes: TOEI_NIPPORI_TONERI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
