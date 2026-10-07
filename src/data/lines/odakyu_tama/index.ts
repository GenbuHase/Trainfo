import type { LineDefinition } from '../../../types';
import { ODAKYU_TAMA_STATIONS } from './stations';
import { ODAKYU_TAMA_TRACK_SEGMENTS } from './trackGeometry';
import { ODAKYU_TAMA_TRAIN_TYPES } from './trainTypes';
import odakyuTamaStationTimetables from './stationTimetables.json';
import odakyuTamaGlobalTimetable from './globalTimetable.json';

export const odakyuTamaLine: LineDefinition = {
  id: 'odakyu_tama',
  name: '小田急多摩線',
  shortName: '多摩線',
  operator: '小田急電鉄',
  lineColor: '#0065af',
  accentColor: '#0065af',
  defaultCars: 8,
  stations: ODAKYU_TAMA_STATIONS,
  trackSegments: ODAKYU_TAMA_TRACK_SEGMENTS,
  trainTypes: ODAKYU_TAMA_TRAIN_TYPES,
  stationTimetables: odakyuTamaStationTimetables as any,
  globalTimetable: odakyuTamaGlobalTimetable as any,
  defaultBounds: [
    [35.58, 139.39],
    [35.65, 139.53],
  ],
  directionNames: {
    inbound: '新百合ヶ丘・新宿・千代田線方面',
    outbound: '唐木田方面',
    inboundFull: '上り 新百合ヶ丘・新宿・千代田線方面',
    outboundFull: '下り 唐木田方面',
    inboundShort: '上り (新百合ヶ丘方面)',
    outboundShort: '下り (唐木田方面)',
  },
};
