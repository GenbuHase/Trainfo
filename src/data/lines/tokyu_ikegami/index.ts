import type { LineDefinition } from '../../../types';
import { TOKYU_IKEGAMI_STATIONS } from './stations';
import { TOKYU_IKEGAMI_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_IKEGAMI_TRAIN_TYPES } from './trainTypes';

export const tokyuIkegamiLine: LineDefinition = {
  id: 'tokyu_ikegami',
  name: '東急池上線',
  shortName: '池上線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#ee86a7',
  accentColor: '#c95b7e',
  defaultCars: 3,
  defaultBounds: [
    [35.5468, 139.6664],
    [35.6402, 139.7391],
  ],
  directionNames: {
    "inbound": "五反田方面",
    "outbound": "蒲田方面",
    "inboundFull": "上り 五反田方面",
    "outboundFull": "下り 蒲田方面",
    "inboundShort": "五反田方面",
    "outboundShort": "蒲田方面"
},
  stations: TOKYU_IKEGAMI_STATIONS,
  trackSegments: TOKYU_IKEGAMI_TRACK_SEGMENTS,
  trainTypes: TOKYU_IKEGAMI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
