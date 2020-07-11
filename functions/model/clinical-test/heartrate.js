const { retriveDoc, retriveData, addDoc } = require("../utils");
const { Heartrate } = require("../../schema/clinicalTest");

const getById = async (id) => {
  const path = `heartrate/${id}`;
  const result = await retriveDoc(path);
  return { ...result, type: "heartrate" };
};

const getList = async (limit, offset,  filters) => {
  delete filters.userLogin;
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

const addItem = async (values) => {
  const path = `heartrate`;
  let data = new Heartrate(values).toJSON();
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

module.exports = {
  getById,
  getList,
  addItem,
};
