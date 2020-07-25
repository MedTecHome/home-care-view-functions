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
const { getById: getProfile } = require("../profiles");
const healthyStandards = require("../../helpers/healthyStandars");

const withLegend = async test => {
  switch (test.type) {
    case "pressure":
      return {
        ...test,
        diasLegend: healthyStandards.diastolica(test.diastolica),
        sisLegend: healthyStandards.sistolica(test.sistolica),
      };
    case "heartrate":
      return {
        ...test,
        legend: healthyStandards.heartrate(test.heartrate),
      };
    case "temperature":
      return {
        ...test,
        legend: healthyStandards.temperature(test.celsiusDegree),
      };
    case "weight":{
      const user = await getProfile(test.user);
      return {
        ...test,
        legend: healthyStandards.weight(test.weight, user.height),
      };
    }
    case "glucose":
      return {
        ...test,
        legend: healthyStandards.glucose(
          test.sugarConcentration,
          test.glucoseUnity
        ),
      };
    case "inr":
      return { ...test, legend: healthyStandards.inr(test.INR) };
    case "breathing":
      return {
        ...test,
        legend: healthyStandards.breathing(test.breathingFrecuency),
      };
    case "oxygen":
      return { ...test, legend: healthyStandards.oxygen(test.SpO2) };
    default:
      return { ...test, legend: { option: -1, color: "inherit" } };
  }
}

const clinicalTestArray = (limit, offset, params) => {
  const { user, ...filters } = params;

  return Promise.all([
    getPressure(limit, offset, {
      user: user || "none",
      ...filters,
    }),
    getHeartrate(limit, offset, {
      user: user || "none",
      ...filters,
    }),
    getTemperature(limit, offset, {
      user: user || "none",
      ...filters,
    }),
    getWeight(limit, offset, { user: user || "none", ...filters }),
    getGlucose(limit, offset, {
      user: user || "none",
      ...filters,
    }),
    getBreathing(limit, offset, {
      user: user || "none",
      ...filters,
    }),
    getINR(limit, offset, { user: user || "none", ...filters }),
    getOxygen(limit, offset, { user: user || "none", ...filters }),
    getExercises(limit, offset, {
      user: user || "none",
      ...filters,
    }),
    getOthers(limit, offset, { user: user || "none", ...filters }),
  ]);
};

const getList = async (limit, offset, params) => {
  delete params.userLogin;
  const [
    pressure,
    heartrate,
    temperature,
    weight,
    glucose,
    breathing,
    inr,
    oxygen,
    exercises,
    others,
  ] = await clinicalTestArray(limit, offset, params);

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
  const [
    pressure,
    ,
    temperature,
    weight,
    glucose,
    breathing,
    inr,
    oxygen,
    exercises,
  ] = await clinicalTestArray(2, 0, params);

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
  try {
    const { user, ...filters } = params;
    const [
      pressure,
      heartrate,
      temperature,
      weight,
      glucose,
      breathing,
      inr,
      oxygen,
      exercises,
      others,
    ] = await clinicalTestArray(limit, offset, { user, ...filters });

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

    const arrayWithLegend = await Promise.all(aux.map(async (test) => await withLegend(test)))

    const result = arrayWithLegend
      .map((a) => {
        return {
          id: a.id,
          type: a.type,
          user: user,
          list: arrayWithLegend.filter((b) => b.type === a.type),
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
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getList,
  getForMonitoring,
  getForEvolution,
};
