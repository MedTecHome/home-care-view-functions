const { retriveDoc, retriveData } = require("../utils");

const getById = (id) => {
  const path = `shedules/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  delete filters.userLogin;
  const path = `shedules`;
  return retriveData(path, limit, offset, filters, "name", "asc");
};

module.exports = {
  getById,
  getList,
};
