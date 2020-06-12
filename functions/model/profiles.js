const { retriveDoc, retriveData } = require("./utils");

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
  return {
    ...result,
    data: result.data.map((element) => ({
      ...element,
      ...(element.birthday ? { birthday: element.birthday.toDate() } : {}),
    })),
  };
};

module.exports = {
  getById,
  getList,
};
