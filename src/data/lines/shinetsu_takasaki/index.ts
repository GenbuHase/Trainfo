import type { LineDefinition } from '../../../types';
import { SHINETSU_TAKASAKI_STATIONS } from './stations';
import { SHINETSU_TAKASAKI_TRACK_SEGMENTS } from './trackGeometry';
import { SHINETSU_TAKASAKI_TRAIN_TYPES } from './trainTypes';

export const shinetsuTakasakiLine: LineDefinition = {
  id: 'shinetsu_takasaki',
  name: 'JR信越本線',
  shortName: '信越本線（高崎～横川）',
  operator: 'JR東日本',
  lineColor: '#73c11d',
  accentColor: '#5aa114',
  defaultCars: 4,
  defaultBounds: [
    [36.28, 138.72],
    [36.35, 139.03],
  ],
  directionNames: {
    inbound: '高崎方面',
    outbound: '横川方面',
    inboundFull: '上り 高崎方面',
    outboundFull: '下り 横川方面',
    inboundShort: '高崎方面',
    outboundShort: '横川方面',
  },
  stations: SHINETSU_TAKASAKI_STATIONS,
  trackSegments: SHINETSU_TAKASAKI_TRACK_SEGMENTS,
  trainTypes: SHINETSU_TAKASAKI_TRAIN_TYPES,
  // 時刻表データは初期状態では空とし、timetableLoader.ts により動的ロード
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
