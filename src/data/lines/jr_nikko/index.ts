import type { LineDefinition } from '../../../types';
import { JR_NIKKO_STATIONS } from './stations';
import { JR_NIKKO_TRACK_SEGMENTS } from './trackGeometry';
import { JR_NIKKO_TRAIN_TYPES } from './trainTypes';

export const jrNikkoLine: LineDefinition = {
  id: 'jr_nikko',
  name: 'JR日光線',
  shortName: '日光線',
  operator: 'JR東日本',
  area: 'kanto',
  lineColor: '#880e4f',
  accentColor: '#560027',
  defaultCars: 4,
  defaultBounds: [
    [36.5232, 139.6065],
    [36.7629, 139.9134],
  ],
  directionNames: {
    "inbound": "宇都宮方面",
    "outbound": "日光方面",
    "inboundFull": "上り 宇都宮方面",
    "outboundFull": "下り 日光方面",
    "inboundShort": "宇都宮方面",
    "outboundShort": "日光方面"
},
  stations: JR_NIKKO_STATIONS,
  trackSegments: JR_NIKKO_TRACK_SEGMENTS,
  trainTypes: JR_NIKKO_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
