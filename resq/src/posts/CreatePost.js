import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../services/category_api";
import { createPost } from "../services/post_api";
import { Unauthorized } from "../services/checkRole";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const loadCategories = async () => {
    const catData = await fetchCategories();
    setCategories(catData);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost(title, photo, description, categoryId);
      localStorage.setItem("showToastCreatePost", true)
      navigate("/home")

    } catch (error) {
      toast.error("Error creating post. Please try again.");
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="container">
      <Unauthorized />
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div>
            <h2
              className="text-center mb-4"
              style={{ fontWeight: "bold", fontSize: "24px" }}
            >
              Create New Post
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Photo URL
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="photo"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  value={parseInt(categoryId)}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-success">
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;