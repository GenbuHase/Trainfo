import type { LineDefinition } from '../../../types';
import { JR_KANSAI_KAMEYAMA_KAMO_STATIONS } from './stations';
import { JR_KANSAI_KAMEYAMA_KAMO_TRAIN_TYPES } from './trainTypes';
import { JR_KANSAI_KAMEYAMA_KAMO_TRACK_SEGMENTS } from './trackGeometry';

export const jrKansaiKameyamaKamoLine: LineDefinition = {
  id: 'jr_kansai_kameyama_kamo',
  name: 'JR関西本線（亀山～加茂）',
  shortName: '関西本線（亀山～加茂）',
  operator: 'JR西日本',
  lineColor: '#800080',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[34.7025,135.8203],[34.9017,136.5028]],
  directionNames: {
  "inbound": "加茂・奈良方面",
  "outbound": "柘植・亀山方面",
  "inboundFull": "上り 加茂・奈良方面",
  "outboundFull": "下り 柘植・亀山方面",
  "inboundShort": "加茂方面",
  "outboundShort": "亀山方面"
},
  stations: JR_KANSAI_KAMEYAMA_KAMO_STATIONS,
  trackSegments: JR_KANSAI_KAMEYAMA_KAMO_TRACK_SEGMENTS,
  trainTypes: JR_KANSAI_KAMEYAMA_KAMO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
