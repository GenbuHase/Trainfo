/**
 * PWA Service Worker 登録 & インストールプロンプト管理
 */

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type PwaInstallCallback = (canInstall: boolean) => void;

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<PwaInstallCallback>();

/**
 * 既にPWAアプリとして起動中かどうかを判定
 */
export function isRunningStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

/**
 * iOS Safari かどうかを判定
 */
export function isIosSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  const isWebkit = /webkit/.test(ua);
  const isNotOther = !/crios|fxios|opios|mercury/.test(ua);
  return isIos && isWebkit && isNotOther;
}

/**
 * Service Worker を登録
 */
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // 相対パス './sw.js' で GitHub Pages でもローカルでも正しく登録
      navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
          // 新しいサービスワーカーが見つかった場合の自動更新チェック
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[PWA] New content is available; please refresh.');
                  } else {
                    console.log('[PWA] Content is cached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
        });
    });
  }

  // PWAインストールプロンプトの捕捉
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
      // ブラウザ標準のミニバナーを抑制し、任意のタイミングでカスタムUIから呼び出せるようにする
      e.preventDefault();
      deferredPrompt = e as BeforeInstallPromptEvent;
      notifyListeners(true);
    });

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Trainfo app was installed!');
      deferredPrompt = null;
      notifyListeners(false);
    });
  }
}

function notifyListeners(canInstall: boolean) {
  listeners.forEach((cb) => cb(canInstall));
}

/**
 * インストール可能状態の変化を購読
 */
export function subscribeInstallState(callback: PwaInstallCallback): () => void {
  listeners.add(callback);
  callback(deferredPrompt !== null);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * アプリのインストールダイアログを起動
 */
export async function promptPwaInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferredPrompt) {
    return 'unavailable';
  }

  try {
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    deferredPrompt = null;
    notifyListeners(false);
    return choiceResult.outcome;
  } catch (err) {
    console.error('[PWA] Error calling prompt():', err);
    return 'unavailable';
  }
}

/**
 * 現在インストールプロンプトを表示可能か
 */
export function canPromptPwaInstall(): boolean {
  return deferredPrompt !== null;
}
