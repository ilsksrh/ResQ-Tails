import React, { useEffect, useState } from "react";
import { CheckMod } from "./services/checkRole";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "./services/auth_service";
import { fetchCategories, createCategory, deleteCategory, editCategory } from './services/category_api';
import { deleteTag, createTag, getAllTags, editTag } from "./services/tags_api";
import x from "./images/x-circle.svg";
import pen from "./images/pen-fill.svg";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModBoard = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [tags, setTags] = useState([]);
  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState('');
  const navigate = useNavigate();
  const currentUser = getCurrentUser();


  const check = CheckMod();
  useEffect(() => {
    check();
  }, [check]);


 

  const loadCategories = async () => {
    const catData = await fetchCategories();
    setCategories(catData);
  };

  const loadTags = async () => {
    try {
      const tagsData = await getAllTags();
      setTags(Array.isArray(tagsData) ? tagsData : []);
    } catch (error) {
      console.error('Error fetching tags:', error.message);
      setTags([]);
    }
  };

  useEffect(() => {
    loadCategories();
      loadTags();
  }, []);

  const handleEditClick = (category) => {
    setEditId(category.id);
    setEditName(category.name);
  };

  const handleEditTagClick = (tag) => {
    setEditTagId(tag.id);
    setEditTagName(tag.name);
  };

  const handleSaveClick = async (categoryId) => {
    if (categories.some(category => category.name === editName)) {
      toast.error("Category with the same name already exists!");
      return;
    }

    try {
      await editCategory(categoryId, { name: editName });
      setEditId(null);
      toast.success("Category edited successfully!");
      loadCategories();
    } catch (error) {
      console.error("Failed to edit category:", error.message);
    }
  };

  const handleTagSaveClick = async (tagId) => {
    if (tags.some(tag => tag.name === editTagName)) {
      toast.error("Tag with the same name already exists!");
      return;
    }

    try {
      await editTag(tagId, { name: editTagName });
      setEditTagId(null);
      toast.success("Tag edited successfully!");
      loadTags();
    } catch (error) {
      console.error('Failed to edit tag:', error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully!");
      loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error.message);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      toast.success("Tag deleted successfully!");
      loadTags();
      
    } catch (error) {
      console.error('Failed to delete tag:', error.message);
    }
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");

    if (categories.some(category => category.name === name)) {
      toast.error("Category with the same name already exists!");
      return;
    }

    try {
      await createCategory({ name });
      toast.success("Category created successfully!");
      loadCategories();
      
    } catch (error) {
      console.error("Failed to create category:", error.message);
    }
  };

  const handleCreateTag = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");

    if (tags.some(tag => tag.name === name)) {
      toast.error("Tag with the same name already exists!");
      return;
    }

    try {
      await createTag({ name });
      toast.success("Tag created successfully!");
      loadTags();
      
    } catch (error) {
      console.error('Failed to create tag:', error.message);
    }
  };

  if (!currentUser) return null;

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="">
            <Link to="/mod/users">
              <button className="btn btn-light">Go to Users System</button>{" "}
            </Link>
          </div>
          <div className="col-lg-8 col-xl-6">
            <div className="d-flex justify-content-between">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <div className="">
                    <ul className="list-unstyled">
                      {categories.map((category) => (
                        <div key={category.id} className="d-flex justify-content-between pt-2">
                          <li>
                            {editId === category.id ? (
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="form-control"
                              />
                            ) : (
                              category.name
                            )}
                          </li>
                          <div className="d-flex justify-content-center pr-2">
                            {editId === category.id ? (
                              <button
                                className="btn btn-success btn-sm ml-2"
                                onClick={() => handleSaveClick(category.id)}
                              >
                                Save
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-primary btn-sm ml-2"
                                  onClick={() => handleEditClick(category)}
                                >
                                  <img src={pen} className="d-flex" alt="Edit" />
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteCategory(category.id)}>
                                  <img src={x} className="d-flex" alt="Delete" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <div className="">
                    <form onSubmit={handleCreateCategory}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="New category name"
                          required
                        />
                      </div>
                      <div className="pt-4">
                        <button type="submit" className="btn btn-success">
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="d-flex justify-content-between">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <div className="">
                    <ul className="list-unstyled">
                      {tags.map(tag => (
                        <div key={tag.id} className="d-flex justify-content-between pt-2">
                          <li>
                            {editTagId === tag.id ? (
                              <input
                                type="text"
                                value={editTagName}
                                onChange={(e) => setEditTagName(e.target.value)}
                                className="form-control"
                              />
                            ) : (
                              tag.name
                            )}
                          </li>
                          <div className="d-flex justify-content-center pr-2">
                            {editTagId === tag.id ? (
                              <button className="btn btn-success btn-sm ml-2" onClick={() => handleTagSaveClick(tag.id)}>
                                Save
                              </button>
                            ) : (
                              <>
                                <button className="btn btn-primary btn-sm ml-2" onClick={() => handleEditTagClick(tag)}>
                                  <img src={pen} className="d-flex" alt="Edit" />
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteTag(tag.id)}>
                                  <img src={x} className="d-flex" alt="Delete" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <div className="">
                    <form onSubmit={handleCreateTag}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="New tag name"
                          required
                        />
                      </div>
                      <div className="pt-4">
                        <button type="submit" className="btn btn-success">
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ModBoard;
