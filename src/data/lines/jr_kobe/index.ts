import type { LineDefinition } from '../../../types';
import { JR_KOBE_STATIONS } from './stations';
import { JR_KOBE_TRAIN_TYPES } from './trainTypes';
import { JR_KOBE_TRACK_SEGMENTS } from './trackGeometry';

export const jrKobeLine: LineDefinition = {
  id: 'jr_kobe',
  name: 'JR神戸線',
  shortName: '神戸線',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#2980b9',
  defaultCars: 8,
  defaultBounds: [[34.6479,135.1481],[34.7691,135.5232]],
  directionNames: {
      "inbound": "大阪・京都方面",
      "outbound": "三ノ宮・神戸・姫路方面",
      "inboundFull": "上り 尼崎・大阪・京都方面",
      "outboundFull": "下り 芦屋・三ノ宮・神戸・姫路方面",
      "inboundShort": "大阪方面",
      "outboundShort": "神戸方面"
  },
  stations: JR_KOBE_STATIONS,
  trackSegments: JR_KOBE_TRACK_SEGMENTS,
  trainTypes: JR_KOBE_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
