class Medicine {
  constructor({
    name,
    clinic,
    concentrationCant = 0,
    concentrationType = "",
    doseCant = 0,
    doseType = "",
    frequency = "",
    administrationType = "",
    administrationReason = "",
    observations = "",
  }) {
    this.name = name.toLowerCase();
    this.clinic = clinic;
    this.concentrationCant = concentrationCant;
    this.concentrationType = concentrationType;
    this.doseCant = doseCant;
    this.doseType = doseType;
    this.frequency = frequency;
    this.administrationType = administrationType;
    this.administrationReason = administrationReason;
    this.observations = observations;
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      a[b] = this[b];
      return a;
    }, {});
  }
}

module.exports = {
  Medicine,
};
