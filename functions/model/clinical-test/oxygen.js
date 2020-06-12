const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `oxygen/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "oxygen" };
};

const getList = async (limit, offset, filters) => {
  const path = `oxygen`;
  const result = await retriveData(
    path,
    limit,
    offset,
    filters,
    "clinicalDate",
    "desc"
  );
  return {
    ...result,
    data: result.data.map((el) => ({ ...el, type: "oxygen" })),
  };
};

module.exports = {
  getById,
  getList,
};
