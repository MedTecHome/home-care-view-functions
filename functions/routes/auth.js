const { auth } = require("../config");
const route = require("express").Router();
const { createUser, deleteUser, getUserByEmail } = require("../model/auth");

route.post("/createUser", async (req, res) => {
  const { username, password, fullname } = req.body;
  try {
    const user = await createUser(username, password, fullname);
    const link = await auth.generatePasswordResetLink(user.email);
    res.json({ user, link });
  } catch (e) {
    res.status(500).json({ error: e.message, code: e.code });
  }
});

route.post("/deleteUser", async (req, res) => {
  const { userId } = req.body;
  try {
    await deleteUser(userId);
    res.send("Ok");
  } catch (e) {
    res.status(500).json({ error: e.message, code: e.code });
  }
});

route.get("/searchByEmail", async (req, res) => {
  const { email } = req.query;
  try {
    await getUserByEmail(email);
    return res.json({ exist: true });
  } catch (e) {
    if (e.code === "auth/user-not-found") return res.json({ exist: false });
    return res.status(500).json({ error: e.message, code: e.code });
  }
});

module.exports = route;
