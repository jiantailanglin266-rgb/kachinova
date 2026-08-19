# DATA_REQUIRED — 未確定情報の一覧

このサイトは **事実として確認できていない情報を一切掲載しない** 方針で作られています。
未確定の項目はページ上で `確認中 ／ DATA_REQUIRED` と明示され、推定値や仮の数値では埋めていません。

確定した情報を入れる場所は、原則 `src/site.mjs` の 1 か所だけです。値を入れて `npm run build` すると、
該当ページのプレースホルダが自動的に実データへ置き換わります。

---

## A. 法定・企業情報（最優先／掲載必須）

`src/site.mjs` → `COMPANY`

| キー | 項目 | 影響ページ | 備考 |
|---|---|---|---|
| `legalName` | 商号（登記上の正式名称） | company / privacy | 「KACHINOVA」はブランド名。登記名と異なる場合は両方必要 |
| `representative` | 代表者名 | company | |
| `founded` | 設立年月 | company | |
| `capital` | 資本金 | company | |
| `address` | 本店所在地 | company / contact / privacy | 郵便番号・ビル名まで |
| `tel` | 代表電話番号 | company / contact / privacy | |
| `email` | 問い合わせメールアドレス | company / contact / privacy / **全フォーム** | 未設定の間、フォームはメーラー起動にフォールバック |
| `license` | **宅地建物取引業免許番号** | company | 免許証の記載どおり。**絶対に推測で書かない** |
| `licenseHolder` | 専任の宅地建物取引士 | company | |

> ⚠️ 宅地建物取引業免許番号・所在地・代表者は、宅建業法上の表示義務に関わります。
> 確定するまでは空欄（DATA_REQUIRED 表示）のまま公開してください。

## B. サイト設定

| 対象 | 場所 | 内容 |
|---|---|---|
| 本番オリジン | `src/site.mjs` → `SITE.origin` | 現在 `https://kachinova.co.jp` を仮置き。canonical / OG / sitemap / JSON-LD に反映 |
| フォーム送信先 | `src/pages/80-sell.mjs`, `85-contact.mjs` の `action="#"` | Formspree / SSGform / 自社 API など。設定すると JS は通常の POST に切り替わる |
| アクセス解析 | `privacy.html` 第9項 | 導入したツール名・提供事業者・オプトアウト方法を追記 |
| プライバシーポリシー制定日 | `src/pages/90-privacy.mjs` | |

## C. 実績・コンテンツ

| 項目 | 場所 | 状態 |
|---|---|---|
| PROJECTS（販売・再生実績） | `src/pages/40-projects.mjs` → `PROJECTS = []` | **空。サンプル物件を入れない**（実取引と誤認されるため） |
| JOURNAL 記事 | `src/pages/60-journal.mjs` → `ENTRIES = []` | 空 |
| BEFORE / AFTER 写真 | projects | 撮影・関係者同意の取得後 |
| 住宅ストック・空き家の統計数値 | `about.html`（WHY REUSE） | 出典（住宅・土地統計調査等）を明示できる形で |
| 省エネ性能値・光熱費削減率 | `technology.html`（ECO LIVING） | 実測または計算根拠が示せる場合のみ |
| 査定回答までの日数 | `sell.html` FAQ | 運用が固まってから |
| 採用の募集職種・条件 | `about.html`（RECRUIT） | |
| LAB の各テーマのステータス | `src/pages/50-lab.mjs` → `THEMES[].status` | 現在 LIVE は 0 件。実運用に入ったら `live` に更新 |

## D. ビジュアル素材

| 項目 | 現状 | 差し替え方法 |
|---|---|---|
| 6本の動画 | **`images/` の静止画から ffmpeg で生成した擬似的な映像**（12秒シームレスループ） | 実写素材ができ次第 `assets/videos/kachinova-<shot>.{mp4,webm}` を差し替え。ファイル名を変えなければコード変更不要 |
| FILM 03 RE:VALUE / 04 SMART LIVING | 室内・スマートホームの実写素材が無いため、外観カットで代用 | 室内撮影後に差し替え。合わせてポスターも再生成 |
| 間取り図（THE REVALUE LINE） | **概念図**。実在の物件ではない旨をSVG内に明記済み | 実物件の図面に置き換える場合は `src/components.mjs` の `plan()` を編集 |
| ロゴ | `images/` のブランドボード PNG から自動抽出（背景透過・白ヌキ版を生成） | **ベクター（AI / SVG）が手に入り次第置き換え推奨**。現状はラスタのため極端な拡大に弱い |
| OG 画像 | 自動生成（都市カット＋ロゴ） | 必要に応じて `tools/media.py` の `build_og()` を調整 |

## E. 掲載してはいけないもの（恒久ルール）

- 架空の取引実績・買取件数・売上・顧客・受賞
- 実装していない AI 機能を「稼働中」と書くこと
- 根拠のない査定精度・削減率・性能値
- 未確定の免許番号・住所・代表者名
- 他社サイトからの文言・画像の転用

新しい数値や実績を載せるときは、**出典または社内の一次資料を必ず添えてください。**
