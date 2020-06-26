/* eslint-disable no-unused-vars */
const { db, auth, functions } = require("./config");
const { getById: getProfile } = require("./model/profiles");
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
    req.status = 401;
    return next(new Error("Unauthorized"));
  }
});

app.use(async (req, res, next) => {
  try {
    const userLogin = await auth.verifyIdToken(req.idToken);
    req.userLogin = await getProfile(userLogin.uid);
    return next();
  } catch (e) {
    return next(e);
  }
});


/*
app.use(async (req, res, next) => {
  try {   
    // const id = '6KkcyToAmdQnmpdr7HTxIFYuZEI2'; // admin id
    // const id = 'NSs59e3B3nhEmeqWGYqJdbLVpBD3'; // clinic id
    //const id = 'qQqcCclJu6NVdFdDoRyhSfj6cqf1'; // doctor id
     const id = '8nFFoW1hILdsCRq0zgDUoHQyVXs1'; // paciente id
    req.userLogin = await getProfile(id)
    return next();
  } catch (e) {
    return next(e);
  }
});*/

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Api endpoint not found");
  next(error);
});

app.use((error, req, res, next) => {
  if (error) {
    console.log("error: ", error);
    return res
      .status(req.status || 500)
      .json({ error: { message: error.message, code: error.code } });
  }
});

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
