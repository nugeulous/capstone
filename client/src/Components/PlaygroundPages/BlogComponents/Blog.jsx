import { useState, useEffect } from "react";
import { getAllPosts } from "../../../API/api";
import NewPost from "./NewPost";
import "./blog.css";

const Blog = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts.reverse());
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };
    getPosts();
  }, []);

  const addNewPost = (newPost) => {
    // Add the new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="blog-container">
      <NewPost user={user} onNewPost={addNewPost} />
      {error && <h1>Error: {error}</h1>}
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2 className="post-title"> {post.title}</h2>
          {post.ownerid && (
            <p className="post-author">
              Posted by: {post.owner_fname} {post.owner_lname}
            </p>
          )}
          {post.petsitterid && (
            <p className="post-author">
              Posted by: {post.petsitter_fname} {post.petsitter_lname}
            </p>
          )}
          <p>{post.content} </p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
