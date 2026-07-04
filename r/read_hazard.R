# Sナビ活用ガイド｜外川研究室 Sotokawa Lab.
# https://sotokawa-lab.github.io/snavi-r-import.html
# 危険予測体験のデータ読み込み〜データセット整形
# ※事前にzipファイルの一括解凍が必要です（unzip_all.bat と記事本文を参照）
# 事前に tidyverse / here パッケージの読み込みが必要です（read_task_shiya3.R 冒頭参照）
# 使用は自己責任でお願いします（サイトの免責事項参照）

dat2<-map_dfr(
  list.files(
    here("INSPECTIONDATA","危険予測体験/展開"),
#INSPECTIONDATAフォルダ内のbatで展開したフォルダが格納されているフォルダを指定
    pattern = "危険予測体験\\(上級\\)_01",
#pattern=は抽出したいファイルの名前のキーワードを指定「***********_ID_上級_1」などで格納されている．初・中・上級とコース番号を指定
#「(」と「)」の前には「\\」を入れておくこと
    full.names = TRUE,
    recursive = TRUE),
#下位フォルダも含めて検索
  ~read_csv(.x, #読み込むための関数
            col_names = TRUE, #先頭行に項目名が含まれているので、col_names=TRUEとする
            locale = locale(encoding = "shift-jis"))#文字化け対策として設定
)

lf <- list.files( #ここはID番号を作るためのコード
   here("INSPECTIONDATA","危険予測体験/展開"), #INSPECTIONDATAフォルダとbatで展開したフォルダが格納されているフォルダを指定
    pattern = "危険予測体験\\(上級\\)_01", #pattern=は抽出したいフォルダの名前を指定
    full.names = TRUE,
    recursive = TRUE) %>%
  as.data.frame()
a<-str_split(lf$.,"_") %>%
  as.data.frame() %>%
  t() %>%
  as.data.frame()

dat3<-bind_cols(a$V2,dat2)
dat3<-rename(dat3,ID=...1)
