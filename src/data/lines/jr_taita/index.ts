import type { LineDefinition } from '../../../types';
import { JR_TAITA_STATIONS } from './stations';
import { JR_TAITA_TRAIN_TYPES } from './trainTypes';
import { JR_TAITA_TRACK_SEGMENTS } from './trackGeometry';

export const jrTaitaLine: LineDefinition = {
  id: 'jr_taita',
  name: 'JR太多線',
  shortName: '太多線',
  operator: 'JR東海',
  lineColor: '#d97706',
  accentColor: '#ff7322',
  defaultCars: 2,
  defaultBounds: [[35.2847,136.9697],[35.4942,137.1711]],
  directionNames: {
    "inbound": "多治見方面",
    "outbound": "美濃太田方面",
    "inboundFull": "上り 多治見方面",
    "outboundFull": "下り 美濃太田方面",
    "inboundShort": "多治見方面",
    "outboundShort": "美濃太田方面"
},
  stations: JR_TAITA_STATIONS,
  trackSegments: JR_TAITA_TRACK_SEGMENTS,
  trainTypes: JR_TAITA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
