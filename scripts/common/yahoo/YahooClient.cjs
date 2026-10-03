// Yahoo! 路線情報 HTTP クライアント（キャッシュ & レートリミット制御）
const fs = require('fs');
const path = require('path');

class YahooClient {
  /**
   * @param {Object} options
   * @param {string} options.cacheDir - キャッシュ保存先ディレクトリ
   * @param {number} [options.delayMs=250] - リクエスト間隔（ミリ秒）
   * @param {boolean} [options.bypassCache=false] - キャッシュを無視して再取得するかどうか
   * @param {number} [options.maxRetries=3] - エラー時の最大リトライ回数
   */
  constructor(options = {}) {
    this.cacheDir = options.cacheDir || path.resolve(__dirname, '../../cache/yahoo/default');
    this.delayMs = options.delayMs !== undefined ? options.delayMs : 250;
    this.bypassCache = options.bypassCache || false;
    this.maxRetries = options.maxRetries || 3;
    this.lastRequestTime = 0;

    // キャッシュディレクトリの作成
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * スリープ待機
   * @param {number} ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * レートリミット遵守待機
   */
  async throttle() {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    if (elapsed < this.delayMs) {
      await this.sleep(this.delayMs - elapsed);
    }
    this.lastRequestTime = Date.now();
  }

  /**
   * キャッシュファイルパスの解決
   * @param {string} cacheKey
   * @param {string} [subDir='']
   */
  getCacheFilePath(cacheKey, subDir = '') {
    const targetDir = subDir ? path.join(this.cacheDir, subDir) : this.cacheDir;
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const safeKey = cacheKey.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
    return path.join(targetDir, `${safeKey}.json`);
  }

  /**
   * キャッシュからの読み出し
   * @param {string} cacheKey
   * @param {string} [subDir='']
   */
  readCache(cacheKey, subDir = '') {
    if (this.bypassCache) return null;
    const filePath = this.getCacheFilePath(cacheKey, subDir);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      } catch (err) {
        console.warn(`[YahooClient] Failed to read cache: ${filePath}`, err.message);
        return null;
      }
    }
    return null;
  }

  /**
   * キャッシュへの書き込み
   * @param {string} cacheKey
   * @param {any} data
   * @param {string} [subDir='']
   */
  writeCache(cacheKey, data, subDir = '') {
    const filePath = this.getCacheFilePath(cacheKey, subDir);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.warn(`[YahooClient] Failed to write cache: ${filePath}`, err.message);
    }
  }

  /**
   * 指定URLから __NEXT_DATA__ JSON を取得（キャッシュ対応）
   * @param {string} url
   * @param {Object} [options]
   * @param {string} [options.cacheKey]
   * @param {string} [options.subDir]
   */
  async fetchNextData(url, options = {}) {
    const { cacheKey, subDir } = options;

    if (cacheKey) {
      const cached = this.readCache(cacheKey, subDir);
      if (cached) {
        return cached;
      }
    }

    let retries = 0;
    while (retries <= this.maxRetries) {
      try {
        await this.throttle();

        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          }
        });

        if (res.status === 429 || res.status === 503) {
          retries++;
          const waitTime = Math.pow(2, retries) * 1000;
          console.warn(`[YahooClient] HTTP ${res.status}. Backing off for ${waitTime}ms... (retry ${retries}/${this.maxRetries})`);
          await this.sleep(waitTime);
          continue;
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
        }

        const html = await res.text();
        const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
        if (!match) {
          throw new Error(`__NEXT_DATA__ script not found in ${url}`);
        }

        const nextData = JSON.parse(match[1]);
        const pageProps = nextData.props?.pageProps;

        if (!pageProps) {
          throw new Error(`pageProps not found in __NEXT_DATA__ for ${url}`);
        }

        if (cacheKey) {
          this.writeCache(cacheKey, pageProps, subDir);
        }

        return pageProps;
      } catch (err) {
        retries++;
        if (retries > this.maxRetries) {
          throw err;
        }
        const waitTime = Math.pow(2, retries) * 1000;
        console.warn(`[YahooClient] Error: ${err.message}. Retrying in ${waitTime}ms... (${retries}/${this.maxRetries})`);
        await this.sleep(waitTime);
      }
    }
  }
}

module.exports = YahooClient;
