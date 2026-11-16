import type { LineDefinition } from '../../../types';
import { JR_TAKETOYO_STATIONS } from './stations';
import { JR_TAKETOYO_TRAIN_TYPES } from './trainTypes';
import { JR_TAKETOYO_TRACK_SEGMENTS } from './trackGeometry';

export const jrTaketoyoLine: LineDefinition = {
  id: 'jr_taketoyo',
  name: 'JR武豊線',
  shortName: '武豊線',
  operator: 'JR東海',
  lineColor: '#6f3c1d',
  accentColor: '#ff7322',
  defaultCars: 4,
  defaultBounds: [[34.8028,136.871],[35.0594,137.0229]],
  directionNames: {
    "inbound": "大府・名古屋方面",
    "outbound": "半田・武豊方面",
    "inboundFull": "上り 大府・名古屋方面",
    "outboundFull": "下り 半田・武豊方面",
    "inboundShort": "大府方面",
    "outboundShort": "武豊方面"
},
  stations: JR_TAKETOYO_STATIONS,
  trackSegments: JR_TAKETOYO_TRACK_SEGMENTS,
  trainTypes: JR_TAKETOYO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
