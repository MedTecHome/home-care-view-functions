const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

auth = admin.auth();
db = admin.firestore();

module.exports = {
  functions,
  admin,
  auth,
  db,
};
