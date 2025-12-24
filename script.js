// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let user = "";
let room = "private_chat";

// LOGIN
function login() {
  user = document.getElementById("loginName").value;
  if (!user) return alert("Enter username");

  document.getElementById("login").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");

  db.ref("status/" + user).set("online");
  listenMessages();
}

// LOGOUT
function logout() {
  db.ref("status/" + user).set("offline");
  location.reload();
}

// SEND MESSAGE
function sendMsg() {
  const msg = document.getElementById("msg").value;
  const img = document.getElementById("imgInput").files[0];

  if (msg === "" && !img) return;

  if (img) {
    const reader = new FileReader();
    reader.onload = function() {
      db.ref(room).push({ name: user, image: reader.result });
    };
    reader.readAsDataURL(img);
    document.getElementById("imgInput").value = "";
  } else {
    db.ref(room).push({ name: user, text: msg });
  }

  document.getElementById("msg").value = "";
}

// RECEIVE
function listenMessages() {
  db.ref(room).on("child_added", snap => {
    const data = snap.val();
    const div = document.createElement("div");
    div.className = "message " + (data.name === user ? "me" : "friend");

    if (data.text) div.innerText = data.name + ": " + data.text;
    if (data.image) {
      const img = document.createElement("img");
      img.src = data.image;
      img.style.width = "100%";
      div.appendChild(img);
    }

    document.getElementById("messages").appendChild(div);
  });
}

// EMOJI
function addEmoji() {
  document.getElementById("msg").value += "😊";
}

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}
