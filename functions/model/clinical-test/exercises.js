const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Exercise } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `exercises/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "exercises" };
};

const getList = async (limit, offset, filters) => {
  delete filters.userLogin;
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

const addItem = async (values) => {
  const path = `exercises`;
  let data = new Exercise(values).toJSON();
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
