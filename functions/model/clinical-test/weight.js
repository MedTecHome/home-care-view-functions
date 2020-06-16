const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Weight } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `weight/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "weight" };
};

const getList = async (limit, offset, filters) => {
  const path = `weight`;
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
    data: result.data.map((el) => ({ ...el, type: "weight" })),
  };
};

const addItem = async (values) => {
  const path = `weight`;
  let data = new Weight(values).toJSON();
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
