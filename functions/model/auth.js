const { auth } = require("../config");
const { USERNAME_DOMAIN } = require("../helpers/domain");

const createUser = async ({ username, password, name, lastName }) => {
  if (!password) throw new Error("Field password is required");
  if (username) {
    try {
      const user = await auth.createUser({
        email: `${username}${USERNAME_DOMAIN}`,
        emailVerified: false,
        password,
        displayName: `${name} ${lastName || ""}`,
        disabled: false,
      });
      return { uid: user.uid, email: user.email };
    } catch (e) {
      if (e.code === "auth/email-already-exists") {
        throw new Error("The username already exists");
      }
      throw new Error(e);
    }
  } else {
    throw new Error("Invalid username");
  }
};

const deleteUser = (uid) => {
  return auth.deleteUser(uid);
};

const getUserByEmail = (email) => {
  return auth.getUserByEmail(email);
};

module.exports = {
  createUser,
  deleteUser,
  getUserByEmail,
};
