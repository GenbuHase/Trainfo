import type { LineDefinition } from '../../../types';
import { SEIBU_TAMAKO_STATIONS } from './stations';
import { SEIBU_TAMAKO_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_TAMAKO_TRAIN_TYPES } from './trainTypes';

export const seibuTamakoLine: LineDefinition = {
  id: 'seibu_tamako',
  name: '西武多摩湖線',
  shortName: '多摩湖線',
  operator: '西武鉄道',
  area: 'kanto',
  lineColor: '#f5a200',
  accentColor: '#c47900',
  defaultCars: 4,
  defaultBounds: [
    [35.6861, 139.4276],
    [35.7815, 139.4950],
  ],
  directionNames: {
    "inbound": "萩山・国分寺方面",
    "outbound": "多摩湖方面",
    "inboundFull": "上り 萩山・国分寺方面",
    "outboundFull": "下り 多摩湖方面",
    "inboundShort": "萩山",
    "outboundShort": "多摩湖方面"
},
  stations: SEIBU_TAMAKO_STATIONS,
  trackSegments: SEIBU_TAMAKO_TRACK_SEGMENTS,
  trainTypes: SEIBU_TAMAKO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
