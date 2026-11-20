import type { LineDefinition } from '../../../types';
import { JR_ECHIGO_STATIONS } from './stations';
import { JR_ECHIGO_TRACK_SEGMENTS } from './trackGeometry';
import { JR_ECHIGO_TRAIN_TYPES } from './trainTypes';

export const jrEchigoLine: LineDefinition = {
  id: 'jr_echigo',
  name: 'JR越後線',
  shortName: '越後線',
  operator: 'JR東日本',
  area: 'koshinetsu',
  lineColor: '#008c38',
  accentColor: '#1565c0',
  defaultCars: 4,
  defaultBounds: [
    [37.3435, 138.5363],
    [37.9323, 139.0813],
  ],
  directionNames: {
    "inbound": "吉田・柏崎方面",
    "outbound": "新潟方面",
    "inboundFull": "上り 内野・吉田・柏崎方面",
    "outboundFull": "下り 関屋・白山・新潟方面",
    "inboundShort": "柏崎方面",
    "outboundShort": "新潟方面"
},
  stations: JR_ECHIGO_STATIONS,
  trackSegments: JR_ECHIGO_TRACK_SEGMENTS,
  trainTypes: JR_ECHIGO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
