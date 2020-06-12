const { getList: getTreatments } = require("./treatments");
const getList = async (limit, offset, filters) => {
  const treatments = await getTreatments(limit, offset, filters);
};

module.exports = { getList };
