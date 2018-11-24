const Queue = require('firebase-queue');
const firebase = require('firebase');
firebase.initializeApp({
    "appName": "test app",
    "serviceAccount": '../serviceAccountKey.json',
    "databaseURL": 'https://seismic-box-2116.firebaseio.com/',
});

var queueRef = firebase.database().ref('firebase-queue/order-queue');
var queue = new Queue(queueRef, { sanitize: false }, function (data, progress, resolve, reject) {
    // Read and process task data
    console.log(data);

    // Update the progress state of the task
    setTimeout(function () {
        progress(50);
    }, 500);

    // Finish the job asynchronously
    setTimeout(function () {
        resolve();
    }, 1000);
});

module.exports = queue;
