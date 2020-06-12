const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `exercises/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "exercises" };
};

const getList = async (limit, offset, filters) => {
  const path = `exercises`;
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
    data: result.data.map((el) => ({ ...el, type: "exercises" })),
  };
};

module.exports = {
  getById,
  getList,
};
