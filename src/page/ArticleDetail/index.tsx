"use client"; 
import { articles } from "@/config"
import styles from "@/page/ArticleDetail/styles.module.scss"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { IArticle } from "@/interfaces/article.interface";

const ArticleDetail: FC<{ id: string }> = ({ id }) => {
  const article = articles[Number(id)]
  const [realArticle, setRealArticle] = useState<IArticle>({} as IArticle)

  const getArticles = async () => {
    const response = await fetch(`https://3133319-bo35045.twc1.net/api/v0/stories/${id}`, {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json();
    console.log('getArticles', data)
    const imageLink = await getImage(data.preview_image_id)
    console.log('imageLink', imageLink)
    data.image = 'https://3133319-bo35045.twc1.net/media/' + imageLink
    console.log("data", data)
    setRealArticle(data);
  }

  const getImage = async (imageId: number) => {
    const response = await fetch("https://3133319-bo35045.twc1.net/api/v0/get_images/?ids=" + imageId, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log('get image', data)
    return data[0];
  }

  useEffect(() => {
    getArticles();
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