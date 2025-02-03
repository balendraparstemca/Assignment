// src/components/BlogPost.js
import React from 'react';
import '../styles/BlogPost.scss';

// Individual Blog Post Component
const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
      <p><strong>Likes:</strong> {post.likes}</p>
    </div>
  );
};

export default React.memo(BlogPost);