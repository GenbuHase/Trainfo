import type { LineDefinition } from '../../../types';
import { TOEI_OEDO_STATIONS } from './stations';
import { TOEI_OEDO_TRACK_SEGMENTS } from './trackGeometry';
import { TOEI_OEDO_TRAIN_TYPES } from './trainTypes';

export const toeiOedoLine: LineDefinition = {
  id: 'toei_oedo',
  name: '都営大江戸線',
  shortName: '大江戸線',
  operator: '東京都交通局',
  area: 'kanto',
  lineColor: '#b6007a',
  accentColor: '#850059',
  defaultCars: 8,
  defaultBounds: [
    [35.6399, 139.6135],
    [35.7735, 139.8136],
  ],
  directionNames: {
    "inbound": "六本木・大門・都庁前方面",
    "outbound": "飯田橋・両国・光が丘方面",
    "inboundFull": "上り 六本木・大門・都庁前方面",
    "outboundFull": "下り 飯田橋・両国・光が丘方面",
    "inboundShort": "上り（都庁前方面）",
    "outboundShort": "下り（光が丘方面）"
},
  stations: TOEI_OEDO_STATIONS,
  trackSegments: TOEI_OEDO_TRACK_SEGMENTS,
  trainTypes: TOEI_OEDO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
