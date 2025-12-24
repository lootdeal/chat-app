// 🔥 Firebase config (PASTE YOUR OWN)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username = "";
let room = "";

// CREATE ROOM
function createRoom() {
  username = document.getElementById("username").value;
  if (!username) return alert("Enter name");

  room = "room_" + Math.floor(Math.random() * 100000);
  startChat();
}

// JOIN ROOM
function joinRoom() {
  username = document.getElementById("username").value;
  room = document.getElementById("roomInput").value;

  if (!username || !room) {
    alert("Enter name & room code");
    return;
  }
  startChat();
}

// START CHAT
function startChat() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");
  document.getElementById("roomName").innerText = "Room: " + room;

  db.ref(room).on("child_added", function(snapshot) {
    const data = snapshot.val();
    showMessage(data.name, data.message);
  });
}

// SEND MESSAGE
function sendMsg() {
  const msg = document.getElementById("msg").value;
  if (msg === "") return;

  db.ref(room).push({
    name: username,
    message: msg
  });

  document.getElementById("msg").value = "";
}

// SHOW MESSAGE
function showMessage(name, msg) {
  const div = document.createElement("div");
  div.className = "message " + (name === username ? "me" : "friend");
  div.innerText = name + ": " + msg;
  document.getElementById("messages").appendChild(div);
}

// LEAVE ROOM
function leaveRoom() {
  location.reload();
}
