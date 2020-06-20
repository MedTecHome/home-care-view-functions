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
    this.name = name;
    this.lowerName = this.name.toLowerCase();
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
      if (this[b] == undefined || this[b] == null)
        throw new Error(`Field ${b} is required`);
      a[b] = this[b];
      return a;
    }, {});
  }
}

module.exports = {
  Medicine,
};
