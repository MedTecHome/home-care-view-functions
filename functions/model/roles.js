const { retriveDoc, retriveData } = require("./utils");

const getById = (id) => {
  const path = `roles/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  const path = `roles`;
  return retriveData(path, limit, offset, filters, "name", "asc");
};

module.exports = {
  getById,
  getList,
};
