module.exports = (Model) => {
  const router = require("express").Router();
  router.param("id", async (req, res, next, id) => {
    try {
      const result = await Model.getById(id);
      req.element = result;
      return next();
    } catch (e) {
      return next(e);
    }
  });

  router.get("/", async (req, res, next) => {
    const { limit = 0, page = 0, ...filters } = req.query;
    const offset = parseInt(page) * parseInt(limit);
    console.log(offset);
    try {
      const result = await Model.getList(parseInt(limit), offset, filters);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    if (req.element) {
      return res.json(req.element);
    }
    return next();
  });

  return router;
};
