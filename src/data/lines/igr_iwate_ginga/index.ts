import type { LineDefinition } from '../../../types';
import { IGR_IWATE_GINGA_STATIONS } from './stations';
import { IGR_IWATE_GINGA_TRACK_SEGMENTS } from './trackGeometry';
import { IGR_IWATE_GINGA_TRAIN_TYPES } from './trainTypes';

export const igrIwateGingaLine: LineDefinition = {
  id: 'igr_iwate_ginga',
  name: 'IGRいわて銀河鉄道線',
  shortName: 'いわて銀河鉄道線',
  operator: 'IGRいわて銀河鉄道',
  lineColor: '#0e459b',
  accentColor: '#38bdf8',
  defaultCars: 2,
  defaultBounds: [[39.6807,141.0984],[40.3716,141.3278]],
  directionNames: {
    "inbound": "いわて沼宮内・盛岡方面",
    "outbound": "二戸・八戸方面",
    "inboundFull": "上り 好摩・盛岡方面",
    "outboundFull": "下り いわて沼宮内・二戸・八戸方面",
    "inboundShort": "盛岡方面",
    "outboundShort": "八戸方面"
},
  stations: IGR_IWATE_GINGA_STATIONS,
  trackSegments: IGR_IWATE_GINGA_TRACK_SEGMENTS,
  trainTypes: IGR_IWATE_GINGA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
