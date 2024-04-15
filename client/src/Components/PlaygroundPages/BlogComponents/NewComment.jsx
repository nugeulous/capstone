import React, { useState } from "react";
import { createComment } from "../../../API/api";

const NewComment = ({ postid, user, onNewComment }) => {
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const ownerid = user.role === "owner" ? user.id : null;
      const petsitterid = user.role === "petsitter" ? user.id : null;

      if (ownerid || petsitterid) {
        const result = await createComment({postid, commentContent, ownerid, petsitterid});
        // Pass postId and result to onNewComment
        onNewComment(postid, result);
        setCommentContent("");
      } else {
        throw new Error("User role not recognized");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
<div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="commentContent" style={{ marginBottom: "10px", color: "#333", fontWeight: "bold" }}>Your Comment:</label>
        <textarea
          required
          id="commentContent"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          style={{ marginBottom: "20px", padding: "10px", borderRadius: "4px", border: "1px solid #135b6d", minHeight: "50px", resize: "vertical" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#135b6d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Submit</button>
      </form>
    </div>
  );
};

export default NewComment;