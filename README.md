# KACHINOVA — REAL ESTATE TECHNOLOGY

> REINVENTING THE VALUE OF LIVING. ／ 住まいの価値を、再発明する。
> AI × REAL ESTATE × SMART LIVING

中古区分マンションの買取・再生・再販を行う不動産テクノロジー企業 **KACHINOVA** のコーポレートサイト。

---

## 1. 構成の考え方

**素の HTML / CSS / JS。ランタイム依存ゼロ。** ビルド済みの `.html` をそのまま置けば動きます
（GitHub Pages / XServer / S3 / Netlify / どこでも）。

Node は「ヘッダー・フッター・共通パーツを 1 か所で管理するため」だけに使う静的ジェネレータで、
**配信には一切不要**です。

```
/
├─ index.html  about.html  business.html  technology.html      ← 生成物（コミット対象）
│  projects.html  lab.html  journal.html  company.html
│  sell.html  contact.html  privacy.html  404.html
├─ sitemap.xml  robots.txt  site.webmanifest  .nojekyll        ← 生成物
│
├─ assets/
│   ├─ css/kachinova.css      デザインシステム（単一ファイル）
│   ├─ js/kachinova.js        動作（単一ファイル・依存なし）
│   ├─ img/                   ロゴ・編集用スチル・OG
│   │   └─ video-posters/     6本ぶんのポスター（WebP + JPEG × 3幅）
│   └─ videos/                kachinova-<shot>.mp4 / .webm
│
├─ src/                       ← ソース（配信不要）
│   ├─ site.mjs               ブランド定数・会社情報・ナビ・FILM 定義
│   ├─ components.mjs         head / header / footer / film / statement / plan …
│   └─ pages/*.mjs            各ページの本文
│
├─ tools/
│   ├─ build.mjs              src → ルートの .html を生成
│   ├─ media.py               写真のカラーグレード・ポスター書き出し・ロゴ抽出
│   ├─ videos.sh              ffmpeg で 6 本のループ動画を生成
│   ├─ shot.mjs               各ブレークポイントのスクリーンショット（開発用）
│   └─ overflow.mjs           横スクロール検出（開発用）
│
├─ images/                    支給素材の原本（配信不要／改変しない）
├─ DATA_REQUIRED.md           未確定情報の一覧 ← 公開前に必ず確認
├─ DESIGN_SYSTEM.md           デザイン言語の定義
└─ STORYBOARD.md              TOP ページの絵コンテと 6 本の動画配置
```

## 2. 開発

```bash
npm install          # puppeteer-core（スクリーンショット用）のみ
npm run build        # src/pages/*.mjs → ルートの .html
npm run serve        # http://localhost:4477
```

コンテンツを直すときは **`src/` を編集 → `npm run build`**。
ルートの `.html` を直接編集しても、次のビルドで上書きされます。

会社情報・ナビ・ブランド文言は `src/site.mjs` の 1 か所に集約されています。

## 3. メディアパイプライン

支給素材（`images/`）は撮影条件がバラバラなので、**全カットに同一のフィルムグレード**
（トライトーンの階調ランプ＋わずかな寒色寄せ＋グレイン）を当てて 1 本の映像作品として成立させています。

```bash
npm run media                 # 静止画のグレード＋ポスター書き出し＋ロゴ抽出＋OG生成
npm run videos                # 6本すべて生成（ffmpeg 必須）
bash tools/videos.sh city ai  # 指定したカットだけ再生成
```

- 動画の動きは **正弦波（0→1→0）** で記述しているため、最初と最後のフレームが完全に一致し、
  ループの継ぎ目が出ません。
- 出力は 1280×720 / 12 秒 / 無音。MP4（H.264）と WebM（VP9）の両方。
- グレード済みのマスターは `.media-masters/`（配信不要）。

> 現在の動画は支給された静止画から生成した擬似的な映像です。実写素材が用意でき次第、
> **同じファイル名で差し替えるだけ**でコード変更なしに切り替わります（DATA_REQUIRED.md 参照）。

## 4. 動画のパフォーマンス設計

6 本を同時にダウンロードすることは絶対にありません。

| 条件 | 挙動 |
|---|---|
| 初期表示 | **HERO の 1 本のみ**（WebM 約 570KB）。他は `preload="none"` で 0 バイト |
| スクロール | IntersectionObserver（前後 35%）で近づいたものだけ `<source>` を注入して読み込み |
| 画面外 | 自動で `pause()`。タブが非表示になっても停止 |
| `prefers-reduced-motion: reduce` | **動画を一切読み込まない**。ポスター静止画のみ |
| `Save-Data` / 2G・3G 回線 | 同上。ポスターのみ |
| 動画の読み込み失敗 | ポスターが表示されたまま。レイアウト崩れなし |

`<video>` は常に `<img>` ポスターの上に重なり、**実際に 1 フレームデコードできたときだけ**
フェードインします。動画ファイルが 1 本も存在しなくてもサイトは完成品として成立します。

## 5. デプロイ

`.nojekyll` を含むリポジトリのルートをそのまま配信してください。

- **GitHub Pages**: Settings → Pages → Deploy from a branch → `/ (root)`
- **XServer 等**: `src/`・`tools/`・`images/`・`node_modules/`・`.media-masters/` を除いた
  ルート一式をアップロード

公開前に:

1. `src/site.mjs` の `SITE.origin` を本番ドメインに変更 → `npm run build`
2. **`DATA_REQUIRED.md` をすべて確認**（特に宅建業免許番号・所在地・代表者）
3. フォームの送信先エンドポイントを設定（`action="#"` のまま公開しない）
4. `assets/videos/` を配信する CDN があれば、`data-video` のパスを差し替え

## 6. 品質チェック（開発用）

```bash
node tools/overflow.mjs index.html 390     # 横スクロールの検出
node tools/shot.mjs index.html 1440 --slices=12   # 分割スクリーンショット
```

確認済み: 360 / 390 / 430 / 768 / 1024 / 1440 / 1920px で横スクロールなし。
写真の上以外のテキストは全ページ WCAG 2.1 AA（4.5:1）を満たしています。

## 7. コンテンツの原則

**事実として確認できない情報は書かない。** 未確定の項目はページ上で
`確認中 ／ DATA_REQUIRED` と明示され、推定値では埋めていません。
AI 機能は `LIVE / IN DEVELOPMENT / RESEARCH / FUTURE` のステータス付きでのみ記載します。
詳細は `DATA_REQUIRED.md`。
