"use client";

import Article from "@/components/Article";
import { articles } from "@/config";
import styles from "@/page/Articles/styles.module.scss";
import { useEffect, useState } from "react";
import { IArticle } from "@/interfaces/article.interface";

const Articles = () => {

  const [realArticles, setRealArticles] = useState<IArticle[]>([])

  const getArticles = async () => {
    const response = await fetch("https://3133319-bo35045.twc1.net/api/v0/stories/", {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json();
    data.map(async (_article: any) => {
      const imageLink = await getImage(_article.preview_image_id)
      console.log('imageLink', imageLink)
      _article.image = 'https://3133319-bo35045.twc1.net/media/' + imageLink
    })
    console.log('data', data)
    setRealArticles(data);
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
    return data[0];
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div className={`${styles.articles}`}>
      <h1>О НАС</h1>
      <div className={styles.grid}>
        {realArticles.map(article => (
          <Article
            image={article.image}
            subtitle={"subtitle"}
            time={new Date()}
            title={article.title}
            id={article.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;
