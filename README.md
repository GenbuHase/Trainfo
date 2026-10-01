# Trainfo - 首都圏 リアルタイム列車位置＆マルチ路線運行マップ

<div align="center">

<img src="docs/logo.svg" alt="Trainfo Logo" width="100" height="100" />

### **Trainfo (トレインフォ)**
**東武東上線＆JR埼京線・川越線の時刻表に基づき、全列車の現在走行位置・種別・行先・遅延状況をリアルタイムに描画するWebアプリケーション**

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

### 1. 🚆 複数路線（東上線 ＆ 埼京線）リアルタイム列車位置シミュレーション
- **精密な線路追従**:
  - **東武東上線**（池袋〜寄居：全39駅）
  - **JR埼京線・川越線**（大崎〜大宮〜川越：全24駅）
  - 実際の線路ポリライン座標に沿って、滑らかな車両移動アニメーションを再現。
- **ターミナル接続**: 池袋駅・川越駅で両路線が交差し、同じ目的地へ向かう並行・競合列車のリアルタイム運行をパノラマでモニター可能。
- **列車ステータス算出**: リアルタイム走行速度（km/h）、進行方向、駅間進捗率、遅延分数を自動算出。
- **現在時刻同期**: ワンクリックで実時間に同期。

### 2. 🎛️ チェックボックス式 路線セレクター
- **自由な表示切り替え**:
  - `☑ 東武東上線`
  - `☑ JR埼京線・川越線`
- 「全路線同時運行（デフォルト）」または「指定路線のみ」をチェックボックスで直感的に切り替え。
- 選択状態に合わせて地図カメラが各路線の最適範囲へスムーズに自動フィット。

### 3. ⏱️ タイムトラベル＆超高速倍速コントローラー
- **連続タイムスライダー**: 始発（04:30）から深夜最終便の入庫完了（翌01:30）まで、シームレスに時間を巻き戻し・早送り。
- **最大600倍速再生**: `1x`, `2x`, `5x`, `10x`, `30x`, `60x`, `120x`, `300x`, `600x` の9段階でダイヤの1日を素早く通覧。
- **時間帯プリセット**:
  - 🌅 朝ラッシュ（08:00）: 最も過密な運行パターン
  - ☀️ 昼デイタイム（13:00）: 平常運転ダイヤ
  - 🌆 夕ラッシュ（18:30）: 帰宅時間帯の混雑ダイヤ
  - 🌙 深夜終電帯（24:15）: 各方面への最終連絡便

### 4. ⚠️ ダイヤ遅延シミュレーション
- **運行障害シナリオ**:
  - 定刻（平常運転）
  - 全線+5分遅延
  - 全線+15分大幅遅れ
  - ランダム局所遅延（駅や列車ごとに異なるランダムな遅れをシミュレート）
- 運行情報バッジ（平常運転 / 遅延情報）が連動して切り替わります。

### 5. 🎨 公式準拠の運行系統カラーリング
各路線のブランドカラーおよび公式種別カラーを精密に再現：
- **東武東上線**: 普通（黒）、準急（緑）、急行（赤）、快速急行（青）、川越特急（ピンク）、TJライナー（オレンジ）
- **JR埼京線・川越線**: 各駅停車（埼京グリーン `#00ac9a`）、快速（ブルー `#007ac1`）、通勤快速（レッド `#e60012`）

### 6. 📋 発車標・列車追従サイドバー
- **駅情報パネル**:
  - 駅ナンバリング（`TJ-01`〜`TJ-39`、`JA-08`〜`JA-31`）
  - 電光掲示板スタイルの発車標（先発・次発・次々発）
  - 各列車の両数・行先・発車時刻
- **列車追尾モード**:
  - 選択した列車を地図中央に自動追尾
  - 停車駅リストと各駅到着・出発時刻のリアルタイム表示
- **検索機能**: 駅名・列車番号・行先・種別でのリアルタイムインクリメンタル検索。

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
├── scripts/                            # データ生成パイプライン
│   ├── generateSaikyoGeometry.cjs     # 埼京線軌道ジオメトリ生成
│   ├── generateSaikyoTimetable.cjs    # 埼京線ダイヤ生成
│   └── verifyMultiLine.mjs            # マルチライン運行検証
├── src/
│   ├── components/
│   │   ├── Controls/                  # タイムスライダー・各種操作パネル
│   │   ├── Header/                    # 路線フィルター・検索バー
│   │   ├── Map/                       # Leaflet 地図描画・マーカー・線路ポリライン
│   │   ├── Modals/                    # 時刻表・API設定・使い方モーダル
│   │   └── Sidebar/                   # 駅・列車詳細パネル・発車標
│   ├── data/
│   │   ├── lines/
│   │   │   ├── tojo/                  # 東武東上線モジュール
│   │   │   └── saikyo/                # JR埼京線・川越線モジュール
│   │   ├── linesRegistry.ts           # プラグイン型 路線統合レジストリ
│   │   ├── stations.ts                # 統合駅データ
│   │   ├── trackGeometry.ts           # 統合軌道・補間計算エンジン
│   │   └── timetableData.ts           # 統合時刻表ユーティリティ
│   ├── services/
│   │   ├── trainSimulation.ts         # リアルタイム列車走行シミュレーションエンジン
│   │   └── odptApi.ts                 # 運行情報API
│   ├── types/                         # TypeScript 型定義 (LineDefinition等)
│   ├── App.tsx                        # メインアプリケーションコンポーネント
│   └── main.tsx                       # エントリーポイント
├── package.json
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

---

## ⚠️ 免責事項・データ出典

- **免責事項**:
  本アプリケーションは個人が学習・研究目的で制作した非公式のファンメイドシミュレータです。**東武鉄道株式会社、東日本旅客鉄道株式会社（JR東日本）および関係各社とは一切関係ありません**。
  本アプリに表示される列車の運行状況・時刻・位置情報はシミュレーション値であり、実際の運行管理システムや運行ダイヤとは差異が生じる場合があります。
- **地図データ**:
  © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) のもとで公開されています。

Copyright (c) 2026 長谷 玄武 (Genbu Hase)
