import type { LineDefinition } from '../../../types';
import { JR_BIWAKO_STATIONS } from './stations';
import { JR_BIWAKO_TRAIN_TYPES } from './trainTypes';
import { JR_BIWAKO_TRACK_SEGMENTS } from './trackGeometry';

export const jrBiwakoLine: LineDefinition = {
  id: 'jr_biwako',
  name: 'JR琵琶湖線',
  shortName: '琵琶湖線',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#2980b9',
  defaultCars: 8,
  defaultBounds: [[34.9502,135.7287],[35.3458,136.3206]],
  directionNames: {
      "inbound": "米原・長浜方面",
      "outbound": "草津・京都・大阪方面",
      "inboundFull": "上り 彦根・米原・長浜方面",
      "outboundFull": "下り 草津・京都・大阪・三ノ宮方面",
      "inboundShort": "米原方面",
      "outboundShort": "京都方面"
  },
  stations: JR_BIWAKO_STATIONS,
  trackSegments: JR_BIWAKO_TRACK_SEGMENTS,
  trainTypes: JR_BIWAKO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
