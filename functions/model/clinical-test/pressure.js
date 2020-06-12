const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `pressure/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "pressure" };
};

const getList = async (limit, offset, filters) => {
  const path = `pressure`;
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
    data: result.data.map((el) => ({ ...el, type: "pressure" })),
  };
};

module.exports = {
  getById,
  getList,
};
