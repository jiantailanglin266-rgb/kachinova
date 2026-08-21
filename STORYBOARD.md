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
| 00 | **HERO** | **FILM 01 THE CITY**（夕暮れの東京・ガラスの高層建築） | REINVENT THE VALUE OF LIVING. ／ 住まいの価値を、再発明する。 |
| 01 | 暗転・巨大文字 | なし（間） | 日本には、まだ価値を引き出せていない住まいがある。 |
| 02 | 暗転・巨大文字（右寄せ） | なし（間） | 築年数だけで、住宅の価値は決まらない。 |
| 03 | 4語の連打 | スタッガー | DESIGN. / TECHNOLOGY. / ENERGY. / DATA. |
| 04 | 中央・結論 | なし（間） | 私たちは、住まいの価値を再設計する。 |
| 05 | マーキー | 横スクロール帯 | REINVENTING THE VALUE OF LIVING … |
| 06 | **WHAT WE DO** | 左スティッキー＋工程リスト | RESIDENTIAL REVALUE ／ ACQUIRE → ANALYZE → DESIGN → REBUILD → REVALUE |
| 07 | **AI × REAL ESTATE** | **FILM 02**（和の室内・床に走る解析線） | From instinct to evidence. ／ 不動産を、経験だけで判断しない。 |
| 08 | 誠実さの注記 | ステータスチップ | LIVE / IN DEVELOPMENT / RESEARCH / FUTURE |
| 09 | **RE:VALUE** | **FILM 03**（素の住戸→仕上げられた空間・右寄せ） | Re:value the home. ／ 既存住宅に、新しい価値を。 |
| 10 | **ACQUIRE** | 7軸のタイル | What we look at. |
| 11 | **RE:DESIGN** | 反転（紙）＋**署名モーション** | Not restored. Re-engineered. ／ 新品に戻すのではなく、次の時代に合わせて設計し直す。 |
| 12 | **SMART LIVING** | **FILM 04**（夕景の住戸・間接照明） | Technology, dissolved into daily life. |
| 13 | 採用方針＋間取り図 | 署名モーションの反復（ノード違い） | Chosen per home, never by default. |
| 14 | **ECO LIVING** | **FILM 05**（朝の光・木の床・東京の街並み・右寄せ） | Less energy. More value. ／ 省エネを、我慢ではなく価値に。 |
| 15 | **THREE VALUES** | 各 88svh の大面 | 01 TECHNOLOGY / 02 DESIGN / 03 SUSTAINABILITY |
| 16 | **WHY REUSE?** | 反転（紙）＋FILM 03 冒頭の静止画 | 建てるだけが、未来ではない。 |
| 17 | **BUSINESS MODEL** | 7ステート | PROPERTY → … → NEW OWNER |
| 18 | PROJECTS / LAB / JOURNAL | 3タイル | 準備中は正直にチップ表示 |
| 19 | **FINAL CINEMATIC** | **FILM 06**（夜の住戸→都市夜景・中央寄せ） | 住まいは、もっと進化できる。→ REAL ESTATE RE-ENGINEERED. → KACHINOVA |
| 20 | CTA | 2分割 | SELL TO KACHINOVA ／ CONTACT |

TOP ページ総高：約 22,900px（1440px 幅）。

---

## 6本の動画

| # | ファイル | 内容 | 配置 |
|---|---|---|---|
| 01 | `kachinova-city` | 夕暮れの東京。ガラス張りの高層建築の間を抜け、眼下に街の灯り | TOP ヒーロー ／ about ／ contact ／ 404 |
| 02 | `kachinova-ai` | 静かな和の室内。床と壁に沿って細い解析線が走る | TOP ／ technology |
| 03 | `kachinova-revalue` | 内装のない既存住戸 → 木質で仕上げられた空間へ**変化していく** | TOP ／ business ／ projects |
| 04 | `kachinova-smart` | 夕暮れの住戸。間接照明が灯り、窓の外に街の光 | TOP ／ technology |
| 05 | `kachinova-eco` | 朝の光が差し込む木の床の室内と、窓の外の東京 | TOP ／ technology ／ journal |
| 06 | `kachinova-future` | 夜。灯りのともる住戸から見下ろす都市の夜景 | TOP 最終カット ／ sell |

FILM 03 だけは他と性質が違い、**カット内で「変化そのもの」が起きます**。
RE:VALUE というブランドの中心概念を、演出ではなく被写体として写しているカットなので、
差し替えの際もこの「変化する」性質は維持してください。

**仕様**：1280×720 / 約13.4秒 / 24fps / **無音** / MP4(H.264) + WebM(VP9)。
末尾1.6秒を先頭へディゾルブしてあるため、**継ぎ目なくループ**します。

**色**：納品素材は平均輝度が 0.112〜0.367 と3.3倍ばらついていたため、
静止画と共通の 3D LUT を当てたうえで、カットごとに露出を自動整合させています。
ただし1つの値には揃えず、**スクロールの光のアーク**を残しています。

| カット | LIGHT 目標輝度 | DARK 目標輝度 |
|---|---|---|
| 01 city | 0.58 | 0.24 |
| 02 ai | 0.60 | 0.22 |
| 03 revalue | 0.70 | 0.38 |
| 04 smart | 0.62 | 0.30 |
| 05 eco | **0.78**（最も明るい拍） | 0.46 |
| 06 future | 0.50（最も暗い拍） | 0.18 |

高輝度側では S カーブを 0.34 → 0.16 に、グレインとビネットも弱めています。
暗いプレートで「シネマティック」に見えるコントラストは、明るいプレートでは
単に「きつい」だけになるためです。

**読み込み**：初期は HERO の1本だけ。他はスクロールで近づいたときのみ。
`prefers-reduced-motion` / `Save-Data` / 低速回線では **1本も読み込まず**ポスターのみ。

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
