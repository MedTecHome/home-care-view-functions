const { auth } = require("../config");

const createUser = async (email, password, fullname) => {
  return await auth.createUser({
    email: email,
    emailVerified: false,
    password,
    displayName: fullname,
    disabled: false,
  });
};

const deleteUser = async (uid) => {
  return await auth.deleteUser(uid);
};

const getUserByEmail = async (email) => {
  return await auth.getUserByEmail(email);
};

module.exports = {
  createUser,
  deleteUser,
  getUserByEmail,
};
