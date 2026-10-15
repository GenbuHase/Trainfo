# 上下線非対称路線・方向別軌道ルーティング設計指針

本ドキュメントは、上りと下りで物理的に線路・経由駅・線形が異なる路線（上下非対称路線）を Trainfo において高精度に表現・シミュレーションするための設計仕様、データ構造、および実装ガイドラインをまとめた技術標準書です。

---

## 1. 背景と課題

### 従来のアーキテクチャ（単一代表軌道設計）
従来の Trainfo では、1 つの駅間（`fromStationId` と `toStationId`）に対して 1 本の代表ポリライン（`TrackSegment`）のみを定義し、逆方向の列車はポリラインを反転（`reverse()`）して補間計算を行っていました。

```text
【従来の方式】
水上 ──── (新清水トンネル: 単一セグメント) ────> 土合
水上 <─── (新清水トンネルを reverse() して逆走) ─── 土合
※ 湯檜曽ループ線（上り線）が地図にも列車位置にも一切存在しない
```

### 発生する課題
1. **地図表示の欠落**:
   - 地図上に描画される軌道が 1 本しかないため、上越線の場合「新清水トンネル（下り）」か「湯檜曽ループ線（上り）」のどちらか一方しか描画できず、全国的に有名なループ線や複線の線形美を可視化できない。
2. **列車走行シミュレーションの乖離**:
   - 下り列車用セグメントしか存在しない場合、上り列車が本来走行するループ線を通らず、下り線専用の長大トンネル内を逆走する。
3. **データ作成時の異常往復ループ誘発**:
   - 地上駅（上りホーム）と地下駅（下りホーム）のノードが混在した場合、ダイクストラ探索が坑口へ向かって 1km 以上逆走・Uターンするような致命的な異常パスを生成する原因となる。

---

## 2. 全国の代表的事例パターン分類

上下線で経路が異なる路線は、全国で主に以下の 4 パターンに分類されます。

```mermaid
classDiagram
    class AsymmetricPattern {
        <<enumeration>>
        MOUNTAIN_LOOP_TUNNEL
        GRADIENT_BYPASS
        MULTI_TRACK_JUNCTION
        LOOP_FIGURE_EIGHT
    }
    class MountainLoop {
        +上越線 (水上〜越後湯沢)
        +土讃線 (新改・坪尻)
        +肥薩線 (大畑ループ・矢岳)
        下り: 新清水トンネル (地下直線)
        上り: 清水トンネル + 湯檜曽ループ (地上)
    }
    class GradientBypass {
        +東海道本線 (大垣〜関ケ原)
        +函館本線 (七飯〜大沼)
        下り: 新垂井線・藤城線 (勾配緩和バイパス)
        上り/普通: 垂井線・仁山経由本線
    }
    class MultiTrackJunction {
        +総武快速線・緩行線 (御茶ノ水〜秋葉原)
        +中央急行線
        立体交差・線路別分離
    }
    class LoopFigureEight {
        +都営大江戸線 (都庁前〜光が丘)
        +富山地方鉄道富山軌道線
        6の字運転・単線環状ラケット線
    }
    AsymmetricPattern <|-- MountainLoop
    AsymmetricPattern <|-- GradientBypass
    AsymmetricPattern <|-- MultiTrackJunction
    AsymmetricPattern <|-- LoopFigureEight
```

| パターン | 主な路線・対象区間 | 下り線 (Outbound) | 上り線 (Inbound) | 特有の課題 |
| :--- | :--- | :--- | :--- | :--- |
| **山岳長大トンネル vs ループ線** | **JR上越線**<br>(水上 〜 越後湯沢) | 新清水トンネル<br>(湯檜曽・土合は地下ホーム) | 清水トンネル + 湯檜曽ループ線<br>(湯檜曽・土合は地上ホーム) | 湯檜曽・土合駅の地上/地下でホーム標高・位置が異なる |
| **下り勾配緩和別線** | **JR東海道本線**<br>(大垣 〜 関ケ原) | 新垂井線<br>(下り特急・貨物専用、垂井駅非経由) | 本線（垂井線）<br>(上り全列車 ＆ 下り普通列車が垂井経由) | 列車種別によって下りでも経由ルート・経由駅が分かれる |
| **下り勾配緩和別線** | **JR函館本線**<br>(七飯 〜 大沼) | 藤城線<br>(下り貨物・特急専用高架別線、途中駅なし) | 本線<br>(仁山駅経由、急勾配・スイッチバック) | 経由駅・距離が全く異なる |
| **環状・6の字運転** | **都営大江戸線**<br>(光が丘 〜 都庁前) | 放射部（光が丘〜都庁前）と環状部（都庁前〜大門〜両国〜都庁前）の連続運転 | 同一駅（都庁前）に異なる方向から2度入線する構造 |

---

