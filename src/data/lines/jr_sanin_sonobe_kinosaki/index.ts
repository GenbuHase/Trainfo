import type { LineDefinition } from '../../../types';
import { JR_SANIN_SONOBE_KINOSAKI_STATIONS } from './stations';
import { JR_SANIN_SONOBE_KINOSAKI_TRAIN_TYPES } from './trainTypes';
import { JR_SANIN_SONOBE_KINOSAKI_TRACK_SEGMENTS } from './trackGeometry';

export const jrSaninSonobeKinosakiLine: LineDefinition = {
  id: 'jr_sanin_sonobe_kinosaki',
  name: 'JR山陰本線（園部～城崎温泉）',
  shortName: '山陰本線（園部～城崎温泉）',
  operator: 'JR西日本',
  lineColor: '#884898',
  accentColor: '#ffffff',
  defaultCars: 2,
  defaultBounds: [[35.0522,134.7257],[35.6737,135.5535]],
  directionNames: {
  "inbound": "綾部・園部・京都方面",
  "outbound": "福知山・豊岡・城崎温泉方面",
  "inboundFull": "上り 綾部・園部・京都方面",
  "outboundFull": "下り 福知山・豊岡・城崎温泉方面",
  "inboundShort": "園部方面",
  "outboundShort": "城崎温泉方面"
},
  stations: JR_SANIN_SONOBE_KINOSAKI_STATIONS,
  trackSegments: JR_SANIN_SONOBE_KINOSAKI_TRACK_SEGMENTS,
  trainTypes: JR_SANIN_SONOBE_KINOSAKI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
