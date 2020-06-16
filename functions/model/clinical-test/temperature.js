const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Teamperature } = require("../../schema/clinicalTest");

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

const addItem = async (values) => {
  const path = `temperature`;
  let data = new Teamperature(values).toJSON();
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