## 3. 推奨アーキテクチャ仕様

既存のデータ互換性を完全に保ちながら（後方互換）、方向別・経路別セグメントを表現可能にするアーキテクチャです。

### 3.1 軌道データ型定義の拡張 ([`src/types/index.ts`](file:///c:/Users/Genbu/GitHub/github.com/GenbuHase/Trainfo/src/types/index.ts))

```typescript
export interface TrackSegment {
  segmentId?: string;
  fromStationId: string;
  toStationId: string;
  fromName?: string;
  toName?: string;
  coordinates: [number, number][];

  /**
   * 走行方向（省略時または 'both' は双方向共用線路）
   * - 'outbound': 下り列車専用軌道
   * - 'inbound': 上り列車専用軌道
   * - 'both': 上下共用複線/単線（デフォルト）
   */
  direction?: 'inbound' | 'outbound' | 'both';

  /**
   * 経路バリアント識別子（同一方向で複数経路が存在する場合）
   * 例: 'shinsimizu' (新清水トンネル), 'loop' (湯檜曽ループ)
   *     'tarui_main' (垂井経由), 'shintarui' (新垂井線経由)
   *     'fujishiro' (藤城線), 'niyama' (仁山経由本線)
   */
  variant?: string;
}
```

### 3.2 地図描画層（Map Component）の全軌道レンダリング
- 地図コンポーネント（Leaflet Polyline レイヤー）は、セグメントの `direction` や `variant` に関係なく、登録されている**すべての軌道セグメントを一括描画**します。
- これにより、地図上に「新清水トンネル（直線）」と「湯檜曽ループ線（円形）」の**両方の線路が同時に表示**され、実物の鉄道路線図と同様の立体的な配線が表示されます。

### 3.3 列車位置補間エンジン (`interpolateTrackPosition`) のアルゴリズム

`ActiveTrain` はすでに `direction: Direction`（`inbound` / `outbound`）を所持しています。  
列車位置計算関数は、列車の進行方向と経路バリアントに応じて最適なセグメントを優先選択します。

```mermaid
flowchart TD
    Start["列車位置補間要求<br/>(fromStationId, toStationId, ratio, trainDirection, routeVariant)"] --> Step1{"1. 順方向で direction & variant が<br/>完全一致するセグメントがあるか？"}
    Step1 -- "Yes" --> Found1["該当セグメントを採用"]
    Step1 -- "No" --> Step2{"2. 順方向で direction が一致<br/>または 'both' のセグメントがあるか？"}
    Step2 -- "Yes" --> Found2["該当セグメントを採用"]
    Step2 -- "No" --> Step3{"3. 逆方向で direction が一致<br/>または 'both' のセグメントがあるか？"}
    Step3 -- "Yes" --> Found3["該当セグメントを採用し reverse()"]
    Step3 -- "No" --> Fallback["4. 直線補間へフォールバック"]
```

```typescript
// src/data/trackGeometry.ts
export function interpolateTrackPosition(
  fromStationId: string,
  toStationId: string,
  ratio: number,
  trainDirection?: Direction,
  routeVariant?: string,
  customSegments?: TrackSegment[]
): { lat: number; lng: number; heading: number; bearing: number } {
  const segments = customSegments || getCombinedTrackSegments();
  const dir = trainDirection || 'outbound';

  // 1. 完全一致（方向 + バリアント）
  let segment = segments.find(s => 
    s.fromStationId === fromStationId && 
    s.toStationId === toStationId &&
    (s.direction === dir || s.direction === 'both' || !s.direction) &&
    (!routeVariant || s.variant === routeVariant)
  );

  let isReverse = false;

  // 2. 順方向（方向一致または双方向）
  if (!segment) {
    segment = segments.find(s => 
      s.fromStationId === fromStationId && 
      s.toStationId === toStationId &&
      (s.direction === dir || s.direction === 'both' || !s.direction)
    );
  }

  // 3. 逆方向フォールバック
  if (!segment) {
    segment = segments.find(s => 
      s.fromStationId === toStationId && 
      s.toStationId === fromStationId &&
      (s.direction === 'both' || !s.direction)
    );
    if (segment) isReverse = true;
  }

  // (以降は従来の距離積算・lookahead 方位角算出ロジックを実行)
}
```

### 3.4 ホーム分離駅の座標スナップ仕様 (`platformCoordinates`)

土合駅や湯檜曽駅のように、地上ホームと地下ホームで物理位置が異なる駅に対応するため、`Station` 定義へホーム別座標を追加します。

```typescript
export interface Station {
  id: string;
  name: string;
  lat: number; // 代表駅舎座標
  lng: number;
  
  // ホーム別座標（上下線で大きく異なる場合のみ定義）
  platformCoordinates?: {
    inbound?: { lat: number; lng: number; altitude?: number };  // 上りホーム (例: 地上)
    outbound?: { lat: number; lng: number; altitude?: number }; // 下りホーム (例: 地下70m)
  };
}
```

