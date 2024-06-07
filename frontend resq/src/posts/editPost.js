import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { authHeader } from '../services/auth_service';
import { fetchCategories } from '../services/category_api';
import { fetchOnePost } from '../services/post_api';
import { getCurrentUser } from '../services/auth_service';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Unauthorized } from '../services/checkRole';



const EditPost = () => {
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const currentUser = getCurrentUser();
    
    const loadCategories = async () => {
        try {
          const catData = await fetchCategories();
          setCategories(catData);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            toast.error('Unauthorized access. Please log in.');
            navigate('/login');
          } else {
            toast.error('Error fetching categories. Please try again.');
          }
        }
      };
    
    useEffect(() => {
        loadPost();
        loadCategories();
    }, []);
    
    const loadPost = async () => {
            fetchOnePost(postId).then((postData) => {
            if (postData.user?.id !== currentUser.id && !currentUser.roles.includes('ROLE_MODERATOR')) {
                setError('You do not have permission to edit this post.');
                return;
            }
            setTitle(postData.title);
            setPhoto(postData.photo);
            setDescription(postData.description);
            setCategoryId(postData.category.id);
        }) 
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('user'));

        const updatedPost = {
            title,
            photo,
            description,
            userId: currentUser.id,
            categoryId
        };

        try {
            await axios.put(`http://localhost:8080/api/posts/${postId}`, updatedPost, {
                headers: authHeader()
            });
            setError(null);
            // localStorage.setItem("toastEditPost", true)
            // navigate(`/posts/${postId}`)
            navigate(`/posts/${postId}`, { state: { toastMessage: "Successfully updated post!" } });

        } catch (error) {
            setError('Error updating post. Please try again.');
            console.error('Error updating post:', error);
            toast.error("Error updating post")
        }
    };

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        console.log("Category changed to:", e.target.value);
    };

    return (
        <div className="container mt-5">
            <Unauthorized />
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div>
                        <h2 className="text-center mb-4" style={{fontWeight: 'bold', fontSize: '24px'}}>Edit Post</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {!error && (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Photo URL</label>
                                    <input type="url" className="form-control" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-select" id="category" value={categoryId} onChange={handleCategoryChange} required>
                                        {!categoryId && <option value="">Select a category</option>}
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success">Update Post</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default EditPost;
