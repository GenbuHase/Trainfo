import type { LineDefinition } from '../../../types';
import { ODAKYU_ENOSHIMA_STATIONS } from './stations';
import { ODAKYU_ENOSHIMA_TRACK_SEGMENTS } from './trackGeometry';
import { ODAKYU_ENOSHIMA_TRAIN_TYPES } from './trainTypes';
import odakyuEnoshimaStationTimetables from './stationTimetables.json';
import odakyuEnoshimaGlobalTimetable from './globalTimetable.json';

export const odakyuEnoshimaLine: LineDefinition = {
  id: 'odakyu_enoshima',
  name: '小田急江ノ島線',
  shortName: '江ノ島線',
  operator: '小田急電鉄',
  lineColor: '#0065af',
  accentColor: '#0065af',
  defaultCars: 6,
  stations: ODAKYU_ENOSHIMA_STATIONS,
  trackSegments: ODAKYU_ENOSHIMA_TRACK_SEGMENTS,
  trainTypes: ODAKYU_ENOSHIMA_TRAIN_TYPES,
  stationTimetables: odakyuEnoshimaStationTimetables as any,
  globalTimetable: odakyuEnoshimaGlobalTimetable as any,
  defaultBounds: [
    [35.29, 139.42],
    [35.55, 139.51],
  ],
  directionNames: {
    inbound: '相模大野・町田・新宿方面',
    outbound: '藤沢・片瀬江ノ島方面',
    inboundFull: '上り 相模大野・町田・新宿方面',
    outboundFull: '下り 藤沢・片瀬江ノ島方面',
    inboundShort: '上り (相模大野方面)',
    outboundShort: '下り (片瀬江ノ島方面)',
  },
};
