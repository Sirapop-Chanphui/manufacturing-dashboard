import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://blog-post-project-api.vercel.app/posts";
const LIMIT = 6;

export function useArticles( selectedCategory ) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * fetch posts by page
   */
  const fetchPosts = useCallback(
    async (pageToFetch) => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(API_URL, {
          params: {
            page: pageToFetch,
            limit: LIMIT,
            ...(selectedCategory && { selectedCategory }),
          },
        });

        setPosts((prev) =>
          pageToFetch === 1 ? data.posts : [...prev, ...data.posts]
        );

        setHasMore(data.currentPage < data.totalPages);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [ selectedCategory ]
  );

  /**
   * reset + fetch when category changes
   */
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);

    fetchPosts(1);
  }, [ selectedCategory , fetchPosts]);

  /**
   * fetch more when page changes (pagination)
   */
  useEffect(() => {
    if (page === 1) return;

    fetchPosts(page);
  }, [page, fetchPosts]);

  return {
    posts,
    isLoading,
    hasMore,
    loadMore: () => {
      if (!isLoading && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
  };
}
