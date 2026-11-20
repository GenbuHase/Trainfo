import type { LineDefinition } from '../../../types';
import { TOKYU_MEGURO_STATIONS } from './stations';
import { TOKYU_MEGURO_TRACK_SEGMENTS } from './trackGeometry';
import { TOKYU_MEGURO_TRAIN_TYPES } from './trainTypes';

export const tokyuMeguroLine: LineDefinition = {
  id: 'tokyu_meguro',
  name: '東急目黒線',
  shortName: '目黒線',
  operator: '東急電鉄',
  area: 'kanto',
  lineColor: '#009cd2',
  accentColor: '#0074a0',
  defaultCars: 8,
  defaultBounds: [
    [35.5385, 139.6319],
    [35.6475, 139.7307],
  ],
  directionNames: {
    "inbound": "目黒・南北線・三田線方面",
    "outbound": "武蔵小杉・日吉・新横浜方面",
    "inboundFull": "上り 目黒・南北線・三田線方面",
    "outboundFull": "下り 武蔵小杉・日吉・新横浜方面",
    "inboundShort": "目黒",
    "outboundShort": "武蔵小杉"
},
  stations: TOKYU_MEGURO_STATIONS,
  trackSegments: TOKYU_MEGURO_TRACK_SEGMENTS,
  trainTypes: TOKYU_MEGURO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
