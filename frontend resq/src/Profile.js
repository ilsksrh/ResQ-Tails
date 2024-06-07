import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/auth_service";
import pen from "./images/pen-fill.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultPhoto from "./images/avatar.jpg";

const Profile = () => {
  const [redirect, setRedirect] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    currentUsername: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
    phone: "",
    accessToken: ""
  });

  useEffect(() => {
    const showToast = localStorage.getItem('showToast');
    if (showToast) {
      toast.success("Successfully logged in");
      localStorage.removeItem('showToast');
    }

    const fetchCurrentUser = async () => {
      const user = getCurrentUser();
      if (!user) {
        setRedirect("/home");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setCurrentUser({
          currentUsername: user.username,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatar: userData.avatar,
          phone: userData.phone,
          accessToken: user.accessToken
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setRedirect("/home");
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const showToastEditProfile = localStorage.getItem("showToastEditProfile");
    if (showToastEditProfile) {
      toast.success("Successfully edited profile!");
      localStorage.removeItem("showToastEditProfile");
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <form method="post">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={currentUser.avatar || defaultPhoto}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                  />
                  <h5 className="my-3">{currentUser.currentUsername}</h5>
                  <p className="text-muted mb-1">It's me!</p>
                  <p className="text-muted mb-4">Hello</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <Link to="/edit">
                      <button className="btn btn-success">
                        <img src={pen} alt="pen icon" />
                      </button>
                    </Link>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{currentUser.firstName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{currentUser.lastName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{currentUser.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{currentUser.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Token</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{currentUser.accessToken}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Profile;
