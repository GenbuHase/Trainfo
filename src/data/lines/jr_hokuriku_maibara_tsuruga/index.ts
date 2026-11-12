import type { LineDefinition } from '../../../types';
import { JR_HOKURIKU_MAIBARA_TSURUGA_STATIONS } from './stations';
import { JR_HOKURIKU_MAIBARA_TSURUGA_TRAIN_TYPES } from './trainTypes';
import { JR_HOKURIKU_MAIBARA_TSURUGA_TRACK_SEGMENTS } from './trackGeometry';

export const jrHokurikuMaibaraTsurugaLine: LineDefinition = {
  id: 'jr_hokuriku_maibara_tsuruga',
  name: 'JR北陸本線（米原～敦賀）',
  shortName: '北陸本線（米原～敦賀）',
  operator: 'JR西日本',
  lineColor: '#0072bc',
  accentColor: '#ffffff',
  defaultCars: 4,
  defaultBounds: [[35.2653,136.0279],[35.6958,136.3397]],
  directionNames: {
    "inbound": "長浜・米原方面",
    "outbound": "近江塩津・敦賀方面",
    "inboundFull": "上り 長浜・米原・京都方面",
    "outboundFull": "下り 木ノ本・近江塩津・敦賀方面",
    "inboundShort": "米原方面",
    "outboundShort": "敦賀方面"
},
  stations: JR_HOKURIKU_MAIBARA_TSURUGA_STATIONS,
  trackSegments: JR_HOKURIKU_MAIBARA_TSURUGA_TRACK_SEGMENTS,
  trainTypes: JR_HOKURIKU_MAIBARA_TSURUGA_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
