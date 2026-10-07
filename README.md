# Trainfo - 首都圏・甲信越 リアルタイム列車位置＆広域マルチ路線運行マップ

<div align="center">

<img src="docs/logo.svg" alt="Trainfo Logo" width="100" height="100" />

### **Trainfo (トレインフォ)**
**首都圏・甲信越を網羅する9事業者・全23路線の公式時刻表に基づき、全列車の現在走行位置・種別・行先・遅延状況・相互直通運転をリアルタイムに描画するWebアプリケーション**

[![Deploy to GitHub Pages](https://github.com/GenbuHase/Trainfo/actions/workflows/deploy.yml/badge.svg)](https://github.com/GenbuHase/Trainfo/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://web.dev/explore/progressive-web-apps)

🌐 **[オンラインデモを体験する (GitHub Pages)](https://GenbuHase.github.io/Trainfo/)**

</div>

---

## 📸 スクリーンショット

![Trainfo 画面イメージ](docs/screenshot.png)

---

## 🌟 主な機能

### 1. 🚆 9事業者・全23路線 リアルタイム列車位置シミュレーション
- **高精度な実線路追従 & 首都圏・甲信越広域ネットワークの再現**:
  - **東京メトロ**
    - **有楽町線**（和光市〜新木場：全24駅）
    - **副都心線**（和光市〜渋谷：全16駅）
  - **東武鉄道**
    - **東武東上線**（池袋〜寄居：全39駅）
    - **東武越生線**（坂戸〜越生：全8駅）
  - **西武鉄道**
    - **西武池袋線**（池袋〜西武秩父：全36駅）
    - **西武有楽町線**（小竹向原〜練馬：全3駅）
  - **小田急電鉄**
    - **小田急小田原線**（新宿〜小田原：全47駅）
    - **小田急江ノ島線**（相模大野〜片瀬江ノ島：全17駅）
    - **小田急多摩線**（新百合ヶ丘〜唐木田：全8駅）
  - **秩父鉄道**
    - **秩父鉄道秩父本線**（羽生〜三峰口：全37駅）
  - **JR東日本**
    - **JR埼京線**（大崎〜大宮：全19駅）
    - **JR川越線**（大宮〜高麗川：全11駅、川越〜高麗川の単線区間を含む全線）
    - **JR八高線**（八王子〜高崎：全24駅）
    - **JR武蔵野線**（府中本町〜西船橋：全26駅、直通区間含む全45駅）
      - 京葉線直通: 西船橋 ↔ 東京方面、西船橋 ↔ 海浜幕張方面
      - 中央線直通（むさしの号）: 八王子 ↔ 立川 ↔ 国立 ↔ 新小平 ↔ 大宮
      - 大宮支線直通（しもうさ号）: 大宮 ↔ 武蔵浦和 ↔ 南浦和 ↔ 西船橋 ↔ 新習志野・海浜幕張
    - **JR中央線**（東京〜高尾：全24駅）
    - **JR中央本線**（高尾〜塩尻：全38駅）
    - **JR青梅線**（立川〜奥多摩：全25駅）
    - **JR五日市線**（拝島〜武蔵五日市：全7駅）
    - **JR篠ノ井線**（塩尻〜長野：全19駅、信越本線直通区間含む）
    - **JR大糸線（東日本区間）**（松本〜南小谷：全33駅）
  - **JR西日本**
    - **JR大糸線（西日本区間）**（南小谷〜糸魚川：全9駅、非電化ローカル線区）
  - **東京臨海高速鉄道**
    - **りんかい線**（新木場〜大崎：全8駅）
  - **首都圏新都市鉄道**
    - **つくばエクスプレス（TX）**（秋葉原〜つくば：全20駅、最高速度130km/h、全線立体交差構造）

### 2. 🔄 複数社を跨ぐシームレスな相互直通運転 & 自動追尾ハンドオーバー
- **3路線以上の完全貫通直通（進行方向前方指向連鎖 / Forward-Pointing Chain）**:
  - **小田急小田原線 ↔ 江ノ島線 ↔ 多摩線**:
    - 相模大野駅・新百合ヶ丘駅を介した快速急行・急行・各駅停車等の相互直通運転。境界駅を跨いでも列車番号・行先（「片瀬江ノ島」「唐木田」等）を透過的に維持・案内。
  - **川越線 ↔ 埼京線 ↔ りんかい線**: 川越〜大宮〜新宿〜大崎〜新木場
    - 境界駅（大宮・大崎）を跨いでも列車番号と本来の最終目的地（「新木場」「川越」等）を透過的に維持・案内。
  - **西武池袋線 ↔ 西武有楽町線 ↔ 東京メトロ有楽町線・副都心線**:
    - 小竹向原駅・練馬駅を介した地下鉄相互直通運転。
    - **S-TRAINの完全貫通追尾**: 平日（豊洲 ↔ 所沢・小手指）、土休日（元町・中華街 ↔ 西武秩父）の有料座席指定列車において、旅客通過・運転停車駅（小竹向原・練馬等）を含む全区間を途切れることなく追尾継続。
  - **西武池袋線・西武秩父線 ↔ 秩父鉄道秩父本線**:
    - 御花畑駅・西武秩父駅の短絡連絡線を介した直通運転（三峰口・長瀞方面直通）に対応。
  - **中央線 ↔ 青梅線 ↔ 五日市線**:
    - 立川駅・拝島駅を介した青梅特快・快速・各駅停車の相互直通運転。
  - **八高線 ↔ 川越線**:
    - 高麗川駅での相互直通運転（八王子〜高麗川〜川越）。
  - **東武東上線 ↔ 東京メトロ有楽町線・副都心線**:
    - 和光市駅での相互直通運転（列車番号完全一致照合による確実なペアリング）。
  - **中央線 ↔ 中央本線**:
    - 高尾駅を跨ぐ特急（あずさ・かいじ・富士回遊等）および普通列車の相互直通。
- **自動ハンドオーバー & 路線自動追加**:
  - 追尾中の列車が路線境界を越えて別路線のトリップに移行した際、自動的にカメラ追従を継承。
  - 遷移先路線が非選択状態であっても自動的に選択路線リストに追加し、見失うことなく追尾を継続。

### 3. 🚉 広域ターミナル・同名駅クロスオーバーリンク
- 乗換駅や接続駅で、同一駅名を持つ別路線の駅詳細・発車標・時刻表へワンタップで遷移可能：
  - **新宿駅**: JR中央線（`JC-05`）↔ JR埼京線（`JA-11`）↔ 小田急小田原線（`OH-01`）
  - **相模大野駅**: 小田急小田原線（`OH-28`）↔ 小田急江ノ島線（`OH-28`）
  - **新百合ヶ丘駅**: 小田急小田原線（`OH-23`）↔ 小田急多摩線（`OH-23`）
  - **和光市駅**: 東武東上線（`TJ-11`）↔ 東京メトロ有楽町線（`Y-01`）↔ 東京メトロ副都心線（`F-01`）
  - **池袋駅**: 東武東上線（`TJ-01`）↔ JR埼京線（`JA-12`）↔ 東京メトロ有楽町線（`Y-09`）↔ 東京メトロ副都心線（`F-09`）↔ 西武池袋線（`SI-01`）
  - **立川駅**: JR中央線（`JC-19`）↔ JR中央本線（`CO-51`）↔ JR青梅線（`JC-19`）
  - **拝島駅**: JR青梅線（`JC-55`）↔ JR五日市線（`JC-55`）↔ JR八高線（`HA-02`）
  - **坂戸駅**: 東武東上線（`TJ-26`）↔ 東武越生線（`TJ-26`）
  - **越生駅**: 東武越生線（`TJ-47`）↔ JR八高線（`HA-06`）
  - **高麗川駅**: JR八高線（`HA-05`）↔ JR川越線
  - **西武秩父駅 / 御花畑駅**: 西武池袋線（`SI-36`）↔ 秩父鉄道秩父本線（`CR-31` 御花畑駅）
  - **小川町駅 / 寄居駅**: 東武東上線（`TJ-33` / `TJ-39`）↔ JR八高線（`HA-09` / `HA-14`）↔ 秩父鉄道秩父本線（`CR-20` 寄居駅）
  - **熊谷駅**: 秩父鉄道秩父本線（`CR-09`）
  - **羽生駅**: 秩父鉄道秩父本線（`CR-01`）
  - **大宮駅**: JR埼京線・川越線地下ホーム（`JA-26`）↔ JR地上ホーム（`JU-07`：むさしの号・しもうさ号）
  - **新木場駅**: 東京メトロ有楽町線（`Y-24`）↔ りんかい線（`R-01`）
  - **渋谷駅**: JR埼京線（`JA-10`）↔ 東京メトロ副都心線（`F-16`）
  - **八王子駅**: JR中央線（`JC-22`）↔ JR八高線（`HA-01`）↔ 武蔵野線むさしの号
  - **南流山駅**: JR武蔵野線（`JM-16`）↔ つくばエクスプレス（`TX-10`）
  - **武蔵浦和駅**: JR埼京線（`JA-21`）↔ JR武蔵野線（`JM-26`）
  - **南小谷駅**: JR東日本 大糸線（`OIE-33`）↔ JR西日本 大糸線（`OW-01`）
  - **塩尻駅**: JR中央本線（`CO-61`）↔ JR篠ノ井線（`SN-01`）

### 4. 🎛️ 事業者別セレクター & マップ直結フィルタードック（DisplayFilterDock）
- **事業者ごとの階層化マルチ路線選択**:
  - 全23路線を運行事業者（東京メトロ、東武鉄道、西武鉄道、小田急電鉄、秩父鉄道、JR東日本、JR西日本、東京臨海高速鉄道、首都圏新都市鉄道）ごとにグループ化。
  - 「全選択」「全解除」や事業者ごとの一括オン/オフ、個別路線の自在な組み合わせ表示に対応。
  - 選択状態に合わせて地図カメラが全駅をピッタリ包含する最適範囲へスムーズに自動フィット。
- **直感的なマップ直結フィルター（ドックUI）**:
  - **進行方向絞り込み**: 「すべての方向」「上り方面のみ」「下り方面のみ」
  - **列車種別絞り込み**: 「すべての種別」「優等・快速のみ（特急・急行・快速等）」「各駅停車・普通のみ」

### 5. 🎯 列車追従バー（TrackingBar）& 2段組着発時刻表示
- **リアルタイム列車追従バー**:
  - 列車を選択すると画面下部にステータスバーが表示され、種別・公式列車番号（`2425T`、`1001レ`等）・行先・編成両数・現在速度（km/h）・遅延状況を表示。
  - カメラ追尾のON/OFFをワンタップで切り替え可能。
- **2段組着発時刻表示**:
  - 全停車駅の「〇〇:〇〇着」「〇〇:〇〇発」をリアルタイム表示。
  - 駅での停車時間、通過待ち、緩急接続（待避停車）を正確に可視化。
- **電光掲示板スタイルの駅発車標**:
  - 先発・次発・次々発の発車標表示および全列車時刻表モーダル閲覧機能。

### 6. ⏱️ タイムトラベル＆超高速倍速コントローラー
- **鉄道運行日基準（04:00〜翌04:00）の完全24時間タイムスライダー**: 早朝初電から深夜終電、および日跨ぎ運行列車（夜行特急アルプス等）まで、シームレスに巻き戻し・早送り・追尾可能。
- **最大3600倍速再生**: `1x`, `2x`, `5x`, `10x`, `30x`, `60x`, `120x`, `300x`, `600x`, `1200x`, `1800x`, `3600x` の12段階で1日のダイヤ推移を通覧（最大1秒で1時間進行）。
- **ダイヤ種別切替**: 「平日ダイヤ」と「土休日ダイヤ」をワンクリックで切り替え。
- **時間帯プリセット**:
  - 🌅 朝ラッシュ（08:00）: 最も過密な運行パターン
  - ☀️ 昼デイタイム（13:00）: 平常運転ダイヤ
  - 🌆 夕ラッシュ（18:30）: 帰宅時間帯の混雑ダイヤ
  - 🌙 深夜終電帯（24:15）: 各方面への最終連絡便
- **現在時刻同期**: ワンクリックで実時間に同期。

### 7. ⚠️ ダイヤ遅延シミュレーション
- **運行障害シナリオ**:
  - 定刻（平常運転）
  - 全線+5分遅延
  - 全線+15分大幅遅れ
  - ランダム局所遅延（列車や駅ごとに異なる現実的な遅れをシミュレート）
- 運行情報バッジ（平常運転 / 遅延情報）が連動して切り替わります。

### 8. 📲 PWA（Progressive Web App）アプリインストール対応
- **デスクトップ＆スマホへのネイティブインストール**:
  - Chrome、Edge、Android、iOS（Safari「ホーム画面に追加」）でブラウザ枠なしの全画面ネイティブアプリ体験。
- **Service Worker による高速起動＆オフラインキャッシュ**:
  - アプリケーションシェルおよび地図タイルをインテリジェントにローカルキャッシュ。電波の届きにくい地下やトンネル内でも快適に動作。
- **専用インストールモーダル**:
  - 各OSに応じた丁寧なインストールガイドを提供。

### 9. 🎨 公式準拠の運行系統カラーリング & 駅ナンバリングバッジ
- **公式ラインカラー & 列車種別**:
  - 各社のCI・運行基準に準拠したカラーリング（小田急ブルー、東武ブルー、埼京エメラルド、武蔵野オレンジ、TXディープブルー、中央線オレンジバーミリオン、青梅・五日市線オレンジ、中央東線ブルー、篠ノ井オレンジ、有楽町ゴールド、副都心ブラウン、西武オレンジ、秩父鉄道ブルー等）を精緻に再現。
- **マルチライン駅ナンバリングバッジ**:
  - `OH` (小田急小田原線)
  - `OE` (小田急江ノ島線)
  - `OT` (小田急多摩線)
  - `TJ` (東武東上線・東武越生線)
  - `JA` (JR埼京線・川越線)
  - `JM` (JR武蔵野線)
  - `JE` (JR京葉線)
  - `JC` (JR中央線・青梅線・五日市線)
  - `CO` (JR中央本線)
  - `HA` (JR八高線)
  - `SN` (JR篠ノ井線)
  - `OIE` (JR東日本 大糸線)
  - `OW` (JR西日本 大糸線)
  - `JU` (JR宇都宮線・高崎線/大宮地上ホーム)
  - `JK` (JR京浜東北線)
  - `JS` (JR湘南新宿ライン)
  - `CR` (秩父鉄道秩父本線)
  - `R` (東京臨海高速鉄道りんかい線)
  - `Y` (東京メトロ有楽町線)
  - `F` (東京メトロ副都心線)
  - `SI` (西武池袋線・西武有楽町線)
  - `TX` (つくばエクスプレス)

---

## 🛠️ 技術スタック

| 分類 | 技術 / ライブラリ |
| :--- | :--- |
| **フロントエンド** | [React 19](https://react.dev/), [TypeScript 5.x](https://www.typescriptlang.org/) |
| **PWA / オフライン** | [Progressive Web Apps](https://web.dev/explore/progressive-web-apps), Web App Manifest, Service Worker |
| **ビルドツール** | [Vite 8](https://vite.dev/) (with [Rolldown](https://rolldown.rs/) / [Oxc](https://oxc.rs/)) |
| **スタイリング** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **地図描画** | [Leaflet](https://leafletjs.com/), [OpenStreetMap](https://www.openstreetmap.org/) |
| **データソース** | Yahoo! 乗換案内（路線情報）スクレイピング基盤, OpenStreetMap Overpass API |
| **デプロイ・CI/CD** | [GitHub Actions](https://github.com/features/actions), [GitHub Pages](https://pages.github.com/) |

---

## 📂 ディレクトリ構成

```text
Trainfo/
├── docs/                               # ドキュメント・アセット
│   ├── ROUTE_EXPANSION_PLAYBOOK.md     # 路線追加完全手順書・設計標準マニュアル
│   ├── ODPT_INTEGRATION_KNOWLEDGE.md   # ODPT活用ナレッジ＆将来設計ガイド
│   ├── logo.svg
│   └── screenshot.png
├── public/                             # 静的公開ファイル
│   ├── icons/                          # PWAアプリアイコン群 (192, 512, maskable, apple-touch)
│   ├── manifest.webmanifest            # W3C Web App Manifest
│   ├── sw.js                           # PWA Service Worker (キャッシュ & オフライン対応)
│   └── logo.svg
├── scripts/                            # データ生成・直通リンク・テストスクリプト群
│   ├── runYahooImporter.cjs            # Yahoo! 乗換案内 共通インポーター CLI
│   ├── enrich_train_numbers.cjs        # 駅探ハイブリッド突合・公式列車番号エンリッチメント
│   ├── generateIcons.cjs               # PWAアイコン自動生成スクリプト
│   ├── link_odakyu_lines.cjs           # 小田急線（小田原線 ↔ 江ノ島線・多摩線）直通メタデータ付与
│   ├── link_saikyo_rinkai.cjs          # 埼京線 ↔ りんかい線 直通メタデータ付与
│   ├── link_tojo_metro.cjs             # 東武東上線 ↔ 地下鉄 直通メタデータ付与
│   ├── link_metro_seibu.cjs            # 地下鉄 ↔ 西武線 直通メタデータ付与
│   ├── link_seibu_chichibu.cjs         # 西武線 ↔ 秩父鉄道 直通メタデータ付与
│   ├── link_chuo_ome.cjs               # 中央線 ↔ 青梅線 直通メタデータ付与
│   ├── link_ome_itsukaichi.cjs         # 青梅線 ↔ 五日市線 直通メタデータ付与
│   ├── link_kawagoe_hachiko.cjs        # 川越線 ↔ 八高線 直通メタデータ付与
│   ├── integrate_strain.cjs            # S-TRAIN 全線貫通トリップ合成スクリプト
│   ├── test_takao_handover.ts          # 高尾駅ハンドオーバー自動検証テスト
│   ├── test_tachikawa_handover.ts      # 立川駅ハンドオーバー自動検証テスト
│   ├── test_haijima_simulation.ts      # 拝島駅ハンドオーバー自動検証テスト
│   ├── test_komagawa_handover.ts       # 高麗川駅ハンドオーバー自動検証テスト
│   ├── test_osaki_handover.ts          # 大崎駅ハンドオーバー自動検証テスト
│   ├── test_omiya_handover.ts          # 大宮駅ハンドオーバー自動検証テスト
│   ├── test_wakoshi_handover.ts        # 和光市駅ハンドオーバー自動検証テスト
│   ├── test_seibu_handover.ts          # 西武・地下鉄・S-TRAINハンドオーバー自動検証テスト
│   ├── test_chichibu_simulation.ts     # 秩父鉄道・西武線直通検証テスト
│   ├── test_hachiko_simulation.ts      # 八高線シミュレーション検証テスト
│   ├── common/
│   │   └── yahoo/                      # 共通データ生成基盤
│   │       ├── YahooClient.cjs         # HTTPクライアント & キャッシュ制御
│   │       ├── YahooStationTimetableScraper.cjs # 駅時刻表スクレイパー
│   │       ├── YahooTrainDetailScraper.cjs     # 列車詳細（着発時刻）スクレイパー
│   │       └── YahooTimetableBuilder.cjs       # ダイヤ合成 & 汎用通過・秒補間
│   └── lines/                          # 路線別スクレイパー設定（config.cjs）
│       ├── odakyu_odawara/             # 小田急小田原線
│       ├── odakyu_enoshima/            # 小田急江ノ島線
│       ├── odakyu_tama/                # 小田急多摩線
│       ├── tojo/                       # 東武東上線
│       ├── ogose/                      # 東武越生線
│       ├── saikyo/                     # JR埼京線
│       ├── kawagoe/                    # JR川越線
│       ├── rinkai/                     # 東京臨海高速鉄道りんかい線
│       ├── yurakucho/                  # 東京メトロ有楽町線
│       ├── fukutoshin/                 # 東京メトロ副都心線
│       ├── seibu_ikebukuro/            # 西武池袋線
│       ├── seibu_yurakucho/            # 西武有楽町線
│       ├── chichibu/                   # 秩父鉄道秩父本線
│       ├── hachiko/                    # JR八高線
│       ├── musashino/                  # JR武蔵野線
│       ├── tsukuba_express/            # つくばエクスプレス
│       ├── chuo/                       # JR中央線
│       ├── chuo_main/                  # JR中央本線
│       ├── ome/                        # JR青梅線
│       ├── itsukaichi/                 # JR五日市線
│       ├── shinonoi/                   # JR篠ノ井線
│       ├── oito_east/                  # JR大糸線（東日本）
│       └── oito_west/                  # JR大糸線（西日本）
├── src/
│   ├── components/
│   │   ├── Common/                     # 駅ナンバリング・種別バッジ（Badges.tsx）
│   │   ├── Controls/                   # タイムスライダー・各種操作パネル（TimeController.tsx）
│   │   ├── Header/                     # ヘッダー・路線フィルタードロップダウン
│   │   ├── Map/                        # Leaflet 地図描画・マーカー・DisplayFilterDock・TrackingBar
│   │   ├── Modals/                     # 時刻表・設定・ヘルプ・PWAインストールモーダル
│   │   └── Sidebar/                    # 駅詳細（StationDetail）・列車詳細（TrainDetail）
│   ├── data/
│   │   ├── lines/                      # 全23路線のデータモジュール（stations, track, timetables）
│   │   ├── linesRegistry.ts            # プラグイン型 路線統合レジストリ（事業者グループ化）
│   │   ├── stations.ts                 # 統合駅データユーティリティ
│   │   ├── trackGeometry.ts            # 統合軌道・補間計算エンジン
│   │   └── timetableData.ts            # 統合時刻表ユーティリティ
│   ├── services/
│   │   ├── pwaService.ts               # PWA Service Worker & インストール管理
│   │   └── trainSimulation.ts          # リアルタイム列車走行シミュレーションエンジン
│   ├── types/                          # TypeScript 型定義 (LineDefinition, TrainTypeKey等)
│   ├── App.tsx                         # メインアプリケーションコンポーネント
│   └── main.tsx                        # エントリーポイント
├── package.json
└── vite.config.ts
```

---

## 📖 開発・設計ドキュメント

- 👉 [**Trainfo 路線追加完全プレイブック（docs/ROUTE_EXPANSION_PLAYBOOK.md）**](docs/ROUTE_EXPANSION_PLAYBOOK.md): 新路線追加の手順、OSM線路抽出、Yahoo! データ設定、直通ハンドオーバー設計、ハマりどころ防止策
- 👉 [**ODPT活用ナレッジ＆将来設計ガイド（docs/ODPT_INTEGRATION_KNOWLEDGE.md）**](docs/ODPT_INTEGRATION_KNOWLEDGE.md): 公共交通オープンデータの活用可能性と推奨アーキテクチャ

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

> [!NOTE]
> **ダークマップについて**: デフォルトではAPIキー不要なOSMダークモードが自動適用されます。CARTO公式のDark Matterタイルを利用したい場合は、`.env` 等で `VITE_CARTO_API_KEY=your_key` を設定してください（[CARTO Basemaps](https://carto.com/basemaps/apikey/) で無料取得可能）。

### 4. ダイヤ・時刻表データの再取得・ビルド（任意）
```bash
# 例: 西武池袋線のダイヤをYahoo!から再生成
node scripts/runYahooImporter.cjs --line seibu_ikebukuro

# 例: 中央線のダイヤを再生成
node scripts/runYahooImporter.cjs --line chuo

# 公式列車番号（trainNumber）のエンリッチメント
node scripts/enrich_train_numbers.cjs seibu_ikebukuro

# 直通メタデータの再付与（例: 西武線 ↔ 地下鉄）
node scripts/link_metro_seibu.cjs
node scripts/integrate_strain.cjs
```

### 5. プロダクションビルド＆プレビュー
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
  本アプリケーションは個人が学習・研究目的で制作した非公式のファンメイドシミュレータです。**東武鉄道株式会社、東日本旅客鉄道株式会社（JR東日本）、西武鉄道株式会社、小田急電鉄株式会社、秩父鉄道株式会社、東京地下鉄株式会社（東京メトロ）、西日本旅客鉄道株式会社（JR西日本）、東京臨海高速鉄道株式会社、首都圏新都市鉄道株式会社、LINEヤフー株式会社および関係各社とは一切関係ありません**。  
  本アプリに表示される列車の運行状況・時刻・位置情報はシミュレーション値であり、実際の運行管理システムや運行ダイヤとは差異が生じる場合があります。
- **データ出典**:  
  - 時刻表・運行情報: Yahoo! 乗換案内（路線情報）
  - 地図データ: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) のもとで公開されています。
