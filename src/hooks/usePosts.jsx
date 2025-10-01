import { useEffect, useState } from "react";
import api from "../config/api";

export default function usePosts(
  page = 1,
  keyword = "",
  userId = null,
  sort = "asc"
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = `/posts?q=${keyword}&page=${page}&sortOrder=${sort}&limit=3`;

    if (userId) {
      url = `/users/${userId}/posts?q=${keyword}&page=${page}&sortOrder=${sort}&limit=3`;
    }

    const fetchPosts = async () => {
      try {
        const res = await api.get(url);
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        setError({ message: e.response?.data.error.message });
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, keyword, userId, sort]);

  return { data, loading, error };
}
