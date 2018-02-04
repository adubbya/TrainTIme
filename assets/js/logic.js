// TrainTime logic.js
/*
- DONE link to firebase
- DONE test track active visitors
- DONE add moment.js
- sooo much left:
-- firebase recieves data from user input via form
-- firebase output to table DOM
-- moment.js logic, buncha stuff 
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

  // Create a variable to reference the database
  var database = firebase.database();

  // directory of connection and state change
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");

  // Add/Remove user on based on state change
  connectedRef.on("value", function(snap) {

    if (snap.val()) {

      var con = connectionsRef.push(true);

      con.onDisconnect().remove();
    }
  });
  
  // console log #of connections, eventually html stuff
  connectionsRef.on("value", function(snap) {
    console.log(snap.numChildren());
  });
  
  // Initial Variables, figure those out at some point
  var trainName = "";
  var trainDestination = "";
  var trainFreq = "";