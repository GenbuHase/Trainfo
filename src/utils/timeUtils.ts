// ======================================================================
// 時刻変換・現在時刻取得ユーティリティ
// 深夜0時跨ぎ（24:00〜27:59等）のダイヤ表現に対応
// ======================================================================

/**
 * 時刻文字列 ("HH:MM" または "HH:MM:SS") を 00:00 からの経過秒数に変換する
 * （深夜 0:00〜3:59 は翌日 24:00〜27:59 として扱う）
 */
export function timeStringToSeconds(t: string): number {
  const [h, m, s] = t.split(':').map(Number);
  const normalizedHour = h < 4 ? h + 24 : h;
  return normalizedHour * 3600 + m * 60 + (s || 0);
}

/**
 * 経過秒数を "HH:MM:SS" 形式に変換する
 * （24時以降は 00:xx:xx 表記へ正規化）
 */
export function secondsToTimeString(sec: number): string {
  const normalized = ((Math.floor(sec) % 86400) + 86400) % 86400;
  const h = Math.floor(normalized / 3600).toString().padStart(2, '0');
  const m = Math.floor((normalized % 3600) / 60).toString().padStart(2, '0');
  const s = (normalized % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/**
 * 経過秒数を HTML `<input type="time">` 用の "HH:MM" 形式に変換する
 */
export function secondsToHHMM(sec: number): string {
  return secondsToTimeString(sec).slice(0, 5);
}

/**
 * HTML `<input type="time">` 等の "HH:MM" / "HH:MM:SS" 文字列を経過秒数に変換する
 * （深夜 0:00〜3:59 は 24:00〜27:59 として扱う）
 */
export function hhmmToSeconds(hhmm: string, referenceSec?: number): number {
  const parts = hhmm.trim().split(':').map(Number);
  if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
    return referenceSec ?? 12 * 3600;
  }
  const h = parts[0];
  const m = parts[1];
  const s = parts[2] || 0;
  const normalizedH = h < 4 ? h + 24 : h;
  let result = normalizedH * 3600 + m * 60 + s;
  if (referenceSec !== undefined && result < referenceSec - 12 * 3600) {
    result += 86400;
  }
  return result;
}

/**
 * 現在のリアルタイム時刻（秒）を取得する（深夜 0:00〜3:59 は翌日 24:00〜27:59 として計算）
 */
export function getRealCurrentSeconds(): number {
  const now = new Date();
  const h = now.getHours();
  const normalizedHour = h < 4 ? h + 24 : h;
  return normalizedHour * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

/**
 * 現在の日付が土休日（土曜・日曜）かどうかを判定する
 */
export function isCurrentDayWeekend(): boolean {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}
