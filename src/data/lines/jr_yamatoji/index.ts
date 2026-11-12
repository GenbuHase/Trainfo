import type { LineDefinition } from '../../../types';
import { JR_YAMATOJI_STATIONS } from './stations';
import { JR_YAMATOJI_TRAIN_TYPES } from './trainTypes';
import { JR_YAMATOJI_TRACK_SEGMENTS } from './trackGeometry';

export const jrYamatojiLine: LineDefinition = {
  id: 'jr_yamatoji',
  name: 'JR大和路線',
  shortName: '大和路線',
  operator: 'JR西日本',
  lineColor: '#00a960',
  accentColor: '#ffffff',
  defaultCars: 8,
  defaultBounds: [[34.5215,135.4427],[34.8025,135.9203]],
  directionNames: {
    "inbound": "天王寺・JR難波・大阪方面",
    "outbound": "王寺・奈良・加茂方面",
    "inboundFull": "上り 天王寺・JR難波・大阪環状線方面",
    "outboundFull": "下り 王寺・奈良・木津・加茂方面",
    "inboundShort": "JR難波方面",
    "outboundShort": "加茂方面"
},
  stations: JR_YAMATOJI_STATIONS,
  trackSegments: JR_YAMATOJI_TRACK_SEGMENTS,
  trainTypes: JR_YAMATOJI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
