import type { LineDefinition } from '../../../types';
import { GONO_STATIONS } from './stations';
import { GONO_TRACK_SEGMENTS } from './trackGeometry';
import { GONO_TRAIN_TYPES } from './trainTypes';

export const gonoLine: LineDefinition = {
  id: 'gono',
  name: 'JR五能線',
  shortName: '五能線',
  operator: 'JR東日本',
  lineColor: '#0000ff',
  accentColor: '#0000b3',
  defaultCars: 2,
  defaultBounds: [[40.1715,139.8446],[40.8289,140.5416]],
  directionNames: {
    "inbound": "深浦・能代・東能代方面",
    "outbound": "深浦・五所川原・川部・弘前方面",
    "inboundFull": "上り 東能代方面",
    "outboundFull": "下り 川部・弘前方面",
    "inboundShort": "上り (東能代方面)",
    "outboundShort": "下り (川部方面)"
},
  stations: GONO_STATIONS,
  trackSegments: GONO_TRACK_SEGMENTS,
  trainTypes: GONO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
