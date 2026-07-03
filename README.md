# 外川研究室 Sotokawa Lab. — 公式サイト

https://sotokawa-lab.github.io/

山形県立保健医療大学大学院 保健医療学研究科 作業療法学分野・外川佑研究室の公式サイトです。
脳卒中・脳損傷後の自動車運転と地域移動（driving & community mobility）のリハビリテーションを研究しています。

## 構成

| ファイル | 内容 |
|---|---|
| `index.html` | トップ（News / Research / Members / Admissions / Contact） |
| `members.html` | メンバー紹介 |
| `publications.html` | 研究業績（年別） |
| `snavi.html` ほか `snavi-*.html` | HONDAセーフティナビ活用ガイド |
| `css/style.css` | 共通スタイル（デザイントークンは`:root`のCSS変数） |
| `js/main.js` | スクロールリビール・メール表示 |

フレームワーク・ビルド工程なしの静的HTML/CSS/JSです。`main` ブランチにpushすると GitHub Pages が自動で公開します。

## 更新のしかた

- **お知らせの追加**：`index.html` の `<ul class="news-list">` に `<li>` を1つ追加し、古いものは `<details class="archive">` 内へ移動
- **業績の追加**：`publications.html` の該当年の `<ol class="pub-list">` に追加（年がなければ `<h2 class="pub-year">` から新設）
- **メンバーの更新**：`members.html` のプロフィールカードを編集

## デザイン

- フォント：Shippori Mincho B1（見出し）× Noto Sans JP（本文）× JetBrains Mono（ラベル）
- 配色：白基調×ブルー（`--blue: #1f4fa0`）。CSS変数で一元管理
- シグネチャ：道路のセンターラインを模した破線ディバイダ（`.road`）
