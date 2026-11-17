import type { TrainTypeConfig } from '../../../types';

export const HOKURIKU_SHINKANSEN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  kagayaki: {
    key: 'kagayaki',
    name: 'かがやき',
    nameEn: 'Kagayaki',
    shortName: 'かがやき',
    color: '#c5a059',
    textColor: '#ffffff',
    bgColor: '#b82e2e',
    borderColor: '#c5a059',
  },
  hakutaka: {
    key: 'hakutaka',
    name: 'はくたか',
    nameEn: 'Hakutaka',
    shortName: 'はくたか',
    color: '#6d3b84',
    textColor: '#ffffff',
    bgColor: '#6d3b84',
    borderColor: '#522b63',
  },
  asama: {
    key: 'asama',
    name: 'あさま',
    nameEn: 'Asama',
    shortName: 'あさま',
    color: '#0078b6',
    textColor: '#ffffff',
    bgColor: '#0078b6',
    borderColor: '#005a8a',
  },
  tsurugi: {
    key: 'tsurugi',
    name: 'つるぎ',
    nameEn: 'Tsurugi',
    shortName: 'つるぎ',
    color: '#1d3d63',
    textColor: '#ffffff',
    bgColor: '#1d3d63',
    borderColor: '#132841',
  },
};
