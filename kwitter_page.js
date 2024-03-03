//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyBimQPLpxAT55tMK6k4MKLJRyn3CzGxJsE",
      authDomain: "kwitter-bc968.firebaseapp.com",
      databaseURL: "https://kwitter-bc968-default-rtdb.firebaseio.com",
      projectId: "kwitter-bc968",
      storageBucket: "kwitter-bc968.appspot.com",
      messagingSenderId: "878810819612",
      appId: "1:878810819612:web:165421113b394bd84e83d9",
      measurementId: "G-96E9V71T6P"
    };
        // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    room_name=localStorage.getItem("room_name")
    user_name=localStorage.getItem("user_name")
    function send()
    {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });

      document.getElementById("msg").value = "";
    }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(message_data);
Name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

nametag= "<h4> "+ Name +"<img class='user_tick' src='tick.png'></h4>"
messagetag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
thumbsuptag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

row = nametag + messagetag + like_button + thumbsuptag


//row = "<h4> "+ Name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4>"+message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"'value'"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      likes_in_number = Number(likes) + 1;
      console.log(likes_in_number);

      firebase.database().ref(room_name).child(message_id).update({
            like : likes_in_number
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
       window.location = "index.html";
}