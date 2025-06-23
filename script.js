// ✅ Your Firebase config (already done)
const firebaseConfig = {
  apiKey: "AIzaSyB3D2BW1ax-8xysfhTeU9qBEHq7r9AhMA0",
  authDomain: "amanchat-10c21.firebaseapp.com",
  databaseURL: "https://amanchat-10c21-default-rtdb.firebaseio.com",
  projectId: "amanchat-10c21",
  storageBucket: "amanchat-10c21.appspot.com",
  messagingSenderId: "1025016021415",
  appId: "1:1025016021415:android:69954d240e2c68e64f3682"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendMessage() {
  const name = document.getElementById("username").value || "Anonymous";
  const msg = document.getElementById("messageInput").value;

  if (msg.trim() === "") return;

  db.ref("messages").push({
    name: name,
    text: msg,
    time: new Date().toLocaleTimeString()
  });

  document.getElementById("messageInput").value = "";
}

db.ref("messages").on("child_added", function (snapshot) {
  const data = snapshot.val();
  const msgBox = document.getElementById("messages");
  msgBox.innerHTML += `<p><strong>${data.name}</strong> [${data.time}]: ${data.text}</p>`;
  msgBox.scrollTop = msgBox.scrollHeight;
});
