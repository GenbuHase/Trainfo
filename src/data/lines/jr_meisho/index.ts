import type { LineDefinition } from '../../../types';
import { JR_MEISHO_STATIONS } from './stations';
import { JR_MEISHO_TRAIN_TYPES } from './trainTypes';
import { JR_MEISHO_TRACK_SEGMENTS } from './trackGeometry';

export const jrMeishoLine: LineDefinition = {
  id: 'jr_meisho',
  name: 'JR名松線',
  shortName: '名松線',
  operator: 'JR東海',
  lineColor: '#228b22',
  accentColor: '#ff7322',
  defaultCars: 1,
  defaultBounds: [[34.4623,136.2103],[34.7049,136.5861]],
  directionNames: {
    "inbound": "松阪方面",
    "outbound": "家城・伊勢奥津方面",
    "inboundFull": "上り 松阪方面",
    "outboundFull": "下り 家城・伊勢奥津方面",
    "inboundShort": "松阪方面",
    "outboundShort": "伊勢奥津方面"
},
  stations: JR_MEISHO_STATIONS,
  trackSegments: JR_MEISHO_TRACK_SEGMENTS,
  trainTypes: JR_MEISHO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
