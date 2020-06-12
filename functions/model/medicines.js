const { retriveDoc, retriveData } = require("./utils");

const getById = (id) => {
  const path = `medicines/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  const path = `medicines`;
  return retriveData(path, limit, offset, filters, "name", "asc");
};

module.exports = {
  getById,
  getList,
};
