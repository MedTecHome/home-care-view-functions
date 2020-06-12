const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `inr/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "inr" };
};

const getList = async (limit, offset, filters) => {
  const path = `inr`;
  const result = await retriveData(
    path,
    limit,
    offset,
    filters,
    "clinicalDate",
    "desc"
  );
  return { ...result, data: result.data.map((el) => ({ ...el, type: "inr" })) };
};

module.exports = {
  getById,
  getList,
};
