const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `weight/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "weight" };
};

const getList = async (limit, offset, filters) => {
  const path = `weight`;
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
    data: result.data.map((el) => ({ ...el, type: "weight" })),
  };
};

module.exports = {
  getById,
  getList,
};
