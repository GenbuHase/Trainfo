import type { LineDefinition } from '../../../types';
import { JOBAN_STATIONS } from './stations';
import { JOBAN_TRACK_SEGMENTS } from './trackGeometry';
import { JOBAN_TRAIN_TYPES } from './trainTypes';

export const jobanLine: LineDefinition = {
  id: 'joban',
  name: 'JR常磐線各駅停車',
  shortName: '常磐線各停',
  operator: 'JR東日本',
  lineColor: '#00b261', // 常磐線各駅停車エメラルドグリーン
  accentColor: '#00b261',
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
  stations: JOBAN_STATIONS,
  trackSegments: JOBAN_TRACK_SEGMENTS,
  trainTypes: JOBAN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
