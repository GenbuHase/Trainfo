import type { LineDefinition } from '../../../types';
import { CHIYODA_STATIONS } from './stations';
import { CHIYODA_TRACK_SEGMENTS } from './trackGeometry';
import { CHIYODA_TRAIN_TYPES } from './trainTypes';

export const chiyodaLine: LineDefinition = {
  id: 'chiyoda',
  name: '東京メトロ千代田線',
  shortName: '千代田線',
  operator: '東京メトロ',
  lineColor: '#00bb85', // 千代田線グリーン
  accentColor: '#00bb85',
  defaultCars: 10,
  defaultBounds: [
    [35.660, 139.670], // 代々木上原周辺
    [35.785, 139.840], // 北綾瀬・綾瀬周辺
  ],
  directionNames: {
    inbound: '代々木上原方面',
    outbound: '北綾瀬・我孫子方面',
    inboundFull: '上り 表参道・代々木上原・小田急線方面',
    outboundFull: '下り 大手町・北千住・綾瀬・常磐線方面',
    inboundShort: '代々木上原方面',
    outboundShort: '北綾瀬・我孫子方面',
  },
  stations: CHIYODA_STATIONS,
  trackSegments: CHIYODA_TRACK_SEGMENTS,
  trainTypes: CHIYODA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
