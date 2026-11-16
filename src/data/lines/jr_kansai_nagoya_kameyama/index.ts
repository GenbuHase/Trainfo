import type { LineDefinition } from '../../../types';
import { JR_KANSAI_NAGOYA_KAMEYAMA_STATIONS } from './stations';
import { JR_KANSAI_NAGOYA_KAMEYAMA_TRAIN_TYPES } from './trainTypes';
import { JR_KANSAI_NAGOYA_KAMEYAMA_TRACK_SEGMENTS } from './trackGeometry';

export const jrKansaiNagoyaKameyamaLine: LineDefinition = {
  id: 'jr_kansai_nagoya_kameyama',
  name: 'JR関西本線（名古屋～亀山）',
  shortName: '関西本線（名古屋～亀山）',
  operator: 'JR東海',
  lineColor: '#00a960',
  accentColor: '#ff7322',
  defaultCars: 4,
  defaultBounds: [[34.8017,136.4028],[35.2221,136.9303]],
  directionNames: {
    "inbound": "名古屋方面",
    "outbound": "桑名・四日市・亀山方面",
    "inboundFull": "上り 蟹江・名古屋方面",
    "outboundFull": "下り 桑名・四日市・亀山方面",
    "inboundShort": "名古屋方面",
    "outboundShort": "亀山方面"
},
  stations: JR_KANSAI_NAGOYA_KAMEYAMA_STATIONS,
  trackSegments: JR_KANSAI_NAGOYA_KAMEYAMA_TRACK_SEGMENTS,
  trainTypes: JR_KANSAI_NAGOYA_KAMEYAMA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
