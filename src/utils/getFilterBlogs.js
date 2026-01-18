export function getSearchScore(blog, keyword) {
    if (!keyword) return 1;
  
    const k = keyword.toLowerCase();
    let score = 0;
  
    if (blog.title?.toLowerCase().includes(k)) score += 5;
    if (blog.description?.toLowerCase().includes(k)) score += 3;
    if (blog.content?.toLowerCase().includes(k)) score += 2;
    if (blog.category?.toLowerCase().includes(k)) score += 1.5;
    if (blog.author?.toLowerCase().includes(k)) score += 1;
  
    return score;
  }
  
  export function getFilteredBlogs({
    blogPosts,
    search = "",
    selectedCategory = "Highlight",
  }) {
    return blogPosts
      .map((blog) => {
        const score = getSearchScore(blog, search);
  
        const matchCategory =
          selectedCategory === "Highlight" || blog.category === selectedCategory;
  
        return {
          ...blog,
          _score: score,
          _matchCategory: matchCategory,
        };
      })
      .filter(
        (blog) =>
          blog._matchCategory && (search === "" || blog._score > 0)
      )
      .sort((a, b) => b._score - a._score);
  }
  