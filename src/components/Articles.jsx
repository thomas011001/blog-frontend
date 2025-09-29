import Article from "./Article";
import usePosts from "../hooks/usePosts";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Articles({ keyword, user = null, sort = true }) {
  const [page, setPage] = useState(1);
  const { data, loading, error } = usePosts(
    page,
    keyword,
    user,
    sort ? "asc" : "desc"
  );

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return (
    <>
      <div className="flex gap-5 items-center justify-center">
        {data && !loading ? (
          data.data.map((p) => <Article key={p.id} data={p} />)
        ) : (
          <div
            className="animate-spin inline-block w-8 h-8 border-4 border-t-primary border-gray-200 rounded-full"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <Pagination
        value={page}
        handler={setPage}
        meta={data?.meta}
        className="mt-auto"
      />
    </>
  );
}
