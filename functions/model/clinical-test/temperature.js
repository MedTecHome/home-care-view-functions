const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `temperature/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "temperature" };
};

const getList = async (limit, offset, filters) => {
  const path = `temperature`;
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
    data: result.data.map((el) => ({ ...el, type: "temperature" })),
  };
};

module.exports = {
  getById,
  getList,
};
