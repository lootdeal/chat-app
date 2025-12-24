// 🔥 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔑 Ask room name
const room = prompt("Enter chat room code:");
document.getElementById("roomName").innerText = "Room: " + room;

// 🔑 Username
const user = prompt("Your name:");

function sendMsg() {
  const msg = document.getElementById("msg").value;
  if (msg === "") return;

  db.ref(room).push({
    name: user,
    message: msg
  });

  document.getElementById("msg").value = "";
}

// 🔄 Receive messages
db.ref(room).on("child_added", function(snapshot) {
  const data = snapshot.val();

  const div = document.createElement("div");
  div.className = "message " + (data.name === user ? "me" : "friend");
  div.innerText = data.name + ": " + data.message;

  document.getElementById("messages").appendChild(div);
});
