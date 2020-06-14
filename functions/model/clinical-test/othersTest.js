const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `others/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "otherstest" };
};

const getList = async (limit, offset, filters) => {
  const path = `others`;
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
    data: result.data.map((el) => ({ ...el, type: "otherstest" })),
  };
};

module.exports = {
  getById,
  getList,
};
