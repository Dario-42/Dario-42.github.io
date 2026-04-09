const chatBox = document.getElementById("chatBox");
const openBtn = document.getElementById("Button");
const chatContent = document.getElementById("chatContent");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

// Toggle chat window
openBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
});

// Form submit: send message to backend
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message bubble
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = message;
  chatContent.appendChild(userMsg);

  chatInput.value = "";
  chatContent.scrollTop = chatContent.scrollHeight;

  try {
    // Call backend API
    const response = await fetch("https://localhost:7165/api/ai", { //this is my local host from what will actully call an real api from google for a real ai. It does not work on git hub pages so dont be surprised
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Extract AI response from Gemini backend
    // Assumes backend returns { "aiMessage": "..." }
    const aiMsgText = data.aiMessage || "Keine Antwort vom AI";

    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.textContent = aiMsgText;
    chatContent.appendChild(aiMsg);

    chatContent.scrollTop = chatContent.scrollHeight;

  } catch (err) {
    console.error(err);
    const errMsg = document.createElement("div");
    errMsg.className = "message ai";
    errMsg.textContent = "Fehler beim Abrufen der AI-Antwort";
    chatContent.appendChild(errMsg);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
});

// Drag logic for chat window
const header = document.getElementById("chatHeader");
let offsetX = 0, offsetY = 0, isDragging = false;

header.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - chatBox.offsetLeft;
  offsetY = e.clientY - chatBox.offsetTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    chatBox.style.left = (e.clientX - offsetX) + "px";
    chatBox.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "auto";
});























































/* 

**********ECHO BACKUP************ 16.3.2026


const chatBox = document.getElementById("chatBox");
const openBtn = document.getElementById("Button");
const chatContent = document.getElementById("chatContent");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

// toggle chat
openBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
});

// form submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  // user bubble
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = message;
  chatContent.appendChild(userMsg);

  chatInput.value = "";

  fetch("https://localhost:7165/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(r => r.json())
  .then(data => {

    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.textContent = JSON.stringify(data.received);

    chatContent.appendChild(aiMsg);

    // auto scroll
    chatContent.scrollTop = chatContent.scrollHeight;

  })
  .catch(err => {
    console.error(err);
  });
});

// drag
const header = document.getElementById("chatHeader");
let offsetX = 0, offsetY = 0, isDragging = false;

header.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - chatBox.offsetLeft;
  offsetY = e.clientY - chatBox.offsetTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    chatBox.style.left = (e.clientX - offsetX) + "px";
    chatBox.style.top = (e.clientY - offsetY) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "auto";
});


*/