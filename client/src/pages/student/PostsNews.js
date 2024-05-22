import React, { useState } from 'react';
import './PostsNews.css'; // Import CSS file for styling

const PostsNews = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "10 Tips for Studying Effectively",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque vel nunc vehicula venenatis. Nulla sagittis elit et arcu convallis tristique.",
      likes: 0,
      shares: 0,
      comments: [],
      newComment: ''
    },
    {
      id: 2,
      title: "New Research Reveals Benefits of Outdoor Learning",
      content: "Duis lobortis lacus nec leo efficitur tincidunt. Nulla facilisi. Vestibulum auctor, ipsum nec consequat feugiat, ipsum eros viverra ligula, id varius risus felis et purus.",
      likes: 0,
      shares: 0,
      comments: [],
      newComment: ''
    },
    {
      id: 3,
      title: "Discussion: The Future of Remote Education",
      content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce vel lorem suscipit, vehicula lacus id, dapibus odio.",
      likes: 0,
      shares: 0,
      comments: [],
      newComment: ''
    }
  ]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleShareFacebook = (postId, postUrl) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`);
    const updatedPosts = updateShares(postId);
    setPosts(updatedPosts);
  };

  const handleShareWhatsApp = (postId, postUrl) => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`);
    const updatedPosts = updateShares(postId);
    setPosts(updatedPosts);
  };

  const handleShareInstagram = (postId, postUrl) => {
    window.open(`https://www.instagram.com/?url=${encodeURIComponent(postUrl)}`);
    const updatedPosts = updateShares(postId);
    setPosts(updatedPosts);
  };

  const handleShareTelegram = (postId, postUrl) => {
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(postUrl)}`);
    const updatedPosts = updateShares(postId);
    setPosts(updatedPosts);
  };

  const updateShares = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    });
    return updatedPosts;
  };

  const handleCommentChange = (postId, e) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, newComment: e.target.value };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = [...post.comments, post.newComment];
        return { ...post, comments: updatedComments, newComment: '' };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="posts-news-container">
      <h2 className="posts-news-title">Posts & News</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
          <div className="post-interactions">
            <button className="interaction-button" onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
            <button className="interaction-button" onClick={() => handleShareFacebook(post.id, window.location.href)}>Share on Facebook ({post.shares})</button>
            <button className="interaction-button" onClick={() => handleShareWhatsApp(post.id, window.location.href)}>Share on WhatsApp ({post.shares})</button>
            <button className="interaction-button" onClick={() => handleShareInstagram(post.id, window.location.href)}>Share on Instagram ({post.shares})</button>
            <button className="interaction-button" onClick={() => handleShareTelegram(post.id, window.location.href)}>Share on Telegram ({post.shares})</button>
            <div>
              <input type="text" value={post.newComment} onChange={(e) => handleCommentChange(post.id, e)} placeholder="Write a comment" />
              <button className="interaction-button" onClick={() => handleCommentSubmit(post.id)}>Comment</button>
            </div>
          </div>
          <div className="comments-section">
            <h4>Comments:</h4>
            {post.comments.map((comment, index) => (
              <p key={index} className="comment">{comment}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsNews;
