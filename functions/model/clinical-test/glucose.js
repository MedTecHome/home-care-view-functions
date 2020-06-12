const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `glucose/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "glucose" };
};

const getList = async (limit, offset, filters) => {
  const path = `glucose`;
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
    data: result.data.map((el) => ({ ...el, type: "glucose" })),
  };
};

module.exports = {
  getById,
  getList,
};
