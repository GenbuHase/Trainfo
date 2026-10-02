// Yahoo! 路線情報 列車詳細スクレイパー（確定停車駅着発時刻の取得）
const YahooClient = require('./YahooClient.cjs');

class YahooTrainDetailScraper {
  /**
   * @param {YahooClient} client
   * @param {Object} config - LineScraperConfig
   */
  constructor(client, config) {
    this.client = client;
    this.config = config;
  }

  /**
   * 単一列車の詳細データを取得
   * @param {Object} trainRef
   * @returns {Promise<Object|null>}
   */
  async fetchTrainDetail(trainRef) {
    const { yahooStationId, groupId, trainId, kind, hh, mm, dayKey } = trainRef;
    const url = `https://transit.yahoo.co.jp/timetable/${yahooStationId}/${groupId}/${trainId}?kind=${kind}&hh=${hh}&mm=${mm}`;
    const cacheKey = `train_${dayKey}_${trainId}`;

    try {
      const pageProps = await this.client.fetchNextData(url, {
        cacheKey,
        subDir: 'trains',
      });

      const tr = pageProps.timetableStationTrainResult;
      if (!tr || !tr.timetable) {
        console.warn(`[TrainScraper] No timetable in train result for trainId: ${trainId} (${url})`);
        return null;
      }

      return {
        trainId,
        dayKey,
        direction: trainRef.direction,
        displayName: tr.timetable.displayName,
        driveComment: tr.timetable.driveComment,
        stopStation: tr.timetable.stopStation || [],
      };
    } catch (err) {
      console.error(`[TrainScraper] Failed to fetch train ${trainId}:`, err.message);
      return null;
    }
  }

  /**
   * 列車リストを一括スクレイピング
   * @param {Array<Object>} trainRefs
   * @param {Object} [options]
   * @param {function} [options.onProgress]
   * @returns {Promise<Map<string, Object>>} trainId -> detail
   */
  async scrapeAllTrains(trainRefs, options = {}) {
    const { onProgress } = options;
    const results = new Map();
    const total = trainRefs.length;

    for (let i = 0; i < total; i++) {
      const ref = trainRefs[i];
      const detail = await this.fetchTrainDetail(ref);
      if (detail) {
        const trainKey = `${ref.dayKey}_${ref.trainId}`;
        results.set(trainKey, detail);
      }

      if (onProgress) {
        onProgress({
          index: i + 1,
          total,
          percent: (((i + 1) / total) * 100).toFixed(1),
          trainRef: ref,
          success: !!detail,
        });
      }
    }

    return results;
  }
}

module.exports = YahooTrainDetailScraper;
