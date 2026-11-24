import type { LineDefinition } from '../../../types';
import { NEW_SHUTTLE_STATIONS } from './stations';
import { NEW_SHUTTLE_TRACK_SEGMENTS } from './trackGeometry';
import { NEW_SHUTTLE_TRAIN_TYPES } from './trainTypes';

export const newShuttleLine: LineDefinition = {
  id: 'new_shuttle',
  name: '埼玉新都市交通伊奈線（ニューシャトル）',
  shortName: 'ニューシャトル',
  operator: '埼玉新都市交通',
  area: 'kanto',
  lineColor: '#00896c',
  accentColor: '#005e4a',
  defaultCars: 6,
  defaultBounds: [
    [35.8927, 139.5853],
    [36.0286, 139.6395],
  ],
  directionNames: {
    "inbound": "大宮方面",
    "outbound": "丸山・内宿方面",
    "inboundFull": "上り 大宮方面",
    "outboundFull": "下り 丸山・内宿方面",
    "inboundShort": "上り（大宮方面）",
    "outboundShort": "下り（内宿方面）"
},
  stations: NEW_SHUTTLE_STATIONS,
  trackSegments: NEW_SHUTTLE_TRACK_SEGMENTS,
  trainTypes: NEW_SHUTTLE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
