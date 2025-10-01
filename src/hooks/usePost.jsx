import { useCallback, useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function usePost(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const reomveComment = useCallback(
    async (commentId) => {
      try {
        await api.delete(`/posts/${id}/comments/${commentId}`);
        setData((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c.id != commentId),
          _count: { ...prev._count, comments: prev._count.comments - 1 },
        }));
      } catch (e) {
        setError({
          message: e.response?.data?.error?.message || "Something went wrong",
        });
      }
    },
    [id]
  );

  const addComment = useCallback(
    async (body) => {
      try {
        const res = await api.post(`/posts/${id}/comments`, body);
        const comment = res.data.data;
        setData((prev) => ({
          ...prev,
          comments: [comment, ...prev.comments],
          _count: { ...prev._count, comments: prev._count.comments + 1 },
        }));
      } catch (e) {
        if (e.response && e.response.status === 401) {
          navigate("/login");
          setError({ message: "You Are Not Logged In" });
          return;
        }
        setError({
          message: e.response?.data?.error?.message || "Something went wrong",
        });
      }
    },
    [id, navigate]
  );

  const removeLike = useCallback(async () => {
    try {
      await api.delete(`/posts/${id}/likes`);
      setData((prev) => ({
        ...prev,
        _count: { ...prev._count, likes: prev._count.likes - 1 },
      }));
    } catch (e) {
      setError({
        message: e.response?.data?.error?.message || "Something went wrong",
      });
    }
  }, [id]);

  const giveLike = useCallback(async () => {
    try {
      await api.post(`/posts/${id}/likes`);
      setData((prev) => ({
        ...prev,
        _count: { ...prev._count, likes: prev._count.likes + 1 },
      }));
    } catch (e) {
      if (e.response && e.response.status === 401) {
        navigate("/login");
        setError({ message: "You Are Not Logged In" });
        return;
      }
      setError({
        message: e.response?.data?.error?.message || "Something went wrong",
      });
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        setError({ message: e.response?.data.error.message });
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return {
    data,
    loading,
    error,
    setData,
    giveLike,
    removeLike,
    addComment,
    reomveComment,
  };
}
