const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Glucose } = require("../../schema/clinicalTest");

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

const addItem = async (values) => {
  const path = `glucose`;
  let data = new Glucose(values).toJSON();
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
