import { Input } from "../components/InputField";
import { useState } from "react";
import Articles from "../components/Articles";
import SortBy from "../components/SortBy";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(false);
  return (
    <div className="flex flex-col gap-5 my-5 max-w-200 mx-auto flex-1 w-full">
      <header className="flex flex-col sm:flex-row  gap-2 justify-between w-full">
        <h1 className="text-4xl sm:text-5xl text-foreground font-serif">
          Articles
        </h1>
        <Input
          placeholder={"Search"}
          value={keyword}
          handler={(e) => setKeyword(e.target.value)}
        />
      </header>
      <hr />
      <div className="flex gap-5 itmes-center justify-center">
        <p className="rounded-md border-1 border-primary-foreground bg-gray-800 text-primary-foreground p-1 text-sm">
          Sort Order
        </p>
        <SortBy value={sort} setValue={setSort} />
      </div>
      <Articles keyword={keyword} sort={sort} />
    </div>
  );
}
