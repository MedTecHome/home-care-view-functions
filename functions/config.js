const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  functions,
  admin,
  auth,
  db,
};
