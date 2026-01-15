var firebaseConfig = {
  apiKey: "AIzaSyA-ul4QcWgLUWbpaC5JPzXsDRRXn7x21c",
  authDomain: "emotion-adaptive-learning.firebaseapp.com",
  databaseURL: "https://emotion-adaptive-learning-default-rtdb.firebaseio.com",
  projectId: "emotion-adaptive-learning",
  storageBucket: "emotion-adaptive-learning.appspot.com",
  messagingSenderId: "866740350346",
  appId: "1:866740350346:web:704a0681302a4039b52c73"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function saveEmotion(emotion) {
  db.ref("emotions").push({
    emotion,
    time: new Date().toISOString()
  });
}
