const { retriveDoc, retriveData } = require("../utils");

const getById = (id) => {
  const path = `administrationroute/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  delete filters.userLogin;
  const path = `administrationroute`;
  return retriveData(path, limit, offset, filters, "name", "asc");
};

module.exports = {
  getById,
  getList,
};
