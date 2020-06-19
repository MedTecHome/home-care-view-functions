const {
  retriveDoc,
  retriveData,
  addDoc,
  editDoc,
  deleteDoc,
} = require("./utils");
const { Medicine } = require("../schema/medicines");

const getById = (id) => {
  const path = `medicines/${id}`;
  return retriveDoc(path);
};

const getList = (limit, offset, filters) => {
  const path = `medicines`;
  const fieldSort = filters.name ? 'lowerName' : 'name'
  return retriveData(path, limit, offset, filters, fieldSort, "asc");
};

const addItem = async (values) => {
  const path = `medicines`;
  let data = new Medicine(values).toJSON();
  if (Object.keys(data).length > 0) {
    await addDoc(path, data);
  } else {
    throw new Error("Pass e valid medicine information");
  }
};

const updateItem = async (id, values) => {
  const path = `medicines/${id}`;
  let data = new Medicine(values).toJSON();
  if (Object.keys(data).length > 0) {
    await editDoc(path, data);
  } else {
    throw new Error("Pass e valid medicine information");
  }
};

const deleteItem = async (id) => {
  const path = `medicines/${id}`;
  await deleteDoc(path);
};

module.exports = {
  getById,
  getList,
  addItem,
  updateItem,
  deleteItem,
};
