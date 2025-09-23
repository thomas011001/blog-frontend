import { Link } from "react-router-dom";
import { Clock, Heart, MessageCircleMore } from "lucide-react";
import formateDate from "../utils/formateDate";

export default function Article({ data }) {
  return (
    <div className="bg-card flex flex-col sm:flex-row shadow-2xl w-full overflow-hidden">
      <ArticleImg src={data.photoUrl} />
      <ArticleContent className="p-5 flex-1 flex flex-col gap-2">
        <ArticleTitle id={data.id}>{data.title}</ArticleTitle>
        <ArticleDescription>{data.description}</ArticleDescription>
        <ArticleOpenButton id={data.id} />
        <div className="flex gap-4 flex-wrap">
          <p className="flex gap-2 items-center text-primary">
            <Heart />
            {data._count.likes}
          </p>
          <p className="flex gap-2 items-center text-primary">
            <MessageCircleMore />
            {data._count.comments}
          </p>
          <p className="flex gap-2 items-center text-primary">
            <Clock />
            {formateDate(data.createdAt)}
          </p>
        </div>
      </ArticleContent>
    </div>
  );
}

export function ArticleImg({ src }) {
  return (
    <img src={src} alt="Article" className="h-60 sm:size-60 object-cover" />
  );
}

export function ArticleContent({ children }) {
  return <div className="p-5 flex-1 flex flex-col gap-2">{children}</div>;
}

export function ArticleTitle({ id, children }) {
  return (
    <h1 className="text-3xl">
      <Link to={`/posts/${id}`} className="font-serif hover:underline">
        {children}
      </Link>
    </h1>
  );
}

export function ArticleDescription({ children }) {
  return <p className="text-muted-foreground flex-1">{children}</p>;
}

export function ArticleOpenButton({ id }) {
  return (
    <p className="flex gap-2 items-center text-muted-foreground">
      <Link
        to={`/posts/${id}`}
        className="text-muted-foreground hover:underline"
      >
        open..
      </Link>
    </p>
  );
}
