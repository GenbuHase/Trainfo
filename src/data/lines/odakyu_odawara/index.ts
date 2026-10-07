import type { LineDefinition } from '../../../types';
import { ODAKYU_ODAWARA_STATIONS } from './stations';
import { ODAKYU_ODAWARA_TRACK_SEGMENTS } from './trackGeometry';
import { ODAKYU_ODAWARA_TRAIN_TYPES } from './trainTypes';
import odakyuOdawaraStationTimetables from './stationTimetables.json';
import odakyuOdawaraGlobalTimetable from './globalTimetable.json';

export const odakyuOdawaraLine: LineDefinition = {
  id: 'odakyu_odawara',
  name: '小田急小田原線',
  shortName: '小田原線',
  operator: '小田急電鉄',
  lineColor: '#0065af',
  accentColor: '#0065af',
  defaultCars: 10,
  stations: ODAKYU_ODAWARA_STATIONS,
  trackSegments: ODAKYU_ODAWARA_TRACK_SEGMENTS,
  trainTypes: ODAKYU_ODAWARA_TRAIN_TYPES,
  stationTimetables: odakyuOdawaraStationTimetables as any,
  globalTimetable: odakyuOdawaraGlobalTimetable as any,
  defaultBounds: [
    [35.23, 139.13],
    [35.71, 139.72],
  ],
  directionNames: {
    inbound: '新宿・代々木上原方面',
    outbound: '小田原・箱根湯本方面',
    inboundFull: '上り 新宿・代々木上原方面',
    outboundFull: '下り 小田原・箱根湯本方面',
    inboundShort: '上り (新宿方面)',
    outboundShort: '下り (小田原方面)',
  },
};
