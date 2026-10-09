// 全路線の直通運転ペア宣言的設定ファイル (汎用直通リンカー基盤)
// 新規路線を追加する際は、この配列に接続ペア（路線A、路線B、境界駅、方向、許容秒数）を宣言するだけで自動接続されます。

module.exports = {
  connections: [
    // 1. 東急東横線 ↔ 東急新横浜線 (日吉駅)
    {
      name: '東横線 -> 東急新横浜線 (下り)',
      lineA: 'tokyu_toyoko',
      lineB: 'tokyu_shin_yokohama',
      stationA: 'TY-13',
      stationB: 'SH-03',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },
    {
      name: '東急新横浜線 -> 東横線 (上り)',
      lineA: 'tokyu_shin_yokohama',
      lineB: 'tokyu_toyoko',
      stationA: 'SH-03',
      stationB: 'TY-13',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 300,
    },

    // 2. 東急新横浜線 ↔ 相鉄新横浜線 (新横浜駅)
    {
      name: '東急新横浜線 -> 相鉄新横浜線 (下り)',
      lineA: 'tokyu_shin_yokohama',
      lineB: 'sotetsu_shin_yokohama',
      stationA: 'SH-01',
      stationB: 'SO-52',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 360,
    },
    {
      name: '相鉄新横浜線 -> 東急新横浜線 (上り)',
      lineA: 'sotetsu_shin_yokohama',
      lineB: 'tokyu_shin_yokohama',
      stationA: 'SO-52',
      stationB: 'SH-01',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 360,
    },

    // 3. 相鉄新横浜線 ↔ 相鉄本線 (西谷駅)
    {
      name: '相鉄新横浜線 -> 相鉄本線 (下り)',
      lineA: 'sotetsu_shin_yokohama',
      lineB: 'sotetsu_main',
      stationA: 'SO-08',
      stationB: 'SO-08',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 360,
    },
    {
      name: '相鉄本線 -> 相鉄新横浜線 (上り)',
      lineA: 'sotetsu_main',
      lineB: 'sotetsu_shin_yokohama',
      stationA: 'SO-08',
      stationB: 'SO-08',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 360,
    },

    // 4. 相鉄本線 ↔ 相鉄いずみ野線 (二俣川駅)
    {
      name: '相鉄本線 -> 相鉄いずみ野線 (下り)',
      lineA: 'sotetsu_main',
      lineB: 'sotetsu_izumino',
      stationA: 'SO-10',
      stationB: 'SO-10',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },
    {
      name: '相鉄いずみ野線 -> 相鉄本線 (上り)',
      lineA: 'sotetsu_izumino',
      lineB: 'sotetsu_main',
      stationA: 'SO-10',
      stationB: 'SO-10',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 300,
    },

    // 5. 相鉄・JR直通線 ↔ 相鉄新横浜線 (羽沢横浜国大駅)
    {
      name: '相鉄・JR直通線 -> 相鉄新横浜線 (下り)',
      lineA: 'sotetsu_jr_direct',
      lineB: 'sotetsu_shin_yokohama',
      stationA: 'SO-51',
      stationB: 'SO-51',
      dirA: 'inbound',
      dirB: 'outbound',
      maxTimeDiff: 360,
    },
    {
      name: '相鉄新横浜線 -> 相鉄・JR直通線 (上り)',
      lineA: 'sotetsu_shin_yokohama',
      lineB: 'sotetsu_jr_direct',
      stationA: 'SO-51',
      stationB: 'SO-51',
      dirA: 'inbound',
      dirB: 'outbound',
      maxTimeDiff: 360,
    },

    // 6. 東京メトロ副都心線 ↔ 東急東横線 (渋谷駅)
    {
      name: '副都心線 -> 東横線 (下り)',
      lineA: 'fukutoshin',
      lineB: 'tokyu_toyoko',
      stationA: 'F-16',
      stationB: 'TY-01',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },
    {
      name: '東横線 -> 副都心線 (上り)',
      lineA: 'tokyu_toyoko',
      lineB: 'fukutoshin',
      stationA: 'TY-01',
      stationB: 'F-16',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 300,
    },

    // 7. 東急東横線 ↔ みなとみらい線 (横浜駅)
    {
      name: '東横線 -> みなとみらい線 (下り)',
      lineA: 'tokyu_toyoko',
      lineB: 'minatomirai',
      stationA: 'TY-21',
      stationB: 'MM-01',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 240,
    },
    {
      name: 'みなとみらい線 -> 東横線 (上り)',
      lineA: 'minatomirai',
      lineB: 'tokyu_toyoko',
      stationA: 'MM-01',
      stationB: 'TY-21',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 240,
    },

    // 8. JR埼京線 ↔ りんかい線 (大崎駅)
    {
      name: '埼京線 -> りんかい線 (上り)',
      lineA: 'saikyo',
      lineB: 'rinkai',
      stationA: 'JA-08',
      stationB: 'R-08',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 300,
    },
    {
      name: 'りんかい線 -> 埼京線 (下り)',
      lineA: 'rinkai',
      lineB: 'saikyo',
      stationA: 'R-08',
      stationB: 'JA-08',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },

    // 9. JR川越線 ↔ JR埼京線 (大宮駅)
    {
      name: '川越線 -> 埼京線 (上り)',
      lineA: 'kawagoe',
      lineB: 'saikyo',
      stationA: 'JA-26',
      stationB: 'JA-26',
      dirA: 'inbound',
      dirB: 'inbound',
      maxTimeDiff: 300,
    },
    {
      name: '埼京線 -> 川越線 (下り)',
      lineA: 'saikyo',
      lineB: 'kawagoe',
      stationA: 'JA-26',
      stationB: 'JA-26',
      dirA: 'outbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },

    // 10. 東京メトロ副都心線 ↔ 東武東上線 (和光市駅)
    {
      name: '副都心線 -> 東武東上線 (上り/下り直通)',
      lineA: 'fukutoshin',
      lineB: 'tojo',
      stationA: 'F-01',
      stationB: 'TJ-11',
      dirA: 'inbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },
    {
      name: '東武東上線 -> 副都心線 (上り/下り直通)',
      lineA: 'tojo',
      lineB: 'fukutoshin',
      stationA: 'TJ-11',
      stationB: 'F-01',
      dirA: 'inbound',
      dirB: 'outbound',
      maxTimeDiff: 300,
    },
  ],
};
