const moment = require("moment");
const { getList: getPressure } = require("./pressure");
const { getList: getHeartrate } = require("./heartrate");
const { getList: getTemperature } = require("./temperature");
const { getList: getWeight } = require("./weight");
const { getList: getGlucose } = require("./glucose");
const { getList: getINR } = require("./inr");
const { getList: getBreathing } = require("./breathing");
const { getList: getOxygen } = require("./oxygen");
const { getList: getExercises } = require("./exercises");
const { getList: getOthers } = require("./othersTest");

const getList = async (params) => {
  const { user, ...filters } = params;
  try {
    const pressure = await getPressure(1, 0, {
      user: user || "none",
      ...filters,
    });
    const heartrate = await getHeartrate(1, 0, {
      user: user || "none",
      ...filters,
    });
    const temperature = await getTemperature(1, 0, {
      user: user || "none",
      ...filters,
    });
    const weight = await getWeight(1, 0, { user: user || "none", ...filters });
    const glucose = await getGlucose(1, 0, {
      user: user || "none",
      ...filters,
    });
    const breathing = await getBreathing(1, 0, {
      user: user || "none",
      ...filters,
    });
    const inr = await getINR(1, 0, { user: user || "none", ...filters });
    const oxygen = await getOxygen(1, 0, { user: user || "none", ...filters });
    const exercises = await getExercises(1, 0, {
      user: user || "none",
      ...filters,
    });
    const others = await getOthers(1, 0, { user: user || "none", ...filters });

    return {
      total:
        pressure.data.length +
        heartrate.data.length +
        temperature.data.length +
        breathing.data.length +
        weight.data.length +
        glucose.data.length +
        inr.data.length +
        oxygen.data.length +
        exercises.data.length +
        others.data.length,
      data: [
        ...pressure.data,
        ...heartrate.data,
        ...temperature.data,
        ...breathing.data,
        ...weight.data,
        ...glucose.data,
        ...inr.data,
        ...oxygen.data,
        ...exercises.data,
        ...others.data,
      ],
    };
  } catch (e) {
    throw new Error(e);
  }
};

const getForMonitoring = async (params) => {
  const { user, ...filters } = params;
  const pressure = await getPressure(1, 0, {
    user: user || "none",
    ...filters,
  });
  const temperature = await getTemperature(1, 0, {
    user: user || "none",
    ...filters,
  });
  const weight = await getWeight(1, 0, { user: user || "none", ...filters });
  const glucose = await getGlucose(1, 0, {
    user: user || "none",
    ...filters,
  });
  const breathing = await getBreathing(1, 0, {
    user: user || "none",
    ...filters,
  });
  const inr = await getINR(1, 0, { user: user || "none", ...filters });
  const oxygen = await getOxygen(1, 0, { user: user || "none", ...filters });
  const exercises = await getExercises(1, 0, {
    user: user || "none",
    ...filters,
  });

  return {
    data: [
      ...pressure.data,
      ...heartrate.data,
      ...temperature.data,
      ...breathing.data,
      ...weight.data,
      ...glucose.data,
      ...inr.data,
      ...oxygen.data,
      ...exercises.data,
    ],
  };
};

module.exports = {
  getList,
  getForMonitoring,
};
