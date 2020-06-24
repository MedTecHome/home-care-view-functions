const {
  retriveDoc,
  retriveData,
  setDoc,
  editDoc,
} = require("./utils");
const { setProfile } = require("../schema/profiles");
const { createUser, EditUser, getUserById } = require("./auth");

const getById = async (id) => {
  const path = `profiles/${id}`;
  const result = await retriveDoc(path);
  return {
    ...result,
    ...(result.birthday ? { birthday: result.birthday.toDate() } : {}),
  };
};

const getList = async (limit, offset, filters) => {
  const path = `profiles`;
  const result = await retriveData(
    path,
    limit,
    offset,
    filters,
    "fullname",
    "asc"
  );

  const data = await Promise.all(result.data.map(async (element) => {
    const userAuth = await getUserById(element.id)
    return {
    ...element,
    ...(element.birthday ? { birthday: element.birthday.toDate() } : {}),
    disabled: userAuth.disabled
  }}))
  
  return {
    ...result,
    data
  };
};

const addItem = async (values) => {
  let data = setProfile(values).toJSON();
  const user = await createUser(values);
  const path = `profiles/${user.uid}`;
  if (Object.keys(data).length > 0) {
    await setDoc(path, data);
  } else {
    throw new Error("Pass e valid profile information");
  }
};

const updateItem = async (id, values) => {
  const path = `profiles/${id}`;
  const oldDoc = await getById(id);
  let data = setProfile(values).toJSON();
  if (Object.keys(data).length > 0) {
    if (oldDoc.username !== values.username) {
      await EditUser({ id, username: values.username });
    }
    await editDoc(path, data);
  } else {
    throw new Error("Pass e valid profile information");
  }
};

const deleteItem = async (id) => {
  //const path = `profiles/${id}`;
  //await deleteDoc(path);
  await EditUser({id, disabled: true});
};

const createAdmin = async (values) => {
  const role = "admin";
  let data = setProfile({ ...values, role }).toJSON();
  const user = await createUser(values);
  const path = `profiles/${user.uid}`;
  if (Object.keys(data).length > 0) {
    await setDoc(path, data);
  } else {
    throw new Error("Pass e valid profile information");
  }
};

module.exports = {
  getById,
  getList,
  addItem,
  updateItem,
  deleteItem,
  createAdmin,
};
