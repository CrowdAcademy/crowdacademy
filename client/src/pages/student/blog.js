import React, { useState } from 'react';
import './MyBlogPage.css'; // Import CSS file for styling

// Dummy data for blog posts
const dummyBlogPosts = [
  { id: 1, title: 'Introduction to Machine Learning: Basics and Applications', category: 'Machine Learning', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 2, title: 'Blockchain Technology Explained: Concepts and Use Cases', category: 'Blockchain', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 3, title: 'Getting Started with Data Science: Tools and Resources', category: 'Data Science', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 4, title: 'Cybersecurity Best Practices for Businesses', category: 'Cybersecurity', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  { id: 5, title: 'The Rise of DevOps: Principles and Benefits', category: 'DevOps', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
  // Add more blog posts as needed
];

const MyBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter blog posts based on search term and selected category
  const filteredBlogPosts = dummyBlogPosts.filter(post =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || post.category === selectedCategory)
  );

  return (
    <div className="container">
      <h1 className="title">Blog</h1>
      <p className="description">Offering a collection of informative and educational articles relevant to computer science fields and new technologies.</p>
      
      {/* Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        className="category-filter"
      >
        <option value="All">All Categories</option>
        <option value="Machine Learning">Machine Learning</option>
        <option value="Blockchain">Blockchain</option>
        <option value="Data Science">Data Science</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="DevOps">DevOps</option>
        {/* Add more categories as needed */}
      </select>

      {/* Display filtered blog posts */}
      <div className="blog-posts">
        {filteredBlogPosts.map(post => (
          <div key={post.id} className="blog-post">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-category">Category: {post.category}</p>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogPage;
