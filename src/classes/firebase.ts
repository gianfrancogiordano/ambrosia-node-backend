import * as admin from 'firebase-admin';
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alimentos-colombeia.firebaseio.com"
});

// const firestore = admin.firestore();
// const fireauth = admin.auth();

module.exports = admin;
