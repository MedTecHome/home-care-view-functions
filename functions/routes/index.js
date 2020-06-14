const route = require("express").Router();

route.use("/", require("./auth"));
route.use("/data", require("./data"));
route.use("/profiles", require("./profiles"));
route.use("/medicines", require("./medicines"));
route.use("/treatments", require("./treatments"));
route.use("/pressure", require("./clinical-test/pressure"));
route.use("/heartrate", require("./clinical-test/heartrate"));
route.use("/temperature", require("./clinical-test/temperature"));
route.use("/weight", require("./clinical-test/weight"));
route.use("/glucose", require("./clinical-test/glucose"));
route.use("/inr", require("./clinical-test/inr"));
route.use("/breathing", require("./clinical-test/breathing"));
route.use("/oxygen", require("./clinical-test/oxygen"));
route.use("/exercises", require("./clinical-test/exercises"));
route.use("/otherstest", require("./clinical-test/othersTest"));
route.use("/clinicaltest", require("./clinical-test/clinicalTest"));
route.use("/evolution", require("./evolution"));
route.use("/monitoring", require("./monitoring"));
route.use("/roles", require("./roles"));
route.use(
  "/administrationroute",
  require("./nomenclators/administrationroute")
);
route.use("/dosis", require("./nomenclators/dosis"));
route.use("/shedules", require("./nomenclators/shedules"));
route.use("/concentrations", require("./nomenclators/concentrations"));

module.exports = route;
