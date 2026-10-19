import type { Station } from '../../../types';

export const TOBU_KOIZUMI_BRANCH_STATIONS: Station[] = [
  {
    id: 'TI-44',
    stationNumber: 'TI-44',
    lineId: 'tobu_koizumi_branch',
    number: 1,
    name: '東小泉',
    nameKana: 'ひがしこいずみ',
    nameEn: 'Higashi-Koizumi',
    lat: 36.2596844,
    lng: 139.4285654,
    transfers: [
      '東武小泉線',
    ],
    address: '群馬県邑楽郡大泉町東小泉一丁目1-1',
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: true,
    },
    stoppingTypes: [
      'local',
    ],
    isMajor: true,
    platforms: {
      inbound: '1番線',
      outbound: '2番線',
    },
  },
  {
    id: 'TI-47',
    stationNumber: 'TI-47',
    lineId: 'tobu_koizumi_branch',
    number: 2,
    name: '竜舞',
    nameKana: 'りゅうまい',
    nameEn: 'Ryumai',
    lat: 36.278773,
    lng: 139.4090886,
    transfers: [
      '東武小泉線',
    ],
    address: '群馬県太田市龍舞町2103',
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: true,
    },
    stoppingTypes: [
      'local',
    ],
    isMajor: false,
    platforms: {
      inbound: '1番線',
      outbound: '2番線',
    },
  },
  {
    id: 'TI-18',
    stationNumber: 'TI-18',
    lineId: 'tobu_koizumi_branch',
    number: 3,
    name: '太田',
    nameKana: 'おおた',
    nameEn: 'Ota',
    lat: 36.293907,
    lng: 139.3787178,
    transfers: [
      '東武伊勢崎線',
      '東武桐生線',
      '東武小泉線',
    ],
    address: '群馬県太田市東本町16-1',
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: true,
    },
    stoppingTypes: [
      'local',
    ],
    isMajor: true,
    platforms: {
      inbound: '1番線',
      outbound: '2番線',
    },
  },
];
