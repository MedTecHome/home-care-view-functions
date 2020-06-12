const { retriveDoc, retriveData } = require("./utils");

const getById = (id) => {
  const path = `treatments/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  const path = `treatments`;
  return retriveData(path, limit, offset, filters, "startDate", "desc");
};

module.exports = {
  getById,
  getList,
};
