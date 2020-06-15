const { db } = require("../config");
const moment = require("moment");

const mutateDoc = (doc) => ({ id: doc.id, ...doc.data() });

const setFilters = (itemRef, filters) => {
  let ref = itemRef;
  Object.keys(filters).forEach((k) => {
    switch (k) {
      case "name": {
        ref = ref
          .where(k, ">=", filters[k].toLowerCase())
          .where(k, "<=", `${filters[k].toLowerCase()}\uf8ff`);
        break;
      }
      case "fullname": {
        ref = ref
          .where(k, ">=", filters[k].toLowerCase())
          .where(k, "<=", `${filters[k].toLowerCase()}\uf8ff`);
        break;
      }
      case "monitoring": {
        const currentDate = moment
          .unix(filters[k])
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        ref = ref.where("clinicalDate", ">", currentDate.unix());
        break;
      }
      case "clinicalDate": {
        const customDate = parseInt(filters[k]);
        const tomorrow = moment.unix(customDate).add(1, "days").unix();
        ref = ref
          .orderBy(k, "desc")
          .where(k, ">=", customDate)
          .where(k, "<", tomorrow);
        break;
      }
      case "rangeDate": {
        const start = parseInt(filters[k][0]);
        const end = parseInt(filters[k][1]);
        ref = ref
          .where("clinicalDate", ">=", start)
          .where("clinicalDate", "<=", end);
        break;
      }
      case "startDate": {
        const start = parseInt(filters[k][0]);
        const end = parseInt(filters[k][1]);
        ref = ref.where(k, ">=", start).where(k, "<=", end);
        break;
      }
      case "endDate": {
        const start = parseInt(filters[k][0]);
        const end = parseInt(filters[k][1]);
        ref = ref.where(k, ">=", start).where(k, "<=", end);
        break;
      }
      case "externalStartDate": {
        const date = parseInt(filters[k]);
        ref = ref.where("startDate", "<", date);
        break;
      }
      case "externalEndDate": {
        const date = parseInt(filters[k]);
        ref = ref.where("endDate", ">", date);
        break;
      }
      default: {
        ref = ref.where(k, "==", filters[k]);
        break;
      }
    }
  });
  return ref;
};

const retriveData = async (
  path,
  limit = 0,
  offset = 0,
  filters,
  field,
  sort
) => {
  try {
    let dataRef = db.collection(`${path}`);
    if (field && sort) {
      dataRef = dataRef.orderBy(field, sort);
    }
    dataRef = setFilters(dataRef, filters);
    const total = (await dataRef.get()).size;

    if (limit) {
      dataRef = dataRef.limit(limit).offset(offset);
    }
    const data = (await dataRef.get())
      .docChanges()
      .map(({ doc }) => mutateDoc(doc));

    return { total, data };
  } catch (e) {
    throw new Error(e);
  }
};

const retriveDoc = async (path) => {
  let dataRef = db.doc(`${path}`);
  const result = await dataRef.get();
  return mutateDoc(result);
};

module.exports = {
  retriveData,
  retriveDoc,
};
