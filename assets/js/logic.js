// TrainTime logic.js
/*
- DONE link to firebase
- DONE test track active visitors
- DONE add moment.js
- sooo much left:
-- DONE firebase recieves data from user input via form
-- firebase output to table DOM
-- moment.js logic, still needs pseudocode 
-- 
*/


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAqGAqMPaVeuJxpfxT4fMj66eRPjHra_Mw",
    authDomain: "traintime-85fd2.firebaseapp.com",
    databaseURL: "https://traintime-85fd2.firebaseio.com",
    projectId: "traintime-85fd2",
    storageBucket: "traintime-85fd2.appspot.com",
    messagingSenderId: "1022210536183"
};

firebase.initializeApp(config);


// Firebase directories
// top-level database ref
var database = firebase.database();
// /Trains ref
var trainsRef = database.ref("/Trains");
// /connections and state change ref
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

// Initial Variables, figure out if i need these at some point
var startTrainName = "";
var startTrainDestination = "";
var startTrainFreq = 5;
var startArrivalTime= "12:00";
var startMinAway="";

// Add/Remove user on based on state change
connectedRef.on("value", function (snap) {

    if (snap.val()) {

        var con = connectionsRef.push(true);

        con.onDisconnect().remove();
    }
});

// console log #of connections,
connectionsRef.on("value", function (snap) {
    console.log(snap.numChildren());
});


// DONE Add Train Data with submit button
$("#submit-train").on("click", function (event) {
    event.preventDefault();

    // DONE Train data from user input
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-destination").val().trim();
    // horrible mutant, but atleasts its moment js
    var trainTime = moment($("#train-time").val().trim(), "hh:mm").format();
    var trainFreq = $("#train-frequency").val().trim();

    // DONE new train temp object
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq
    };

    trainsRef.push(newTrain);
    // object to database yay!
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

});
  
  

