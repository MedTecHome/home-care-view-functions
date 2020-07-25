// const weightByLorentz = (height, sex) =>
//   (sex === 'female' && Number(height) - 100 - (Number(height) - 150) / 2.5) ||
//   (sex === 'male' && Number(height) - 100 - (Number(height) - 150) / 4);

/** weight(kg), height(cm) */

const bmi = (weight, height) => weight / (Number(height) / 100) ** 2;

function getColor(option) {
  return (option === 1) || (option === 2) || (option === 3) ? 'A700' : 'inherit';
}

const inr = INR => {
  const value = Number(INR);
  const option =
    (value >= 2 && value <= 3 && 1) ||
    (((value >= 1.4 && value <= 1.9) || (value >= 3.1 && value <= 3.9)) && 2) ||
    ((value <= 1.5 || value >= 4) && 3) ||
    -1;
  return {
    option,
    color: getColor(option)
  };
};
const sistolica = sistolica => {
  const value = Number(sistolica);
  const option = (value >= 80 && value <= 120 && 1) || (value > 120 && value <= 139 && 2) || (value >= 140 && 3) || -1;
  return {
    option,
    color: getColor(option)
  };
};
const diastolica = diastolica => {
  const value = Number(diastolica);
  const option = (value >= 55 && value <= 80 && 1) || (value >= 81 && value <= 89 && 2) || (value >= 90 && 3) || -1;
  return {
    option,
    color: getColor(option)
  };
};
const heartrate = heartrate => {
  const value = Number(heartrate);
  const option =
    (value >= 60 && value <= 100 && 1) ||
    (((value >= 50 && value < 60) || (value > 100 && value <= 120)) && 2) ||
    (value <= 49 || value >= 121 && 3) ||
    -1;
  return {
    option,
    color: getColor(option)
  };
};
const glucose = (sugarConcentration, glucoseUnity) => {
  const value = Number(sugarConcentration);
  const option =
    (glucoseUnity === 'mg/dl' &&
      ((value >= 80 && value <= 115 && 1) ||
        (value >= 116 && value <= 180 && 2) ||
        ((value < 80 || value > 180) && 3) ||
        -1)) ||
    (glucoseUnity === 'mmol/l' &&
      ((value >= 4.7 && value <= 6.3 && 1) ||
        (value >= 6.4 && value <= 10 && 2) ||
        ((value < 4.7 || value > 10) && 3) ||
        -1)) ||
    -1;
  return {
    option,
    color: getColor(option)
  };
};
const temperature = celsiusDegree => {
  const value = Number(celsiusDegree);
  const option =
    (value >= 36 && value <= 37 && 1) || (value >= 37.1 && value <= 38.5 && 2) || (value >= 38.6 && 3) || -1;
  return {
    option,
    color: getColor(option)
  };
};
const oxygen = SpO2 => {
  const value = Number(SpO2);
  const option = (value >= 96 && value <= 100 && 1) || (value >= 94 && value < 96 && 2) || (value < 94 && 3) || -1;
  return {
    option,
    color: getColor(option)
  };
};
const breathing = v => {
  const value = Number(v);
  const option =
    (value <= 13 && value <= 19 && 1) ||
    (((value >= 8 && value <= 13) || (value >= 20 && value <= 24)) && 2) ||
    (value <= 12 || value >= 25 && 3) ||
    -1;
  return {
    option,
    color: getColor(option)
  };
};
const weight = (weight, height) => {
  const value = Number(weight);
  const h = Number(height);
  const resultBmi = bmi(value, h);
  const option =
    (resultBmi >= 18.5 && resultBmi <= 24.9 && 1) ||
    (resultBmi >= 25 && value <= 29.9 && 2) ||
    ((resultBmi < 18.5 || resultBmi >= 30) && 3) ||
    -1;
  return {
    option,
    color: getColor(option)
  };
};

module.exports = {
  weight,
  inr,
  temperature,
  oxygen,
  breathing,
  glucose,
  heartrate,
  diastolica,
  sistolica
};
