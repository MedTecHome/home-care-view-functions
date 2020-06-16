const route = require("express").Router();
const { getUserByEmail } = require("../model/auth");
const { createAdmin } = require("../model/profiles");

route.post("/createAdmin", async (req, res, next) => {
  try {
    await createAdmin(req.body);
    return res.send("Ok");
  } catch (e) {
    return next(e);
  }
});

route.get("/searchByEmail", async (req, res) => {
  const { email } = req.query;
  try {
    await getUserByEmail(email);
    return res.json({ exist: true });
  } catch (e) {
    console.log(e);
    if (e.code === "auth/user-not-found") return res.json({ exist: false });
    return res.status(500).json({ error: e.message, code: e.code });
  }
});

module.exports = route;
