import { useState, useEffect } from "react";
import { getAllPosts } from "../../../API/api";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
import "./blog.css";

const Blog = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

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
    const updatedPosts = newPost.ownerid
      ? [{ ...newPost, owner_fname: user.fname, owner_lname: user.lname }, ...posts]
      : [{ ...newPost, petsitter_fname: user.fname, petsitter_lname: user.lname }, ...posts];
    setPosts(updatedPosts);
  };

  const addNewComment = (postid, newComment) => {
    // Find the post with the matching postId and update its comments array
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postid ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
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
          <p>{post.content}</p>
          <h3>Comments:</h3>
          {post.comments &&
            post.comments.map((comment) => (
              <div key={comment.id} className="comment" >
                <p>{comment.content}</p>
              </div>
            ))}
          {user && (
            <NewComment key={`new-comment-${post.id}`} postid={post.id} user={user} onNewComment={addNewComment}  />
          )}
        </div>
      ))}
    </div>
  );
};

export default Blog;