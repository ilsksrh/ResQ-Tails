// export const getLocalRefreshToken = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user?.refreshToken;
// };

export const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

// export const updateLocalAccessToken = (token) => {
//   let user = JSON.parse(localStorage.getItem("user"));
//   user.accessToken = token;
//   localStorage.setItem("user", JSON.stringify(user));
// };

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const updateUser = (updatedUser) => {
  let user = JSON.parse(localStorage.getItem("user"));
    user.username = updatedUser.username;
    user.email = updatedUser.email;
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.avatar = updatedUser.avatar;
    user.phone = updatedUser.phone;
    localStorage.setItem("user", JSON.stringify(user));
}
