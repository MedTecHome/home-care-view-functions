const { retriveDoc, retriveData } = require("./utils");

const getById = (id) => {
  const path = `treatments/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  const path = `treatments`;
  const sort =
    filters.externalStartDate ||
    filters.externalEndDate ||
    filters.startDate ||
    filters.endDate
      ? undefined
      : "startDate";
  const direcction =
    filters.externalStartDate ||
    filters.externalEndDate ||
    filters.startDate ||
    filters.endDate
      ? undefined
      : "desc";
  return retriveData(path, limit, offset, filters, sort, direcction);
};

module.exports = {
  getById,
  getList,
};
