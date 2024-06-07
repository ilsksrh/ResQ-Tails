import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from './services/auth_service';
import { fetchPosts } from './services/api';
import { fetchCategories } from './services/category_api';
import searchImg from './images/search-heart.svg';
import { getAllTags, getPostsByTags } from "./services/tags_api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Unauthorized } from './services/checkRole';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const currentUser = getCurrentUser();
  const location = useLocation();

  useEffect(() => {
    const showToastCreatePost = localStorage.getItem("showToastCreatePost");
    if (showToastCreatePost) {
      toast.success("Successfully created post!");
      localStorage.removeItem("showToastCreatePost");
    }
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
    }
  }, []);


  useEffect(() => {
    loadCategories();
    loadPosts();
    loadTags();
  }, [selectedCategoryId, userId, search, selectedTagIds]);


  const loadPosts = async () => {
    try {
      let postData;
      if (selectedTagIds.length > 0) {
        postData = await getPostsByTags(selectedTagIds);
      } else {
        postData = await fetchPosts(selectedCategoryId, userId, search);
      }
      setPosts(Array.isArray(postData) ? postData : []);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      setPosts([]);
    }
  };

  const loadCategories = async () => {
    try {
      const catData = await fetchCategories();
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      setCategories([]);
    }
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

  const handleShowMyPosts = () => {
    setUserId(currentUser.id);
    setSelectedCategoryId(null);
    setSearch('');
    setSelectedTagIds([]);
  };

  const handleShowAllPosts = () => {
    setUserId(null);
    setSelectedCategoryId(null);
    setSearch('');
    setSelectedTagIds([]);
  };

  const handleShowCategoryPosts = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setUserId(null);
    setSearch('');
    setSelectedTagIds([]);
  };

  const handleToggleTagSelection = async (tagId) => {
    setSelectedTagIds((prevSelectedTagIds) => {
      if (prevSelectedTagIds.includes(tagId)) {
        return prevSelectedTagIds.filter(id => id !== tagId);
      } else {
        return [...prevSelectedTagIds, tagId];
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadPosts();
  };

  const reset = () => {
    setUserId(null);
    setSelectedCategoryId(null);
    setSearch('');
    setSelectedTagIds([]);
    loadPosts();
  };

  // if (!currentUser) {
  //   return (
  //     <div className="container p-4">
  //       <div className="alert alert-warning" role="alert">
  //         You need to log in first!
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Unauthorized />
      <div className="container p-4">
        <div className='mb-4 d-flex'>
          <button onClick={handleShowMyPosts} className="btn btn-success" style={{ marginRight: '10px' }}>My Posts</button>
          <div className='pl-4'>
            <button onClick={handleShowAllPosts} className="btn btn-success">All Posts</button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {posts.length === 0 ? (
                <div className="col-lg-12">
                  <p>No posts yet</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div className="col-lg-6" key={post.id}>
                    <div className="card mb-4">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 200,
                        }}
                      >
                        <img
                          className="card-img-top"
                          src={post.photo}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "auto",
                            height: "auto",
                          }}
                          alt="Post"
                        />
                      </div>
                      <div className="card-body">
                        <div className="small text-muted">{post.createdAt}</div>
                        <h2 className="card-title h4">{post.title}</h2>
                        <p className="card-text">{post.description}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-outline-success">Read more →</Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">Search</div>
              <div className="card-body">
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      className="form-control rounded"
                      type="text"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Enter search term..."
                      aria-label="Enter search term..."
                      aria-describedby="button-search"
                    />
                    <button
                      className="btn btn-light"
                      id="button-search"
                      type="submit"
                    >
                      <img src={searchImg} alt="Search" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header">Categories</div>
              <div className="card-body">
                <div className="row">
                  <ul className="list-unstyled mb-0">
                    {categories.map(category => (
                      <li key={category.id}>
                        <button className='btn btn-success btn-light' onClick={() => handleShowCategoryPosts(category.id)}>{category.name}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">Tags</div>
              <div className="card-body">
                <div className="row">
                  <ul className="list-unstyled mb-0">
                    {tags.map(tag => (
                      <li key={tag.id}>
                        <button
                          className={`btn ${selectedTagIds.includes(tag.id) ? 'btn-success' : 'btn-light'}`}
                          onClick={() => handleToggleTagSelection(tag.id)}
                        >
                          {tag.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <Link to={`/createPost`} className="btn btn-success">Create Post</Link>
            </div>
            <div>
              <button className='btn btn-light' onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
