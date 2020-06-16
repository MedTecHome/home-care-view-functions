module.exports = (Model) => {
  const router = require("express").Router();

  router.param("id", async (req, res, next, id) => {
    try {
      const result = await Model.getById(id);
      req.element = result;
      return next();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get("/", async (req, res) => {
    const { limit = 0, page = 0, ...filters } = req.query;
    const offset = parseInt(page) * parseInt(limit);
    try {
      const result = await Model.getList(parseInt(limit), offset, filters);
      return res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get("/:id", async (req, res) => {
    if (req.element) {
      return res.json(req.element);
    }
    return res.status(404).send("Not found");
  });

  router.post("/", async (req, res) => {
    try {
      await Model.addItem(req.body);
      return res.send("Ok");
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

  router.post("/:customId", async (req, res) => {
    const { customId } = req.params;
    try {
      await Model.setItem(customId, req.body);
      return res.send("Ok");
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const { element } = req;
    if (element) {
      try {
        await Model.updateItem(element.id, req.body);
        return res.send("Ok");
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }
    return res.status(404).send("Not found");
  });

  router.delete("/:id", async (req, res) => {
    const { element } = req;
    if (element) {
      try {
        await Model.deleteItem(element.id);
        return res.send("Ok");
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }
    return res.status(404).send("Not found");
  });

  return router;
};
