import type { LineDefinition } from '../../../types';
import { HAKONE_TOZAN_STATIONS } from './stations';
import { HAKONE_TOZAN_TRACK_SEGMENTS } from './trackGeometry';
import { HAKONE_TOZAN_TRAIN_TYPES } from './trainTypes';

export const hakoneTozanLine: LineDefinition = {
  id: 'hakone_tozan',
  name: '小田急箱根鉄道線（箱根登山電車）',
  shortName: '箱根登山電車',
  operator: '小田急箱根',
  area: 'kanto',
  lineColor: '#dc3c00',
  accentColor: '#2288cc',
  defaultCars: 3,
  defaultBounds: [
    [35.2183, 139.0333],
    [35.2713, 139.1703],
  ],
  directionNames: {
    "inbound": "箱根湯本・小田原方面",
    "outbound": "大平台・強羅方面",
    "inboundFull": "上り 箱根湯本・小田原方面",
    "outboundFull": "下り 大平台・強羅方面",
    "inboundShort": "箱根湯本",
    "outboundShort": "大平台"
},
  stations: HAKONE_TOZAN_STATIONS,
  trackSegments: HAKONE_TOZAN_TRACK_SEGMENTS,
  trainTypes: HAKONE_TOZAN_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
