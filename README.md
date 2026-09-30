# Trainfo - 東武東上線 リアルタイム列車位置＆運行マップ

<div align="center">

<img src="docs/logo.svg" alt="Trainfo Logo" width="100" height="100" />

### **Trainfo (トレインフォ)**
**東武東上線の時刻表に基づき、全列車の現在走行位置・種別・行先・遅延状況をリアルタイムに描画するWebアプリケーション**

[![Deploy to GitHub Pages](https://github.com/GenbuHase/Trainfo/actions/workflows/deploy.yml/badge.svg)](https://github.com/GenbuHase/Trainfo/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg)](https://tailwindcss.com/)

🌐 **[オンラインデモを体験する (GitHub Pages)](https://GenbuHase.github.io/Trainfo/)**

</div>

---

## 📸 スクリーンショット

![Trainfo 画面イメージ](docs/screenshot.png)

---

## 🌟 主な機能

### 1. 🚆 リアルタイム列車位置シミュレーション
- **精密な線路追従**: 池袋〜寄居間（全39駅）の実際の線路ポリライン座標に沿って、滑らかな車両移動アニメーションを再現。
- **列車ステータス算出**: リアルタイム走行速度（km/h）、進行方向（上り/下り）、駅間進捗率、遅延分数を自動算出。
- **現在時刻同期**: ワンクリックで実時間に同期し、「今まさに走っている東上線の電車」をモニター可能。

### 2. ⏱️ タイムトラベル＆超高速倍速コントローラー
- **連続タイムスライダー**: 始発（04:30）から深夜最終便の入庫完了（翌01:30）まで、シームレスに時間を巻き戻し・早送り。
- **最大600倍速再生**: `1x`, `2x`, `5x`, `10x`, `30x`, `60x`, `120x`, `300x`, `600x` の9段階でダイヤの1日を素早く通覧。
- **時間帯プリセット**:
  - 🌅 朝ラッシュ（08:00）: 最も過密な運行パターン
  - ☀️ 昼デイタイム（13:00）: 平常運転ダイヤ
  - 🌆 夕ラッシュ（18:30）: 帰宅時間帯の混雑ダイヤ
  - 🌙 深夜終電帯（24:15）: 各方面への最終連絡便

### 3. ⚠️ ダイヤ遅延シミュレーション
- **運行障害シナリオ**:
  - 定刻（平常運転）
  - 全線+5分遅延
  - 全線+15分大幅遅れ
  - ランダム局所遅延（駅や列車ごとに異なるランダムな遅れをシミュレート）
- 運行情報バッジ（平常運転 / 遅延情報）が連動して切り替わります。

### 4. 🎨 公式準拠の運行系統カラーリング
東武鉄道公式の種別カラーを精密に再現：
| 種別 | カラーコード | 表示サンプル |
| :--- | :---: | :--- |
| **普通** | `#1e1c1c` | 黒 |
| **準急** | `#009a74` | エメラルドグリーン |
| **急行** | `#f62837` | レッド |
| **快速急行** | `#005789` | ディープブルー |
| **川越特急** | `#e73799` | マゼンタピンク |
| **TJライナー** | `#ff710a` | オレンジ |

### 5. 📋 発車標・列車追従サイドバー
- **駅情報パネル**:
  - 駅ナンバリング（TJ01〜TJ39）
  - 電光掲示板スタイルの発車標（先発・次発・次々発）
  - 各列車の両数・行先・発車時刻
- **列車追尾モード**:
  - 選択した列車を地図中央に自動追尾
  - 停車駅リストと各駅到着・出発時刻のリアルタイム表示
- **検索機能**: 駅名・列車番号（レ番）・種別でのリアルタイムインクリメンタル検索。

---

## 🛠️ 技術スタック

| 分類 | 技術 / ライブラリ |
| :--- | :--- |
| **フロントエンド** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **ビルドツール** | [Vite 8](https://vite.dev/) (with [Rolldown](https://rolldown.rs/) / [Oxc](https://oxc.rs/)) |
| **スタイリング** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **地図描画** | [Leaflet](https://leafletjs.com/), [OpenStreetMap](https://www.openstreetmap.org/) |
| **デプロイ・CI/CD** | [GitHub Actions](https://github.com/features/actions), [GitHub Pages](https://pages.github.com/) |

---

## 📂 ディレクトリ構成

```text
Trainfo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自動デプロイワークフロー
├── docs/
│   └── screenshot.png          # ドキュメント用スクリーンショット
├── scripts/
│   ├── fetchOfficialTimetables.cjs     # 駅探スクレイピングスクリプト
│   └── generateOptimizedTimetableData.cjs # ダイヤ・経路データ最適化スクリプト
├── src/
│   ├── components/
│   │   ├── Controls/           # タイムスライダー・各種操作パネル
│   │   ├── Map/                # Leaflet 地図描画・マーカー・線路ポリライン
│   │   ├── Modals/             # API設定・使い方モーダル
│   │   └── Sidebar/            # 駅・列車詳細パネル・発車標
│   ├── data/
│   │   ├── stations.ts         # 駅データ（緯度経度・ナンバリング）
│   │   ├── trackCoordinates.ts  # 精密線路ポリライン座標
│   │   └── timetableData.ts    # 時刻表・ダイヤユーティリティ
│   ├── services/
│   │   └── trainSimulation.ts  # 列車走行位置・速度・補間計算エンジン
│   ├── types/                  # TypeScript 型定義
│   ├── App.tsx                 # メインアプリケーションコンポーネント
│   └── main.tsx                # エントリーポイント
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 ローカルでの動かし方

### 前提条件
- [Node.js](https://nodejs.org/) (v20.x 以上推奨)
- npm (v10.x 以上)

### 1. リポジトリのクローン
```bash
git clone https://github.com/GenbuHase/Trainfo.git
cd Trainfo
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:5173/` を開くとアプリケーションが起動します。

### 4. プロダクションビルド＆プレビュー
```bash
npm run build
npm run preview
```

---

## 🚢 デプロイ (GitHub Pages)

### GitHub Actions による自動デプロイ（推奨）
1. 本リポジトリの **Settings** > **Pages** を開きます。
2. **Build and deployment** の **Source** を **「GitHub Actions」** に設定します。
3. `master` または `main` ブランチにコミットをプッシュすると、自動的にビルド＆デプロイが実行されます。

### 手動デプロイ
```bash
npm run deploy
```
（`dist` ディレクトリの内容を `gh-pages` ブランチへ自動プッシュします）

---

## ⚠️ 免責事項・データ出典

- **免責事項**:
  本アプリケーションは個人が学習・研究目的で制作した非公式のファンメイドシミュレータです。**東武鉄道株式会社および関係各社とは一切関係ありません**。
  本アプリに表示される列車の運行状況・時刻・位置情報はシミュレーション値であり、実際の運行管理システムや運行ダイヤとは差異が生じる場合があります。実際の運行情報については[東武鉄道公式運行情報](https://www.tobu.co.jp/)をご確認ください。
- **地図データ**:
  © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- **運行データ参考**:
  駅探（2026年現行ダイヤ参考）

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) のもとで公開されています。

Copyright (c) 2026 長谷 玄武 (Genbu Hase)
