import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { KAWAGOE_STATIONS } from './stations';
import { KAWAGOE_TRACK_SEGMENTS } from './trackGeometry';
import { KAWAGOE_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const kawagoeLine: LineDefinition = {
  id: 'kawagoe',
  name: 'JR川越線',
  shortName: '川越線',
  operator: 'JR東日本',
  lineColor: '#00ac9a', // 川越線・埼京線エメラルドグリーン
  accentColor: '#007ac1', // 快速ブルー
  defaultBounds: [
    [35.890, 139.470], // 川越周辺
    [35.940, 139.640], // 大宮周辺
  ],
  directionNames: {
    inbound: '大宮方面',
    outbound: '川越方面',
    inboundFull: '上り 大宮・埼京線方面',
    outboundFull: '下り 川越方面',
    inboundShort: '大宮方面',
    outboundShort: '川越方面',
  },
  stations: KAWAGOE_STATIONS,
  trackSegments: KAWAGOE_TRACK_SEGMENTS,
  trainTypes: KAWAGOE_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
