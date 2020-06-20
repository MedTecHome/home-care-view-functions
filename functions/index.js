/* eslint-disable no-unused-vars */
const { db, auth, functions } = require("./config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    req.idToken = req.headers.authorization.split("Bearer ")[1];
    return next();
  } else {
    return next(new Error("Unauthorized"));
  }
});

app.use(async (req, res, next) => {
  try {
    await auth.verifyIdToken(req.idToken);
    return next();
  } catch (e) {
    return next(e.message);
  }
});

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Api endpoint not found")
  next(error);
})

app.use((error, req, res, next) => {
  if(error){
    return res.status(req.status || 500).send({error: {code: error.code, message: error.message}})
  }
})

exports.setFullName = functions.firestore
  .document("profiles/{profileId}")
  .onWrite(async (change, context) => {
    const profRef = db.collection("profiles").doc(change.after.id);
    await profRef.update({
      fullname: `${change.after.data().name.toLowerCase()} ${
        change.after.data().lastName
          ? change.after.data().lastName.toLowerCase()
          : ""
      }`,
    });
    return null;
  });

exports.setAge = functions.firestore
  .document("profiles/{profileId}")
  .onWrite(async (change, context) => {
    if (change.after.data().role === "patient") {
      let date1 = change.after.data().birthday.toDate();
      let date2 = new Date(Date.now());
      let yearsDiff = date2.getFullYear() - date1.getFullYear();
      const profRef = db.collection("profiles").doc(change.after.id);
      await profRef.update({ age: yearsDiff });
    }
    return null;
  });

async function UpdateClinic(data) {
  const clinicId = data.parent;
  const clinicRef = db.collection("profiles").doc(clinicId);
  const exist = (await clinicRef.get()).exists;
  if (exist) {
    const total = (
      await db.collection("profiles").where("parent", "==", clinicId).get()
    ).size;
    await clinicRef.update({ realDoctors: total });
  }
}

exports.setRealDoctors = functions.firestore
  .document("profiles/{profileId}")
  .onWrite(async (change, context) => {
    const afterData = change.after.data();
    const beforeData = change.before.data();
    if (afterData.role === "doctor") {
      if (afterData.parent !== beforeData.parent) {
        await UpdateClinic(beforeData);
      }
      await UpdateClinic(afterData);
    }
    return null;
  });

exports.api = functions.https.onRequest(app);
