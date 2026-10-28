import type { LineDefinition } from '../../../types';
import { CHUO_SOBU_LOCAL_STATIONS } from './stations';
import { CHUO_SOBU_LOCAL_TRAIN_TYPES } from './trainTypes';
import { CHUO_SOBU_LOCAL_TRACK_SEGMENTS } from './trackGeometry';

export const chuoSobuLocalLine: LineDefinition = {
  id: 'chuo_sobu_local',
  name: 'JR中央・総武線各駅停車',
  shortName: '中央・総武各駅停車',
  operator: 'JR東日本',
  lineColor: '#ffd400',
  accentColor: '#ffd400',
  defaultCars: 10,
  defaultBounds: [[35.6,139.55],[35.72,140.13]],
  directionNames: {
  "inbound": "西行 新宿・中野・三鷹方面",
  "outbound": "東行 御茶ノ水・錦糸町・千葉方面",
  "inboundFull": "西行 新宿・中野・三鷹方面",
  "outboundFull": "東行 御茶ノ水・錦糸町・船橋・千葉方面",
  "inboundShort": "三鷹方面",
  "outboundShort": "千葉方面"
},
  stations: CHUO_SOBU_LOCAL_STATIONS,
  trackSegments: CHUO_SOBU_LOCAL_TRACK_SEGMENTS,
  trainTypes: CHUO_SOBU_LOCAL_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
