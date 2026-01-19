import { useEffect, useState } from "react";

export function useSearch(posts, delay = 1000) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setShowSuggestion(!!search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  const filteredPosts = debouncedSearch
    ? posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          post.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : posts;

  const suggestions = filteredPosts.slice(0, 6);

  return {
    search,
    setSearch,
    debouncedSearch,
    filteredPosts,
    suggestions,
    showSuggestion,
    setShowSuggestion,
  };
}
