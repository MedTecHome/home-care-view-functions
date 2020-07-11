const {
  retriveDoc,
  retriveData,
  addDoc,
  editDoc,
  deleteDoc,
} = require("./utils");
const { Treatment } = require("../schema/treatments");

const getById = (id) => {
  const path = `treatments/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  delete filters.userLogin;
  const path = `treatments`;
  const sort =
    filters.externalStartDate ||
    filters.externalEndDate ||
    filters.startDate ||
    filters.endDate
      ? undefined
      : "startDate";
  const direcction =
    filters.externalStartDate ||
    filters.externalEndDate ||
    filters.startDate ||
    filters.endDate
      ? undefined
      : "desc";
  return retriveData(path, limit, offset, filters, sort, direcction);
};

const addItem = async (values) => {
  const path = `treatments`;
  let data = new Treatment(values).toJSON();
  if (Object.keys(data).length > 0) {
    await addDoc(path, data);
  } else {
    throw new Error("Pass e valid treatment information");
  }
};

const updateItem = async (id, values) => {
  const path = `treatments/${id}`;
  let data = new Treatment(values).toJSON();
  if (Object.keys(data).length > 0) {
    await editDoc(path, data);
  } else {
    throw new Error("Pass e valid treatment information");
  }
};

const deleteItem = async (id) => {
  const path = `treatments/${id}`;
  await deleteDoc(path);
};

module.exports = {
  getById,
  getList,
  addItem,
  updateItem,
  deleteItem,
};
