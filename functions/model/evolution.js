const { getList: getTreatments } = require("./treatments");
const { getForEvolution } = require("./clinical-test/clinicalTest");

const treatmentsEvolution = async (limit, offset, filters) => {
  const { rangeDate, user, ...params } = filters;
  //params.role = 'patient';
  let result = [];
  if (user && rangeDate) {
    const start = await getTreatments(limit, offset, {
      ...params,
      user,
      startDate: rangeDate,
    });
    const end = await getTreatments(limit, offset, {
      ...params,
      user,
      endDate: rangeDate,
    });

    const externalStart = await getTreatments(limit, offset, {
      ...params,
      user,
      externalStartDate: rangeDate[0],
    });

    const externalEnd = await getTreatments(limit, offset, {
      ...params,
      user,
      externalEndDate: rangeDate[1],
    });

    const externalStartAux = externalStart.data.filter(
      (element) => element.endDate >= rangeDate[0]
    );

    const externalEndAux = externalEnd.data.filter(
      (element) => element.startDate <= rangeDate[1]
    );

    result = [
      ...start.data,
      ...end.data,
      ...externalStartAux,
      ...externalEndAux,
    ];
  }

  const uniqueResult = Array.from(new Set(result.map((a) => a.id))).map(
    (id) => {
      return result.find((a) => a.id === id);
    }
  );

  // mejorar para que se liste en un solo row si tienen el mismo medicamento
  return uniqueResult;
};

const testEvolution = async (limit, offset, filters) => {
  const response = await getForEvolution(365, 0, filters);
  return response.data;
};

const getList = async (limit, offset, filters) => {
  const treatments = await treatmentsEvolution(365, 0, filters);
  const tests = await testEvolution(365, 0, filters);
  return { treatments, clinicaltest: tests };
};

module.exports = { getList };
