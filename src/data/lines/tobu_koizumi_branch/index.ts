import type { LineDefinition } from '../../../types';
import { TOBU_KOIZUMI_BRANCH_STATIONS } from './stations';
import { TOBU_KOIZUMI_BRANCH_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';

export const tobuKoizumiBranchLine: LineDefinition = {
  id: 'tobu_koizumi_branch',
  name: '東武小泉線（支線）',
  shortName: '小泉線支線',
  operator: '東武鉄道',
  lineColor: '#e40012',
  accentColor: '#004098',
  defaultCars: 2,
  defaultBounds: [[36.25, 139.37], [36.31, 139.44]],
  directionNames: {
    inbound: '東小泉方面',
    outbound: '太田方面',
    inboundFull: '上り 東小泉方面',
    outboundFull: '下り 太田方面',
    inboundShort: '東小泉方面',
    outboundShort: '太田方面',
  },
  stations: TOBU_KOIZUMI_BRANCH_STATIONS,
  trackSegments: TOBU_KOIZUMI_BRANCH_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
