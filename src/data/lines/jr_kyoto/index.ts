import type { LineDefinition } from '../../../types';
import { JR_KYOTO_STATIONS } from './stations';
import { JR_KYOTO_TRAIN_TYPES } from './trainTypes';
import { JR_KYOTO_TRACK_SEGMENTS } from './trackGeometry';

export const jrKyotoLine: LineDefinition = {
  id: 'jr_kyoto',
  name: 'JR京都線',
  shortName: '京都線',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#2980b9',
  defaultCars: 8,
  defaultBounds: [[34.6717,135.4632],[35.0157,135.7887]],
  directionNames: {
      "inbound": "京都・草津方面",
      "outbound": "大阪・三ノ宮方面",
      "inboundFull": "上り 高槻・京都・草津・米原方面",
      "outboundFull": "下り 新大阪・大阪・三ノ宮・姫路方面",
      "inboundShort": "京都方面",
      "outboundShort": "大阪方面"
  },
  stations: JR_KYOTO_STATIONS,
  trackSegments: JR_KYOTO_TRACK_SEGMENTS,
  trainTypes: JR_KYOTO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
