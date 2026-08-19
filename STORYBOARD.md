# KACHINOVA — TOP ページ絵コンテ

スクロールで一本のブランドムービーを体験する構成。
`Header → Hero → カード → カード → Footer` にはしない。

---

## 全体の流れ

```
不動産  →  再生  →  Technology  →  AI  →  Smart Home  →  Energy  →  新しい暮らし
```

| # | セクション | 映像 / 演出 | 主なコピー |
|---|---|---|---|
| 00 | **HERO** | **FILM 01 THE CITY**（夜の東京・タワー） | REINVENT THE VALUE OF LIVING. ／ 住まいの価値を、再発明する。 |
| 01 | 暗転・巨大文字 | なし（間） | 日本には、まだ価値を引き出せていない住まいがある。 |
| 02 | 暗転・巨大文字（右寄せ） | なし（間） | 築年数だけで、住宅の価値は決まらない。 |
| 03 | 4語の連打 | スタッガー | DESIGN. / TECHNOLOGY. / ENERGY. / DATA. |
| 04 | 中央・結論 | なし（間） | 私たちは、住まいの価値を再設計する。 |
| 05 | マーキー | 横スクロール帯 | REINVENTING THE VALUE OF LIVING … |
| 06 | **WHAT WE DO** | 左スティッキー＋工程リスト | RESIDENTIAL REVALUE ／ ACQUIRE → ANALYZE → DESIGN → REBUILD → REVALUE |
| 07 | **AI × REAL ESTATE** | **FILM 02**（都市＋データ網） | From instinct to evidence. ／ 不動産を、経験だけで判断しない。 |
| 08 | 誠実さの注記 | ステータスチップ | LIVE / IN DEVELOPMENT / RESEARCH / FUTURE |
| 09 | **RE:VALUE** | **FILM 03**（水辺の既存マンション・右寄せ） | Re:value the home. ／ 既存住宅に、新しい価値を。 |
| 10 | **ACQUIRE** | 7軸のタイル | What we look at. |
| 11 | **RE:DESIGN** | 反転（紙）＋**署名モーション** | Not restored. Re-engineered. ／ 新品に戻すのではなく、次の時代に合わせて設計し直す。 |
| 12 | **SMART LIVING** | **FILM 04**（夕暮れの住戸の灯り） | Technology, dissolved into daily life. |
| 13 | 採用方針＋間取り図 | 署名モーションの反復（ノード違い） | Chosen per home, never by default. |
| 14 | **ECO LIVING** | **FILM 05**（緑化テラス・朝の街・右寄せ） | Less energy. More value. ／ 省エネを、我慢ではなく価値に。 |
| 15 | **THREE VALUES** | 各 88svh の大面 | 01 TECHNOLOGY / 02 DESIGN / 03 SUSTAINABILITY |
| 16 | **WHY REUSE?** | 反転（紙）＋写真 | 建てるだけが、未来ではない。 |
| 17 | **BUSINESS MODEL** | 7ステート | PROPERTY → … → NEW OWNER |
| 18 | PROJECTS / LAB / JOURNAL | 3タイル | 準備中は正直にチップ表示 |
| 19 | **FINAL CINEMATIC** | **FILM 06**（夜の東京・中央寄せ） | 住まいは、もっと進化できる。→ REAL ESTATE RE-ENGINEERED. → KACHINOVA |
| 20 | CTA | 2分割 | SELL TO KACHINOVA ／ CONTACT |

TOP ページ総高：約 22,900px（1440px 幅）。

---

## 6本の動画

| # | ファイル | 内容 | 配置 |
|---|---|---|---|
| 01 | `kachinova-city` | 夜の東京。塔と都市の光。ゆっくり寄る | TOP ヒーロー ／ contact ／ about ／ 404 |
| 02 | `kachinova-ai` | 都市とデータネットワーク。ゆっくり引く | TOP ／ technology |
| 03 | `kachinova-revalue` | 水辺に建つ既存の分譲マンション。横に流れる | TOP ／ business ／ projects |
| 04 | `kachinova-smart` | 夕暮れの高層住宅。ガラス越しの灯り | TOP ／ technology |
| 05 | `kachinova-eco` | 緑化テラスと朝の街 | TOP ／ technology ／ journal |
| 06 | `kachinova-future` | 夜の東京。窓の明かりと街路 | TOP 最終カット ／ sell |

**仕様**：1280×720 / 12 秒 / 30fps / 無音 / MP4(H.264) + WebM(VP9)。
動きは正弦波（0→1→0）で記述しているため、**継ぎ目なくループ**します。

**読み込み**：初期は HERO の 1 本だけ（WebM 約 570KB）。他はスクロールで近づいたときのみ。
`prefers-reduced-motion` / `Save-Data` / 低速回線では **1 本も読み込まず**ポスターのみ。

---

## 下層ページのリズム

各下層ページも同じ文法で構成しています。

| ページ | 構成 |
|---|---|
| **ABOUT** | ヒーロー → 立ち位置 → マーキー → ブランドメッセージ → WHY REUSE（紙） → 3つの価値 → RECRUIT |
| **BUSINESS** | ヒーロー → 5工程 → 7つの評価軸 → FILM 03 → RE:DESIGN（紙＋署名モーション） → ビジネスモデル → ご売却の流れ |
| **TECHNOLOGY** | ヒーロー → 誠実さの宣言 → FILM 02 → AI 領域（ステータス付） → FILM 04 → SMART LIVING → FILM 05 → ECO（紙） |
| **PROJECTS** | ヒーロー → 空の状態（正直に）→ 公開フォーマットの定義 |
| **LAB** | ヒーロー → 4つのステータス定義 → マーキー → 6テーマ → 協業（紙） |
| **JOURNAL** | ヒーロー → 空の状態 → 扱うトピック |
| **COMPANY** | ヒーロー → 会社概要（DATA_REQUIRED 明示）→ お取引前の確認事項（紙） |
| **SELL** | ヒーロー → 3つの特徴 → 査定フォーム（紙）→ FAQ |
| **CONTACT** | ヒーロー → 窓口の振り分け → フォーム（紙） |
