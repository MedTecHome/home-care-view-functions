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

const getList = async (limit, offset, params) => {
  const { user, ...filters } = params;
  delete filters.userLogin;
  const pressure = await getPressure(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const heartrate = await getHeartrate(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const temperature = await getTemperature(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const weight = await getWeight(limit, offset, { user: user || "none", ...filters });
  const glucose = await getGlucose(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const breathing = await getBreathing(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const inr = await getINR(limit, offset, { user: user || "none", ...filters });
  const oxygen = await getOxygen(limit, offset, { user: user || "none", ...filters });
  const exercises = await getExercises(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const others = await getOthers(limit, offset, { user: user || "none", ...filters });

  const aux = [
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
  ];

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
    data: aux.sort((a, b) => b.clinicalDate - a.clinicalDate),
  };
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

const getForEvolution = async (limit, offset, params) => {
  const { user, ...filters } = params;
  const pressure = await getPressure(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const heartrate = await getHeartrate(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const temperature = await getTemperature(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const weight = await getWeight(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const glucose = await getGlucose(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const breathing = await getBreathing(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const inr = await getINR(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const oxygen = await getOxygen(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const exercises = await getExercises(limit, offset, {
    user: user || "none",
    ...filters,
  });
  const others = await getOthers(limit, offset, {
    user: user || "none",
    ...filters,
  });

  const aux = [
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
  ];

  const result = aux
    .map((a) => {
      return {
        id: a.id,
        type: a.type,
        user: user,
        list: aux.filter((b) => b.type === a.type),
      };
    })
    .filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => {
          return t.type === thing.type;
        })
    );

  return {
    data: result,
  };
};

module.exports = {
  getList,
  getForMonitoring,
  getForEvolution,
};
