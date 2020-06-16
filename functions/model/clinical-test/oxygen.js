const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Oxygen } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `oxygen/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "oxygen" };
};

const getList = async (limit, offset, filters) => {
  const path = `oxygen`;
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
    data: result.data.map((el) => ({ ...el, type: "oxygen" })),
  };
};

const addItem = async (values) => {
  const path = `oxygen`;
  let data = new Oxygen(values).toJSON();
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
