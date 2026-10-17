import type { LineDefinition } from '../../../types';
import { NIHONKAI_HISUI_STATIONS } from './stations';
import { NIHONKAI_HISUI_TRACK_SEGMENTS } from './trackGeometry';
import { NIHONKAI_HISUI_TRAIN_TYPES } from './trainTypes';

export const nihonkaiHisuiLine: LineDefinition = {
  id: 'nihonkai_hisui',
  name: 'えちごトキめき鉄道日本海ひすいライン',
  shortName: '日本海ひすいライン',
  operator: 'えちごトキめき鉄道',
  lineColor: '#009bb3',
  accentColor: '#8cc63f',
  defaultCars: 1,
  defaultBounds: [
    [36.930, 137.600],
    [37.220, 138.292],
  ],
  directionNames: {
    inbound: '泊方面',
    outbound: '直江津方面',
    inboundFull: '上り 糸魚川・泊方面',
    outboundFull: '下り 谷浜・直江津方面',
    inboundShort: '泊方面',
    outboundShort: '直江津方面',
  },
  stations: NIHONKAI_HISUI_STATIONS,
  trackSegments: NIHONKAI_HISUI_TRACK_SEGMENTS,
  trainTypes: NIHONKAI_HISUI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
