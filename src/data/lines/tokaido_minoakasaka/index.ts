import type { LineDefinition } from '../../../types';
import { TOKAIDO_MINOAKASAKA_STATIONS } from './stations';
import { TOKAIDO_MINOAKASAKA_TRAIN_TYPES } from './trainTypes';
import { TOKAIDO_MINOAKASAKA_TRACK_SEGMENTS } from './trackGeometry';

export const tokaidoMinoakasakaLine: LineDefinition = {
  id: 'tokaido_minoakasaka',
  name: 'JR東海道線（美濃赤坂線）',
  shortName: '美濃赤坂線',
  operator: 'JR東海',
  lineColor: '#ff7322',
  accentColor: '#6b7280',
  defaultCars: 2,
  defaultBounds: [[35.3371,136.5522],[35.4173,136.647]],
  directionNames: {
      "inbound": "大垣方面",
      "outbound": "美濃赤坂方面",
      "inboundFull": "上り 大垣方面",
      "outboundFull": "下り 美濃赤坂方面",
      "inboundShort": "大垣方面",
      "outboundShort": "美濃赤坂方面"
  },
  stations: TOKAIDO_MINOAKASAKA_STATIONS,
  trackSegments: TOKAIDO_MINOAKASAKA_TRACK_SEGMENTS,
  trainTypes: TOKAIDO_MINOAKASAKA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
