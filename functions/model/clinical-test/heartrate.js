const { retriveDoc, retriveData } = require("../utils");

const getById = async (id) => {
  const path = `heartrate/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "heartrate" };
};

const getList = async (limit, offset, filters) => {
  const path = `heartrate`;
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
    data: result.data.map((el) => ({ ...el, type: "heartrate" })),
  };
};

module.exports = {
  getById,
  getList,
};
