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
var trainsRef = firebase.database();

// Initial Variables, figure out if i need these at some point
var trainName = "";
var trainDestination = "";
var trainFreq = 5;
var trainArrival= "12:00";
var trainMinAway=13; 

// DONE Add Train Data with submit button
$("#submit-train").on("click", function (event) {
    event.preventDefault();

    // DONE Train data from user input
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-destination").val().trim();
    // horrible mutant, but atleasts its moment js
    var trainArrival = moment($("#train-arrival").val().trim(), "hh:mm").format();
    var trainFrequency = $("#train-frequency").val().trim();

    //push train user input data to firebase
    trainsRef.ref().push({
        name: trainName,
        destination: trainDest,
        arrival: trainArrival,
        frequency: trainFrequency
    });
});

// firebase snapshot, console log and drop into DOM table
trainsRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().arrival);
    console.log(childSnapshot.val().frequency);

    // maths not done yet, some placeholders, table test    
$("#train-table > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination
+ "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().arrival + "</td><td>" + childSnapshot.val().frequency + "</td><td>");

  // error tracking
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


  

