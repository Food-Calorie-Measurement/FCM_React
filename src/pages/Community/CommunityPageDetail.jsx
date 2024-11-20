import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../layout/Navbar/Navbar";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import axios from "axios";
import "./CommunityPageDetail.css";
import { useLocation } from "react-router-dom";
import Logo from "/public/images/NavbarImage/LogoNoneText.png";
import PersonProfile from "/public/images/ProfileImage/PersonIcon.png";
// import PostUpper from "/public/images/ProfileImage/PostDetailUpper.png";
// import PostLower from "/public/images/ProfileImage/PostDetailLower.png";

export default function CommunityPostDetail() {
  const { id } = useParams(); // Extracts the post id from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/post/${location.pathname}`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to load the post.", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

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
        {/* <img className="postDetailDesignImage" src={PostLower} /> */}
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

        {/* <img className="postDetailDesignImage" src={PostUpper} /> */}
      </div>
    </div>
  );
}
