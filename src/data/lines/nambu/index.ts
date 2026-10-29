import type { LineDefinition } from '../../../types';
import { NAMBU_STATIONS } from './stations';
import { NAMBU_TRAIN_TYPES } from './trainTypes';
import { NAMBU_TRACK_SEGMENTS } from './trackGeometry';

export const nambuLine: LineDefinition = {
  id: 'nambu',
  name: 'JR南武線',
  shortName: '南武線',
  operator: 'JR東日本',
  lineColor: '#ffd400',
  accentColor: '#f39800',
  defaultCars: 6,
  defaultBounds: [[35.5,139.4],[35.71,139.71]],
  directionNames: {
  "inbound": "上り 武蔵小杉・川崎方面",
  "outbound": "下り 登戸・府中本町・立川方面",
  "inboundFull": "上り 武蔵小杉・川崎・浜川崎方面",
  "outboundFull": "下り 登戸・府中本町・立川方面",
  "inboundShort": "川崎方面",
  "outboundShort": "立川方面"
},
  stations: NAMBU_STATIONS,
  trackSegments: NAMBU_TRACK_SEGMENTS,
  trainTypes: NAMBU_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
