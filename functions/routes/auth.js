const { auth } = require("../config");
const route = require("express").Router();
const { createUser, deleteUser } = require("../model/auth");

route.post("/createUser", async (req, res) => {
  const { username, password, fullname } = req.body;
  try {
    //await auth.verifyIdToken(req.idToken);
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
    // await auth.verifyIdToken(req.idToken);
    await deleteUser(userId);
    res.send("Ok");
  } catch (e) {
    res.status(500).json({ error: e.message, code: e.code });
  }
});

module.exports = route;
