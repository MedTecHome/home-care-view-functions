const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `breathing/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "breathing" };
};

const getList = async (limit, offset, filters) => {
  const path = `breathing`;
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
    data: result.data.map((el) => ({ ...el, type: "breathing" })),
  };
};

module.exports = {
  getById,
  getList,
};
