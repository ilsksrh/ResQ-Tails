import React from "react";
import { fetchAllUsers, deleteUser } from "./services/api";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CheckMod } from "./services/checkRole";

const ModUsers = () => {
  const [users, setUsers] = useState([]);


  const check = CheckMod();
  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (username) => {
    try {
      toast.success("deleted nice")
      await deleteUser(username);
      setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
    } catch (error) {
      console.error(error.message);
    }
  };

  const splitIntoChunks = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const userChunks = splitIntoChunks(users, 3);

  return (
    <div className="container py-5 h-100">
      {userChunks.length === 0 ? (
        <p>No users</p>
      ) : (
        userChunks.map((chunk, chunkIndex) => (
          <div className="row justify-content-center mb-4" key={chunkIndex}>
            {chunk.map((user, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="card rounded-3 position-relative">
                  <button
                    className="btn btn-danger position-absolute top-0 end-0 m-2"
                    onClick={() => handleDelete(user.username)}
                  >
                    X
                  </button>
                  <div className="card-body p-4 p-md-5">
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="d-flex">
                              <p>Username:</p> {user.username} <br />
                            </div>
                            <div className="d-flex">
                              <p>First Name:</p> {user.firstName || "No info"}{" "}
                              <br />
                            </div>
                            <div className="d-flex">
                              <p>Last Name:</p> {user.lastName || "No info"}{" "}
                              <br />
                            </div>
                            <div className="d-flex">
                              <p>Phone:</p> {user.phone || "No info"}
                            </div>
                          </div>
                          {user.avatar && (
                            <img
                              src={user.avatar}
                              alt={user.username}
                              className="img-fluid rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                            />
                          )}
                        </div>
                      
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
      <ToastContainer/>
    </div>
  );
};

export default ModUsers;