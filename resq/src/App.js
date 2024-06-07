import React from "react";

import { BrowserRouter, createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes } from "react-router-dom";

import Main from "./Main";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./Profile"; 
import EditProfile from "./editProfile";
import AdminBoard from "./AdminBoard";
import Header from "./Header";
import Home from "./Home";
import ModBoard from "./ModeratorBoard";
import CreatePost from "./posts/CreatePost";
import OnePost from "./posts/onePost";
import EditPost from "./posts/editPost";
import ModUsers from "./ModUsers";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/login"
        element = {<Login/>} />
        <Route path = "/profile" element = {<Profile/>} />
        <Route path = "edit" element = {<EditProfile />} />
        <Route path = "/admin" element = {<AdminBoard />} />
        <Route path="/posts/:postId" element={<OnePost />} />
        <Route path = "/home" element = {<Home />} />
        <Route path = "/createPost" element = {<CreatePost />} />
        <Route path = "/mod" element = {<ModBoard />} />
        <Route path="/posts/:postId/edit" element={<EditPost />} />
        <Route path ="/mod/users" element={<ModUsers />} />
        

      </Routes>
  );
};

export default App;
