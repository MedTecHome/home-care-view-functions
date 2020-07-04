const { retriveDoc, retriveData, setDoc, editDoc } = require("./utils");
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
  const { seeDisabled, ...rest } = filters;
  console.log(filters)
  const result = await retriveData(
    path,
    limit,
    offset,
    rest,
    "fullname",
    "asc"
  );

  const aux = await Promise.all(
    result.data.map(async (element) => {
      const userAuth = await getUserById(element.id);
      return {
        ...element,
        ...(element.birthday ? { birthday: element.birthday.toDate() } : {}),
        disabled: userAuth.disabled,
      };
    })
  );

  const data = aux
    .map((el) => ({ ...el, visible: el.disabled ? seeDisabled : !el.disabled }))
    .filter((el) => el.visible);

  return {
    total: result.total - (result.total - data.length),
    data,
  };
};

const addItem = async (values) => {
  let data = setProfile(values).toJSON();
  /*const clinic = await getById(data.parent);
  if (clinic.realDoctors < clinic.maxDoctors) {*/
    const user = await createUser(values);
    const path = `profiles/${user.uid}`;
    if (Object.keys(data).length > 0) {
      await setDoc(path, data);
    } else {
      throw new Error("Pass e valid profile information");
    }
  /*} else {
    throw new Error("Access Denied");
  }*/
};

const updateItem = async (id, values) => {
  const path = `profiles/${id}`;
  const oldDoc = await getById(id);
  let data = setProfile(values).toJSON();
  if (Object.keys(data).length > 0) {
    if (oldDoc.username !== values.username || !values.disabled) {
      await EditUser({
        id,
        username: values.username,
        ...(!values.disabled ? { disabled: values.disabled } : {}),
      });
    }
    await editDoc(path, data);
  } else {
    throw new Error("Pass e valid profile information");
  }
};

const deleteItem = async (id) => {
  //const path = `profiles/${id}`;
  //await deleteDoc(path);
  await EditUser({ id, disabled: true });
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
