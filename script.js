document.addEventListener("DOMContentLoaded", () => {

  const allowBtn = document.getElementById("allow-camera");
  const camera = document.getElementById("camera");
  const main = document.getElementById("main");
  const consent = document.getElementById("consent");
  const emotionText = document.getElementById("emotion-status");
  const assistantText = document.getElementById("assistant-text");
  const notesList = document.getElementById("notes-list");

  // 🎥 CAMERA (UNCHANGED)
  allowBtn.onclick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      camera.srcObject = stream;
      consent.classList.add("hidden");
      main.classList.remove("hidden");
      startEmotionCycle();
    } catch (err) {
      alert("Camera permission denied");
    }
  };

  // 🎭 EMOTION LOGIC (UNCHANGED)
  const allEmotions = ["Neutral", "Interested", "Focused", "Bored"];
  const repeatEmotions = ["Focused", "Interested"];
  let phase = 1, index = 0;

  function startEmotionCycle() {
    setInterval(() => {
      let emotion;

      if (phase === 1) {
        emotion = allEmotions[index++];
        if (index === allEmotions.length) {
          phase = 2;
          index = 0;
        }
      } else {
        emotion = repeatEmotions[index % 2];
        index++;
      }

      emotionText.innerText = "Emotion: " + emotion;
      assistantText.innerText =
        emotion === "Confused"
          ? "You seem confused. Showing help..."
          : "Learning normally";

      if (typeof saveEmotion === "function") {
        saveEmotion(emotion);
      }
    }, 5000);
  }
  let videoSeconds = 0;
  setInterval(() => {
    videoSeconds++;
  }, 1000);

  document.getElementById("add-note").onclick = () => {
    const note = prompt("Enter your note:");
    if (!note) return;

    const minutes = Math.floor(videoSeconds / 60);
    const seconds = videoSeconds % 60;
    const timestamp = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const li = document.createElement("li");
    li.textContent = `[${timestamp}] ${note}`;
    notesList.appendChild(li);
  };


 
  document.getElementById("show-mcq").onclick = () => {
    assistantText.innerHTML = `
      <b>MCQ:</b><br>
      Which type of Machine Learning uses labeled data?<br><br>
      a) Reinforcement Learning<br>
      b) Unsupervised Learning<br>
      c) <b>Supervised Learning</b><br>
      d) Clustering
    `;
  };

  document.getElementById("load-video").onclick = () => {
    const link = document.getElementById("yt-link").value;
    const videoId =
      link.split("v=")[1]?.split("&")[0] || link.split("/").pop();

    document.getElementById("player").src =
      "https://www.youtube-nocookie.com/embed/" + videoId;
  };

});
