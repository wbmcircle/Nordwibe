"use client"; 
import { articles } from "@/config"
import styles from "@/page/ArticleDetail/styles.module.scss"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { IArticle } from "@/interfaces/article.interface";
import { getArticles, getImage } from "@/service/api";

const ArticleDetail: FC<{ id: string }> = ({ id }) => {
  const article = articles[Number(id)]
  const [realArticle, setRealArticle] = useState<IArticle>({} as IArticle)

  const fetchArticle = async () => {
    const data = await getArticles();
    const imageLink = await getImage(data.preview_image_id);
    data.image = 'https://3133319-bo35045.twc1.net/media/' + imageLink;
    setRealArticle(data);
  }

  useEffect(() => {
    fetchArticle();
  }, [id])

  if (!article) return notFound()

  return <div className={styles.articleDetail}>
    <div className={styles.image}>
      <Image unoptimized src={realArticle?.image} alt={article.image} width={300} height={300} />
    </div>
    <h6>{article.time.getHours()}:{article.time.getMinutes()}</h6>
    <h2>{realArticle.title}</h2>
    <h4>{article.subtitle}</h4>
    <p>{article.content}</p>
  </div>
}

export default ArticleDetail;