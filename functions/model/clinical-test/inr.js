const { retriveDoc, retriveData, addDoc } = require("../utils");
const { InrTest } = require("../../schema/clinicalTest");

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

const addItem = async (values) => {
  const path = `inr`;
  let data = new InrTest(values).toJSON();
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
