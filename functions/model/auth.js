const { auth } = require("../config");
const { USERNAME_DOMAIN } = require("../helpers/domain");

const createUser = async ({ username, password, name, lastName }) => {
  if (username) {
    const user = await auth.createUser({
      email: `${username}${USERNAME_DOMAIN}`,
      emailVerified: false,
      password,
      displayName: `${name} ${lastName ? lastName : ""}`,
      disabled: false,
    });
    return { uid: user.uid, email: user.email };
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
