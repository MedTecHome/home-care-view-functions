const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Pressure } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `pressure/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "pressure" };
};

const getList = async (limit, offset, filters) => {
  const path = `pressure`;
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
    data: result.data.map((el) => ({ ...el, type: "pressure" })),
  };
};

const addItem = async (values) => {
  const path = `pressure`;
  let data = new Pressure(values).toJSON();
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
