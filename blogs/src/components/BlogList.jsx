// src/components/BlogList.js
import React, { useEffect, useState, useMemo } from 'react';
import BlogPost from './BlogPost';
import postsData from '../data/posts.json';
import '../styles/BlogList.scss';

// Fetching and displaying posts
const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postsData);
  }, []);

  // Memoized rendering
  const renderedPosts = useMemo(() => {
    return posts.map((post) => <BlogPost key={post.id} post={post} />);
  }, [posts]);

  return <div className="blog-list">{renderedPosts}</div>;
};

export default BlogList;