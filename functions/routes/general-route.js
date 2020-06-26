const { permissions } = require("./permissions");

module.exports = (Model) => {
  const router = require("express").Router();

  router.param("id", async (req, res, next, id) => {
    try {
      const result = await Model.getById(id);
      req.element = result;
      return next();
    } catch (e) {
      return next(e.message);
    }
  });

  router.get("/", permissions, async (req, res, next) => {
    const { limit = 0, page = 0, ...filters } = req.query;
    const offset = parseInt(page) * parseInt(limit);
    try {
      const result = await Model.getList(parseInt(limit), offset, filters);
      return res.json(result);
    } catch (e) {
      return next(e.message);
    }
  });

  router.get("/:id", permissions, async (req, res, next) => {
    if (req.element) {
      return res.json(req.element);
    }
    req.status = 404;
    return next(new Error("Not found"));
  });

  router.post("/", permissions, async (req, res, next) => {
    try {
      await Model.addItem(req.body);
      return res.send("Ok");
    } catch (e) {
      return next(e.message);
    }
  });

  router.post("/:customId", permissions, async (req, res, next) => {
    const { customId } = req.params;
    try {
      await Model.setItem(customId, req.body);
      return res.send("Ok");
    } catch (e) {
      return next(e.message);
    }
  });

  router.put("/:id", permissions, async (req, res, next) => {
    const { element } = req;
    if (element) {
      try {
        await Model.updateItem(element.id, req.body);
        return res.send("Ok");
      } catch (e) {
        return next(e.message);
      }
    } else {
      req.status = 404;
      return next(new Error("Not found"));
    }
  });

  router.delete("/:id", permissions, async (req, res, next) => {
    const { element } = req;
    if (element) {
      try {
        await Model.deleteItem(element.id);
        return res.send("Ok");
      } catch (e) {
        return next(e.message);
      }
    }
    req.status = 404;
    return next(new Error("Not found"));
  });

  return router;
};
