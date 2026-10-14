import type { LineDefinition } from '../../../types';
import { JOBAN_LOCAL_STATIONS } from './stations';
import { JOBAN_LOCAL_TRACK_SEGMENTS } from './trackGeometry';
import { JOBAN_LOCAL_TRAIN_TYPES } from './trainTypes';

export const jobanLocalLine: LineDefinition = {
  id: 'joban_local',
  name: 'JR常磐線各駅停車',
  shortName: '常磐線各停',
  operator: 'JR東日本',
  lineColor: '#9e9e9f', // 常磐線各駅停車（JLナンバリングカラー。駅案内: #00c18a）
  accentColor: '#9e9e9f',
  defaultCars: 10,
  defaultBounds: [
    [35.750, 139.810], // 綾瀬周辺
    [35.910, 140.080], // 取手周辺
  ],
  directionNames: {
    inbound: '綾瀬・代々木上原方面',
    outbound: '柏・我孫子・取手方面',
    inboundFull: '上り 松戸・北千住・代々木上原方面',
    outboundFull: '下り 柏・我孫子・取手方面',
    inboundShort: '綾瀬方面',
    outboundShort: '取手方面',
  },
  stations: JOBAN_LOCAL_STATIONS,
  trackSegments: JOBAN_LOCAL_TRACK_SEGMENTS,
  trainTypes: JOBAN_LOCAL_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
