const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Breathing } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `breathing/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "breathing" };
};

const getList = async (limit, offset,  filters) => {
  delete filters.userLogin;
  const path = `breathing`;
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
    data: result.data.map((el) => ({ ...el, type: "breathing" })),
  };
};

const addItem = async (values) => {
  const path = `breathing`;
  let data = new Breathing(values).toJSON();
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
