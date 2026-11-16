import type { LineDefinition } from '../../../types';
import { JR_KINOKUNI_STATIONS } from './stations';
import { JR_KINOKUNI_TRAIN_TYPES } from './trainTypes';
import { JR_KINOKUNI_TRACK_SEGMENTS } from './trackGeometry';

export const jrKinokuniLine: LineDefinition = {
  id: 'jr_kinokuni',
  name: 'JRきのくに線',
  shortName: 'きのくに線',
  operator: 'JR西日本',
  lineColor: '#00a7db',
  accentColor: '#ffffff',
  defaultCars: 4,
  defaultBounds: [[33.4255,135.0656],[34.2825,136.0422]],
  directionNames: {
  "inbound": "和歌山・天王寺・大阪方面",
  "outbound": "御坊・白浜・新宮方面",
  "inboundFull": "上り 和歌山・天王寺・大阪方面",
  "outboundFull": "下り 御坊・白浜・新宮方面",
  "inboundShort": "和歌山方面",
  "outboundShort": "新宮方面"
},
  stations: JR_KINOKUNI_STATIONS,
  trackSegments: JR_KINOKUNI_TRACK_SEGMENTS,
  trainTypes: JR_KINOKUNI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
