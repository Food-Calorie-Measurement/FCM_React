import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import axios from "axios";
import "./CommunityPageDetail.css";
import { useLocation } from "react-router-dom";
import Logo from "/public/images/NavbarImage/LogoNoneText.png";
import PersonProfile from "/public/images/ProfileImage/PersonIcon.png";

export default function CommunityPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/post/${location.pathname}`);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Failed to load the post.", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id, location.pathname]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await axios.post(`/api/post/${id}/comment`, { text: comment });
        setComments([...comments, { text: comment, writer: "차지태" }]);
        setComment("");
      } catch (error) {
        console.error("Failed to post the comment.", error);
      }
    }
  };

  if (error) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <div className="loadingIndicator">Loading...</div>;
  }

  if (!post) {
    return <div>No post available.</div>;
  }

  return (
    <div className="postDetailContainer">
      <Navbar />
      <div className="postDetailContentContainer">
        <div className="postDetailTitleSet">
          <img className="postPageIcon" src={Logo} alt="Logo" />
          <h1 className="postDetailContentTitle">{post.title}</h1>
        </div>
        <div className="postDetailWriterSet">
          <img
            className="postPageIcon"
            src={PersonProfile}
            alt="personProfile"
          />
          <p className="postDetailContentWriter">
            {post.writer ? post.writer : "익명"}
          </p>
        </div>
        <p className="postDetailContentContent">{post.content}</p>
      </div>
      <div className="postCommentSection">
        <h3 className="postCommentTitle">COMMENT</h3>
        <div className="postCommentInputContainer">
          <div className="postDetailContentWriter">익명</div>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요"
            className="postCommentInput"
          />
          <button onClick={handleCommentSubmit} className="postCommentButton">
            제출
          </button>
        </div>
        <div className="postCommentList">
          {comments.map((cmt, index) => (
            <div key={index} className="postComment">
              <span className="postCommentWriter">
                {cmt.writer ? cmt.writer : "익명"}
              </span>
              <p>{cmt.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
