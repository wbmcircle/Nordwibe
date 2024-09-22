"use client";

import Article from "@/components/Article";
import { IArticle } from "@/interfaces/article.interface";
import styles from "@/page/Articles/styles.module.scss";
import { useEffect, useState } from "react";
import { getArticles, getImage } from "@/service/api";

const Articles = () => {

  const [realArticles, setRealArticles] = useState<IArticle[]>([])

  const fetchArticles = async () => {
    const data = await getArticles();
    const articlesWithImages = await Promise.all(data.map(async (_article: any) => {
      const imageLink = await getImage(_article.preview_image_id);
      _article.image = 'https://3133319-bo35045.twc1.net/media/' + imageLink;
      return _article; 
    }));
    setRealArticles(articlesWithImages);
  }

  useEffect(() => {
    fetchArticles();
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
