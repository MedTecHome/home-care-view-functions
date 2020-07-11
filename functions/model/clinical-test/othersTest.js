const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Others } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `others/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "otherstest" };
};

const getList = async (limit, offset, filters) => {
  delete filters.userLogin;
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

const addItem = async (values) => {
  const path = `others`;
  let data = new Others(values).toJSON();
  if (Object.keys(data).length > 0) {
    await addDoc(path, data);
  } else {
    throw new Error("Pass e valid medicine information");
  }
};

module.exports = {
  getById,
  getList,
  addItem,
};
