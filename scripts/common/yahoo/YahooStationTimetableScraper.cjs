// Yahoo! 路線情報 駅時刻表スクレイパー & 発車標フォーマッタ
const YahooClient = require('./YahooClient.cjs');

class YahooStationTimetableScraper {
  /**
   * @param {YahooClient} client
   * @param {Object} config - LineScraperConfig
   */
  constructor(client, config) {
    this.client = client;
    this.config = config;
  }

  /**
   * 単一駅・方向・曜日の時刻表を取得してパース
   * @param {Object} station
   * @param {string} groupId
   * @param {number} kind - 1 (平日) または 4 (土休日)
   * @param {'inbound' | 'outbound'} direction
   * @param {'weekday' | 'holiday'} dayKey
   * @returns {Promise<{ departures: Array, trainRefs: Array }>}
   */
  async fetchStationTimetable(station, groupId, kind, direction, dayKey) {
    if (!groupId) {
      return { departures: [], trainRefs: [] };
    }

    const url = `https://transit.yahoo.co.jp/timetable/${station.yahooStationId}/${groupId}?kind=${kind}`;
    const cacheKey = `station_${station.id}_${groupId}_k${kind}`;

    const pageProps = await this.client.fetchNextData(url, {
      cacheKey,
      subDir: 'stations',
    });

    const tt = pageProps.timetableItem;
    if (!tt || !tt.hourTimeTable) {
      console.warn(`[StationScraper] No timetableItem found for ${station.name} (${url})`);
      return { departures: [], trainRefs: [] };
    }

    // マスター辞書の構築
    const kindMap = new Map();
    (tt.master?.kind || []).forEach(k => kindMap.set(k.id, k.name));

    const destMap = new Map();
    (tt.master?.destination || []).forEach(d => destMap.set(d.id, d.name));

    const departures = [];
    const trainRefs = [];

    for (const hourItem of tt.hourTimeTable) {
      const hourStr = hourItem.hour;
      const hourNum = parseInt(hourStr, 10);
      if (isNaN(hourNum)) continue;

      for (const train of hourItem.minTimeTable || []) {
        const minStr = train.minute.padStart(2, '0');
        const minNum = parseInt(minStr, 10);

        const rawKindName = train.trainName || kindMap.get(train.kindId) || '普通';
        const rawDestName = destMap.get(train.destinationId) || '';

        // 種別の正規化
        const trainTypeKey = this.config.trainTypeMap[rawKindName] || 'local';

        // 行先名の正規化
        const destName = this.config.stationNameAliases?.[rawDestName] || rawDestName;

        const sec = hourNum * 3600 + minNum * 60;

        departures.push({
          h: hourNum,
          m: minNum,
          time: minStr,
          sec,
          t: trainTypeKey,
          d: destName,
          no: train.trainId,
          track: train.trackNumber || undefined,
        });

        trainRefs.push({
          trainId: train.trainId,
          yahooStationId: station.yahooStationId,
          stationId: station.id,
          groupId,
          kind,
          hh: hourStr,
          mm: minStr,
          dayKey,
          direction,
          trainType: trainTypeKey,
          destination: destName,
          trackNumber: train.trackNumber,
        });
      }
    }

    // 発車時刻（秒数）で昇順ソート
    departures.sort((a, b) => a.sec - b.sec);

    return { departures, trainRefs };
  }

  /**
   * 全駅の平日・土休日時刻表を一括スクレイピング
   * @param {Object} [options]
   * @param {function} [options.onProgress]
   * @returns {Promise<{ store: Object, uniqueTrains: Array }>}
   */
  async scrapeAllStations(options = {}) {
    const { onProgress } = options;
    const store = {
      weekday: {},
      holiday: {},
    };

    const uniqueTrainMap = new Map(); // trainId -> TrainRef
    const days = [
      { key: 'weekday', kind: 1, label: '平日' },
      { key: 'holiday', kind: 4, label: '土休日' },
    ];

    const totalSteps = this.config.stations.length * days.length;
    let completedSteps = 0;

    for (const day of days) {
      for (const st of this.config.stations) {
        if (!store[day.key][st.id]) {
          store[day.key][st.id] = {
            inbound: [],
            outbound: [],
          };
        }

        // 下り (outbound)
        if (st.outGroupId) {
          const res = await this.fetchStationTimetable(st, st.outGroupId, day.kind, 'outbound', day.key);
          store[day.key][st.id].outbound = res.departures;
          for (const ref of res.trainRefs) {
            const trainKey = `${ref.dayKey}_${ref.trainId}`;
            if (!uniqueTrainMap.has(trainKey)) {
              uniqueTrainMap.set(trainKey, ref);
            }
          }
        }

        // 上り (inbound)
        if (st.inGroupId) {
          const res = await this.fetchStationTimetable(st, st.inGroupId, day.kind, 'inbound', day.key);
          store[day.key][st.id].inbound = res.departures;
          for (const ref of res.trainRefs) {
            const trainKey = `${ref.dayKey}_${ref.trainId}`;
            if (!uniqueTrainMap.has(trainKey)) {
              uniqueTrainMap.set(trainKey, ref);
            }
          }
        }

        completedSteps++;
        if (onProgress) {
          onProgress({
            step: completedSteps,
            total: totalSteps,
            station: st,
            day: day.key,
            uniqueTrainsCount: uniqueTrainMap.size,
          });
        }
      }
    }

    const uniqueTrains = Array.from(uniqueTrainMap.values());
    return { store, uniqueTrains };
  }
}

module.exports = YahooStationTimetableScraper;
