import Articles from "@/page/Articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Nordwibe",
  description: "A page with information and posts about us"
}

const ArticlesPage = () => {
  return <Articles />
}

export default ArticlesPage;