# Sナビ活用ガイド｜外川研究室 Sotokawa Lab.
# https://sotokawa-lab.github.io/snavi-r-matching.html
# Sナビデータと神経心理検査データベースのマッチング・結合
# 前提：両データセットに共通の「ID」列が必要です（記事本文参照）
# 使用は自己責任でお願いします（サイトの免責事項参照）

# IDが入っているカルテから集積したデータセットを用意する
dat2<-read_csv("神経心理検査が格納されている.csv")

#今回はdatとdat2について、IDをkeyにしてマッチング・結合
finaldata<-left_join(dat,dat2,by=c("ID"))
