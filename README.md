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
│   ├─ media.py               写真のカラーグレード・ロゴ抽出・OG生成
│   ├─ films.py               納品動画のグレード／ループ化／ポスター書き出し
│   ├─ kachinova.cube         grade() から生成した 3D LUT（films.py が出力）
│   ├─ shot.mjs / overflow.mjs 検証用（スクリーンショット・横スクロール検出）
│   └─ deploy-pages.sh        GitHub Pages 用ビルド
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

素材は撮影条件も色もバラバラなので、**静止画と動画の全カットに同一のフィルムグレード**
（トライトーンの階調ランプ＋わずかな寒色寄せ＋グレイン）を当て、1本の映像作品として成立させています。

```bash
npm run media     # 静止画：グレード＋ロゴ抽出＋OG生成
npm run films     # 動画：納品6本のグレード・ループ化・ポスター書き出し
```

### 動画（tools/films.py）

納品された6本（864×496 / 24fps / 15秒 / 音声あり）を、そのままでは使いません。

| 工程 | 内容 |
|---|---|
| **1. LUT 生成** | `tools/media.py` の `grade()` をそのまま 33³ の 3D LUT（`tools/kachinova.cube`）に書き出す。静止画と動画の色が「目視で近い」ではなく**定義上一致**する |
| **2. 露出のショットマッチ** | 納品素材の平均輝度は 0.112〜0.367 と **3.3倍**ばらついていた。カットごとに目標輝度を決め、LUT 適用前のガンマを**二分探索で自動算出**して合わせる |
| **3. グレード** | 16:9 に切り出し → 1280×720 → LUT → 軽いシャープ → ビネット → フレーム単位グレイン |
| **4. シームレスループ化** | 納品素材は一方向のカメラワークでループしない。**末尾1.6秒を先頭へディゾルブ**して繋ぐ（最終フレーム≒最初のフレーム） |
| **5. ポスター再書き出し** | 完成した動画から1フレーム抜いてポスターを作る。**再生開始フレームとポスターが一致**するので、動画がフェードインする瞬間に絵が飛ばない |

**露出の目標値は1つに揃えていません。** dawn → 暗い室内 → 変化 → 夕景 → 朝 → 夜、という
スクロールの光のアークを保つため、カットごとに目標を変えています（`TARGET_L`）。

```bash
python tools/films.py            # 6本すべて
python tools/films.py city ai    # 指定したカットだけ
```

出力：1280×720 / 約13.4秒 / **無音** / MP4（H.264）＋ WebM（VP9）。

### 静止画（tools/media.py）

ロゴは支給ブランドボードから自動抽出（背景透過・白ヌキ版・ファビコン）。

下層ページの見出し背景は、**`lab-globe` の1点を除いてすべて納品映像から切り出し**ています
（`tools/films.py` の `STILLS_FROM_FILM`）。

| 画像 | 出所 |
|---|---|
| `about-city` | FILM 01 @62% |
| `tech-mind` | FILM 02 @13%（ポスターは42%なので同じ映像の別の瞬間） |
| `why-reuse` | FILM 03 @6%（内装のない状態＝既存ストック） |
| `sell-city` | FILM 06 @88% |
| `lab-globe` | 支給写真（対応する映像がないため）。ページ見出しとして白文字が乗るので、
  グレード後に平均輝度 0.30 へ引き下げています（`_to_level`） |

## 4. 動画のパフォーマンス設計

6 本を同時にダウンロードすることは絶対にありません。

| 条件 | 挙動 |
|---|---|
| 初期表示 | **HERO の 1 本のみ**（WebM）。他は `preload="none"` で 0 バイト |
| スクロール | IntersectionObserver（前後 35%）で近づいたものだけ `<source>` を注入して読み込み |
| 画面外 | 自動で `pause()`。タブが非表示になっても停止 |
| `prefers-reduced-motion: reduce` | **動画を一切読み込まない**。ポスター静止画のみ |
| `Save-Data` / 2G・3G 回線 | 同上。ポスターのみ |
| 動画の読み込み失敗 | ポスターが表示されたまま。レイアウト崩れなし |

`<video>` は常に `<img>` ポスターの上に重なり、**実際に 1 フレームデコードできたときだけ**
フェードインします。動画ファイルが 1 本も存在しなくてもサイトは完成品として成立します。

## 5. 公開URL（現在）

**https://jiantailanglin266-rgb.github.io/kachinova/**

GitHub Pages のプロジェクトサイトとして公開中。現在は **noindex**（検索エンジンに載りません）。
関係者への確認用URLとして機能します。

### ⚠️ ビルドは2種類あります

サブディレクトリ配信のため、パスの前に `/kachinova` を付けたビルドが必要です。

```bash
npm run build                 # ルート配信用（ローカル確認・独自ドメイン用）
bash tools/deploy-pages.sh    # GitHub Pages 用（/kachinova を前置＋noindex）
```

**`npm run build` だけを実行して push すると、公開サイトの CSS・画像・動画が 404 になります。**
GitHub Pages を更新するときは必ず：

```bash
bash tools/deploy-pages.sh
git add -A && git commit -m "..." && git push
```

環境変数で切り替えられます（`tools/deploy-pages.sh` が設定）。

| 変数 | 意味 |
|---|---|
| `BASE_PATH` | サブディレクトリ名。`kachinova` → 全パスに `/kachinova` を前置 |
| `SITE_ORIGIN` | canonical / OG / sitemap / JSON-LD のオリジン |
| `NOINDEX` | `1` で全ページ `noindex,nofollow` ＋ robots.txt を `Disallow: /` |

### 独自ドメインに移すとき

1. リポジトリに `CNAME` ファイル（中身はドメイン名）を追加
2. `SITE_ORIGIN=https://例.co.jp NOINDEX=0 node tools/build.mjs`（`BASE_PATH` は付けない）
3. 公開情報（DATA_REQUIRED）が揃っていることを確認してから push

## 6. デプロイ（一般）

`.nojekyll` を含むリポジトリのルートをそのまま配信してください。

- **GitHub Pages**: Settings → Pages → Deploy from a branch → `/ (root)`
- **XServer 等**: `src/`・`tools/`・`images/`・`node_modules/`・`.media-masters/` を除いた
  ルート一式をアップロード

公開前に:

1. `src/site.mjs` の `SITE.origin` を本番ドメインに変更 → `npm run build`
2. **`DATA_REQUIRED.md` をすべて確認**（特に宅建業免許番号・所在地・代表者）
3. フォームの送信先エンドポイントを設定（`action="#"` のまま公開しない）
4. `assets/videos/` を配信する CDN があれば、`data-video` のパスを差し替え

## 7. 品質チェック（開発用）

```bash
node tools/overflow.mjs index.html 390     # 横スクロールの検出
node tools/shot.mjs index.html 1440 --slices=12   # 分割スクリーンショット
```

確認済み: 360 / 390 / 430 / 768 / 1024 / 1440 / 1920px で横スクロールなし。
写真の上以外のテキストは全ページ WCAG 2.1 AA（4.5:1）を満たしています。

## 8. コンテンツの原則

**事実として確認できない情報は書かない。** 未確定の項目はページ上で
`確認中 ／ DATA_REQUIRED` と明示され、推定値では埋めていません。
AI 機能は `LIVE / IN DEVELOPMENT / RESEARCH / FUTURE` のステータス付きでのみ記載します。
詳細は `DATA_REQUIRED.md`。