- **セグメント端点スナップ規則**:
  - `direction === 'outbound'` のセグメントは `s.platformCoordinates?.outbound || { lat: s.lat, lng: s.lng }` にスナップ。
  - `direction === 'inbound'` のセグメントは `s.platformCoordinates?.inbound || { lat: s.lat, lng: s.lng }` にスナップ。

---

## 4. 上越線（水上〜越後湯沢）での実装具体例

上越線をパイロットケースとした場合の実装例です。

### `trackGeometry.ts` のセグメント構成
```typescript
export const JOETSU_TRACK_SEGMENTS: TrackSegment[] = [
  // ... (高崎 〜 水上: 双方向共用)

  // 【水上 〜 湯檜曽】
  {
    segmentId: 'JOE-14_JOE-15_DOWN',
    fromStationId: 'JOE-14',
    toStationId: 'JOE-15',
    direction: 'outbound',
    variant: 'shinsimizu',
    coordinates: [ /* 水上地上 -> 新清水トンネル坑口 -> 湯檜曽地下ホーム (3.58km) */ ]
  },
  {
    segmentId: 'JOE-15_JOE-14_UP',
    fromStationId: 'JOE-15',
    toStationId: 'JOE-14',
    direction: 'inbound',
    variant: 'loop',
    coordinates: [ /* 湯檜曽地上ホーム -> 水上地上 (3.55km) */ ]
  },

  // 【湯檜曽 〜 土合】
  {
    segmentId: 'JOE-15_JOE-16_DOWN',
    fromStationId: 'JOE-15',
    toStationId: 'JOE-16',
    direction: 'outbound',
    variant: 'shinsimizu',
    coordinates: [ /* 湯檜曽地下ホーム -> 新清水トンネル直進 -> 土合地下ホーム (3.60km) */ ]
  },
  {
    segmentId: 'JOE-16_JOE-15_UP',
    fromStationId: 'JOE-16',
    toStationId: 'JOE-15',
    direction: 'inbound',
    variant: 'loop',
    coordinates: [ /* 土合地上ホーム -> 清水トンネル -> 湯檜曽ループ線周回 -> 湯檜曽地上ホーム (6.66km) */ ]
  },

  // ... (土合 〜 土樽: 下りは新清水トンネル、上りは清水トンネル)
];
```

---

## 5. 自動幾何監査スクリプト (`audit_all_tracks.cjs`) での検証基準

上下非対称路線の導入に伴い、軌道監査スクリプトには以下の判定ロジックを組み込みます：

1. **実線形妥当性判定**:
   - `variant === 'loop'`（ループ線）として明示されているセグメントは、直線比率 1.5 〜 2.5 の迂回を「正規の幾何形状」として許容する。
2. **鋭角スパイク・逆走検出**:
   - セグメント単体内で 135 度以上の鋭角Uターンが存在しないこと（水上方面への逆走等の検出）。
3. **端点整合性**:
   - `direction === 'outbound'` セグメントの端点は `outbound` ホーム座標と 0m スナップされていること。
   - `direction === 'inbound'` セグメントの端点は `inbound` ホーム座標と 0m スナップされていること。

---

## 6. 段階的移行ロードマップ

```mermaid
timeline
    title 上下非対称軌道ルーティング 移行マイルストーン
    Phase 1 (完了) : 基準線（下り本線）の完全正規化 : 100km超迂回・Uターン逆走・駅間ギャップの完全排除
    Phase 2 : 型定義 & 補間エンジンの非破壊拡張 : TrackSegment への direction / variant 追加 : interpolateTrackPosition の方向対応
    Phase 3 : パイロット実装（上越線） : 湯檜曽ループ線（上り）セグメントの追加 : 地図上でのループ線・新清水トンネル同時描画検証
    Phase 4 : 全国路線への水平展開 : 東海道本線（大垣〜関ケ原 新垂井線） : 函館本線（七飯〜大沼 藤城線） : 都営大江戸線（6の字環状運転）
```

- **Phase 1（完了）**:
  - 全路線の基準軌道（下り本線）を高精度に正規化し、異常ループを完全に排除。
- **Phase 2**:
  - `TrackSegment` に `direction?: 'inbound' | 'outbound' | 'both'` を追加。既存路線はすべて `both`（または未指定）として扱われるため、後方互換性 100% を維持。
- **Phase 3**:
  - 上越線において、上り用ループ線（`JOE-16_JOE-15_UP` など）を登録し、下り列車がトンネルを走り、上り列車がループ線を走るアニメーションを実証。
- **Phase 4**:
  - 今後延伸予定の東海道本線（JR東海エリア: 大垣〜関ケ原の新垂井線）、函館本線（藤城線）等の全国展開時に標準適用。
