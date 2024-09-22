"use client"; 
import styles from "@/components/Article/styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";

interface IArticle {
  image: string;
  time: Date;
  title: string;
  subtitle: string;
  id: number;
}

const Article: FC<IArticle> = ({ image, subtitle, time, title, id }) => {

  useEffect(() => {
    console.log('image', image)
  }, [image])

  return (
    <Link href={`/articles/${id}`}>
      <div className={`${styles.article}`}>
        <div className={styles.image}>
          <Image
            unoptimized
            src={image}
            alt={title}
            width={300}
            height={300}
            style={{objectFit: "contain"}}
          />
        </div>
        <p>
          {/* {time.getMinutes()}:{time.getSeconds()} */}
        </p>
        <h2>{title}</h2>
        {/* <h4>{subtitle}</h4> */}
      </div>
    </Link>
  );
};

export default Article;
