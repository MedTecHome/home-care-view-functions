class ClinicalTest {
  constructor({ user, clinicalDate, note = "" }) {
    this.user = user;
    this.clinicalDate = clinicalDate;
    this.note = note;
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      if (this[b] == undefined || this[b] == null)
        throw new Error(`Field ${b} is required`);
      a[b] = this[b];
      return a;
    }, {});
  }
}

class Pressure extends ClinicalTest {
  constructor({ sistolica, diastolica, heartrate, ...rest }) {
    super(rest);
    this.sistolica = sistolica;
    this.diastolica = diastolica;
    this.heartrate = heartrate;
  }
}

class Heartrate extends ClinicalTest {
  constructor({ heartrate, ...rest }) {
    super(rest);
    this.heartrate = heartrate;
  }
}

class Teamperature extends ClinicalTest {
  constructor({ celsiusDegree, ...rest }) {
    super(rest);
    this.celsiusDegree = celsiusDegree;
  }
}

class Weight extends ClinicalTest {
  constructor({ weight, ...rest }) {
    super(rest);
    this.weight = weight;
  }
}

class Glucose extends ClinicalTest {
  constructor({
    sugarConcentration,
    shedule,
    intakeTime,
    glucoseUnity,
    hba1c = "",
    insulinaFood = "",
    basal = "",
    breadUnity = "",
    ...rest
  }) {
    super(rest);
    this.sugarConcentration = sugarConcentration;
    this.shedule = shedule;
    this.intakeTime = intakeTime;
    this.glucoseUnity = glucoseUnity;
    this.hba1c = hba1c;
    this.insulinaFood = insulinaFood;
    this.basal = basal;
    this.breadUnity = breadUnity;
  }
}

class InrTest extends ClinicalTest {
  constructor({ INR, ...rest }) {
    super(rest);
    this.INR = INR;
  }
}

class Breathing extends ClinicalTest {
  constructor({ EtCO, breathingFrecuency, breathingPI, ...rest }) {
    super(rest);
    this.EtCO = EtCO;
    this.breathingFrecuency = breathingFrecuency;
    this.breathingPI = breathingPI;
  }
}

class Oxygen extends ClinicalTest {
  constructor({ SpO2, heartbeat, oxygenPI, ...rest }) {
    super(rest);
    this.SpO2 = SpO2;
    this.heartbeat = heartbeat;
    this.oxygenPI = oxygenPI;
  }
}

class Exercise extends ClinicalTest {
  constructor({ distance, time, steps, ...rest }) {
    super(rest);
    this.distance = distance;
    this.time = time;
    this.steps = steps;
  }
}

class Others extends ClinicalTest {
  constructor({ othersName, severity, ...rest }) {
    super(rest);
    this.othersName = othersName;
    this.severity = severity;
  }
}

module.exports = {
  Pressure,
  Heartrate,
  Teamperature,
  Weight,
  Glucose,
  InrTest,
  Breathing,
  Oxygen,
  Exercise,
  Others,
};
