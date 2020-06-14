const { retriveData, retriveDoc } = require("../model/utils");
const { db } = require("../config");
const router = require("express").Router();

const getData = (path, id) => {
  if (id) {
    return retriveDoc(`${path}/${id}`);
  }
  return retriveData(`${path}`);
};

router.get("/getData", async (req, res) => {
  const { path, id } = req.query;
  try {
    const result = await getData(path, id);
    return res.json(result);
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

router.get("/setData", async (req, res) => {
  const { path } = req.query;
  const data = require(`../data/data-json/${path}.json`);
  try {
    await data.forEach(async ({ id, ...values }) => {
      await db.collection(path).doc(id).set(values);
    });
    return res.send("ok");
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

module.exports = router;
