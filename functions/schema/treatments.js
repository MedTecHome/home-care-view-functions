class Treatment {
  constructor({ medicine, medicineSettings, user, startDate, endDate }) {
    this.medicine = medicine;
    this.medicineSettings = medicineSettings;
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
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
  Treatment,
};
