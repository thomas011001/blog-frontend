import { useEffect, useState } from "react";
import api from "../config/api";

export default function usePosts(page = 1, keyword = "") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/posts?q=${keyword}&page=${page}`);
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };

    fetchPosts();
  }, [page, keyword]);
  return { data, loading, error };
}
