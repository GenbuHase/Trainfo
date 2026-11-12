import type { LineDefinition } from '../../../types';
import { JR_OSAKA_LOOP_STATIONS } from './stations';
import { JR_OSAKA_LOOP_TRAIN_TYPES } from './trainTypes';
import { JR_OSAKA_LOOP_TRACK_SEGMENTS } from './trackGeometry';

export const jrOsakaLoopLine: LineDefinition = {
  id: 'jr_osaka_loop',
  name: 'JR大阪環状線',
  shortName: '大阪環状線',
  operator: 'JR西日本',
  lineColor: '#e72227',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.5972,135.412],[34.7554,135.5844]],
  directionNames: {
    "inbound": "内回り（京橋・大阪方面）",
    "outbound": "外回り（鶴橋・天王寺方面）",
    "inboundFull": "内回り 京橋・大阪方面",
    "outboundFull": "外回り 鶴橋・天王寺方面",
    "inboundShort": "内回り",
    "outboundShort": "外回り"
},
  stations: JR_OSAKA_LOOP_STATIONS,
  trackSegments: JR_OSAKA_LOOP_TRACK_SEGMENTS,
  trainTypes: JR_OSAKA_LOOP_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
