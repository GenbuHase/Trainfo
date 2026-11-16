import type { TrainTypeConfig } from '../../../types';

export const TOKAIDO_SHINKANSEN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  nozomi: {
    key: 'nozomi',
    name: 'のぞみ',
    nameEn: 'Nozomi',
    shortName: 'のぞみ',
    color: '#f39700',
    textColor: '#ffffff',
    bgColor: '#f39700',
    borderColor: '#d98200',
  },
  hikari: {
    key: 'hikari',
    name: 'ひかり',
    nameEn: 'Hikari',
    shortName: 'ひかり',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
  kodama: {
    key: 'kodama',
    name: 'こだま',
    nameEn: 'Kodama',
    shortName: 'こだま',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#005a96',
  },
};
