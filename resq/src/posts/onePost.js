import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, fetchOnePost } from "../services/post_api";
import { getCurrentUser } from "../services/auth_service";
import { addExistingTagForPost, getPostsbyTag, getAllTags, addTagToPost, editTag, deleteTagFromPost, getTagsForPost } from "../services/tags_api";
import redHeart from "../images/like.jpg";
import blackHeart from "../images/unlike.jpg";
import x from "../images/x-circle.svg";
import pen from "../images/pen-fill.svg";
import { useLocation } from "react-router";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { unauthorized } from "../services/checkRole";

export default function OnePost() {
  const location = useLocation()
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [isAuthorOrModerator, setIsAuthorOrModerator] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [allTags, setAllTags] = useState([]);

  const { postId } = useParams();
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const loadTags = async () => {
    try {
      const tagsData = await getAllTags();
      setAllTags(Array.isArray(tagsData) ? tagsData : []);
    } catch (error) {
      console.error('Error fetching tags:', error.message);
      setAllTags([]);
    }
  };


  useEffect(() => {
    // const toastEditPost = localStorage.getItem('toastEditPost')
    // if(toastEditPost){
    //   toast.success("Succesfully updated post")
    //   localStorage.removeItem('toastEditPost')
    // }
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
    }

    async function fetchPostAndTags() {
      try {
        const postData = await fetchOnePost(postId);
        setPost(postData);
        const tagData = await getTagsForPost(postId);
        setTags(tagData);
      } catch (error) {
        console.error("Error fetching post or tags:", error.message);
      }
    }
    fetchPostAndTags();
    loadTags();
  }, [postId]);

  useEffect(() => {
    if (post && currentUser) {
      const isAuthor = post.user.id === currentUser.id;
      const isMod = currentUser.roles && currentUser.roles.includes("ROLE_MODERATOR");
      setIsAuthorOrModerator(isAuthor || isMod);
      setIsModerator(isMod);
    }
  }, [post, currentUser]);

  const handleDelete = async () => {
    try {
      await deletePost(postId, navigate);
      localStorage.setItem("toastDel")
      navigate("/home")
    } catch (error) {
      if (error.message.includes('401')) {
        navigate('/unauthorized');
      } else {
        console.error("Error deleting post:", error.message);
      }
    }
  };

  const handleShowTagsPosts = async (tagId) => {
    try {
      const tags = await getTagsForPost(postId);
      setTags(tags);
    } catch (error) {
      if (error.message.includes('401')) {
        navigate('/unauthorized');
      } else {
        console.error("Error showing tags for post:", error.message);
      }
    }
  };

  const handleAddTag = async () => {
    const tagNames = allTags.map(tag => tag.name);
    const tagName = prompt(`Enter the tag name from the list: \n${tagNames.join("\n")}`);
    if (tagName) {
      const selectedTag = allTags.find(tag => tag.name === tagName);
      if (selectedTag) {
        const tagExists = tags.some(tag => tag.id === selectedTag.id);
        if (tagExists) {
          toast.warn(`Tag "${tagName}" is already set for this post`);
        } else {
          try {
            await addExistingTagForPost(postId, selectedTag.id);
            const updatedTags = await getTagsForPost(postId);
            toast.success(`Tag "${tagName}" added successfully`);
            setTags(updatedTags);
          } catch (error) {
            console.error("Error adding existing tag:", error.message);
          }
        }
      } else {
        toast.error(`Tag "${tagName}" does not exist.`);
      }
    }
  };

  const handleDeleteTag = async (tagId, tagName) => {
    try {
      await deleteTagFromPost(postId, tagId);
      const updatedTags = await getTagsForPost(postId);
      setTags(updatedTags);
      toast.success(`Tag "${tagName}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting tag:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          {post && (
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{post.title}</h1>
                <div className="text-muted fst-italic mb-2">
                  {post.createdAt}
                </div>
              </header>
              <figure className="mb-4" style={{
                          display: "flex",
                         
                          height: 370,
                        }}>
                <img
                  className="img-fluid rounded"
                  src={post.photo}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                  alt="Post"
                />
              </figure>
              <section className="mb-5">
                <p className="fs-5 mb-4">{post.description}</p>
                <p className="fs-5 mb-4">Author: {post.user?.username}</p>
                {isAuthorOrModerator && (
                  <>
                    <button className="btn btn-primary me-2">
                      <Link
                        to={`/posts/${post.id}/edit`}
                        className="text-white text-decoration-none"
                      >
                        Edit
                      </Link>
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                  </>
                )}
              </section>
            </article>
          )}
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">Tags</div>
            <div className="card-body">
              <div className="row">
                <ul className="list-unstyled mb-0">
                  {tags.map(tag => (
                    <li key={tag.id} className="d-flex justify-content-between align-items-center">
                      <button className='btn btn-success btn-light' onClick={() => handleShowTagsPosts(tag.id)}>{tag.name}</button>
                      {isModerator && (
                        <div className="d-flex align-items-center">
                          <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteTag(tag.id, tag.name)}>
                            <img src={x} className="d-flex" alt="Delete" />
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-success" onClick={handleAddTag}>
                 <img src={pen} className="" alt="Edit" />  Add tags
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}