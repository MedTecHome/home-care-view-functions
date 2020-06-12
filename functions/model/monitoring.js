const moment = require("moment");
const { getList: getProfiles } = require("./profiles");
const { getForMonitoring } = require("./clinical-test/clinicalTest");

const getList = async (limit, offset, filters) => {
  const profiles = await getProfiles(limit, offset, filters);
  const resultList = profiles.data.map(async (item) => {
    const clinicalTest = await getForMonitoring({ user: item.id });

    let result = { user: item };
    const aux = clinicalTest.data.sort((a, b) => {
      const c = a.clinicalDate;
      const d = b.clinicalDate;
      return d - c;
    });

    aux
      .filter(
        (tst) =>
          moment.unix(tst.clinicalDate).format("YYYY-MM-DD") ===
          moment.unix(aux[0].clinicalDate).format("YYYY-MM-DD")
      )
      .forEach((el) => {
        console.log(el);
        result = {
          ...result,
          [el.type]: el,
          latestDate: aux[0].clinicalDate,
          ver: moment.unix(el.clinicalDate).format("YYYY-MM-DD"),
        };
      });
    return result;
  });
  const data = await Promise.all(resultList);
  return { ...profiles, data };
};

module.exports = { getList, getById: () => {} };
