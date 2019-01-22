  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGLEadE2D5y_2CZMvdy0O0UIfhuBMujnY",
    authDomain: "train-times-b2c4f.firebaseapp.com",
    databaseURL: "https://train-times-b2c4f.firebaseio.com",
    projectId: "train-times-b2c4f",
    storageBucket: "train-times-b2c4f.appspot.com",
    messagingSenderId: "932661699886"
  };

firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() { 
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input")
    .val()
    .trim();
    var destination = $("#destination-input")
      .val()
      .trim(); 
    var firstTrain = $("#firstTrain-input")
      .val()
      .trim(); 
    var frequency = $("#frequency-input")
      .val()
      .trim();
  
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    
    });
  });

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var frequency = 5;
    var firstTrain = "4:30";
		var trainTime = moment.unix(firstTrain).format("hh:mm");
		var difference =  moment().diff(moment(trainTime),"minutes");
		var trainRemain = difference % frequency;
		var minsAway = frequency - trainRemain;
		var nextArr = moment().add(minsAway, "minutes").format('hh:mm');
    var firstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
    var nameTh = $("<th>").attr("scope", "row").text(sv.name);
    var desinationTd = $("<td>").text(sv.destination);
    var minsAway = moment().diff(moment.duration(snapshot.val().time), "minutes");
    var frequency = $("<td>").text(sv.frequency);
    var nextArrTd = $("<td>").text(sv.nextArr);
    var minsAwayTd = $("<td>").text(parseInt(minsAway));

    var tr = $("<tr>").append(nameTh, desinationTd, frequency, nextArrTd, minsAwayTd); //
    $("#trains").append(tr);
  });
});
