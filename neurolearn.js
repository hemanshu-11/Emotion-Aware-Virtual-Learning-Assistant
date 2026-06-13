/**
 * NeuroLearn — Frontend Integration Script
 * Handles: Webcam Feed, Emotion Simulation, Attention Tracking,
 *           Cognitive Event Stream, Adaptive Responses, UI Animations
 */

/* ─────────────────────────────────────────────
   1. STATE
───────────────────────────────────────────── */
const STATE = {
  emotion: "happy",
  attention: 78,
  learningState: "Focused",
  faceDetected: false,
  stream: null,
  emotionHistory: [],
  eventQueue: [],
  adaptiveMode: "normal", // normal | confused | distracted | bored
};

/* ─────────────────────────────────────────────
   2. DATA MAPS
───────────────────────────────────────────── */
const EMOTIONS = {
  happy:     { emoji: "😊", label: "Happy",     color: "#22c55e", attention: [70, 90] },
  focused:   { emoji: "🎯", label: "Focused",   color: "#a855f7", attention: [75, 95] },
  confused:  { emoji: "😕", label: "Confused",  color: "#f59e0b", attention: [40, 60] },
  surprised: { emoji: "😲", label: "Surprised", color: "#60a5fa", attention: [60, 80] },
  sad:       { emoji: "😢", label: "Sad",       color: "#6b7280", attention: [20, 45] },
  neutral:   { emoji: "😐", label: "Neutral",   color: "#94a3b8", attention: [50, 70] },
  angry:     { emoji: "😠", label: "Angry",     color: "#ef4444", attention: [30, 55] },
  disgusted: { emoji: "🤢", label: "Disgusted", color: "#84cc16", attention: [25, 50] },
  fearful:   { emoji: "😨", label: "Fearful",   color: "#f97316", attention: [35, 60] },
};

const LEARNING_STATES = {
  high:   { label: "In Flow",    motivation: "🔥 You're in the zone! Excellent focus — keep this momentum going." },
  medium: { label: "Focused",    motivation: "🚀 Great! You are doing well. Keep it up and stay focused." },
  low:    { label: "Distracted", motivation: "💤 Attention drifting. Take a deep breath and re-engage." },
  vlow:   { label: "Lost",       motivation: "🆘 Struggling to focus? Try a 2-minute break, then come back fresh." },
};

const COGNITIVE_EVENTS = [
  "Focus Detected",
  "Understanding Detected",
  "Attention Drop",
  "Example Suggested",
  "Understanding Achieved",
  "Confusion Detected",
  "Re-engagement Noted",
  "Concept Reinforced",
  "Memory Retrieval Triggered",
  "Curiosity Spike Noted",
  "Distraction Detected",
  "Positive Reinforcement Sent",
];

const ADAPTIVE_RESPONSES = {
  normal: {
    title: "✅ Great Progress!",
    titleColor: "#22c55e",
    borderColor: "rgba(34,197,94,.3)",
    bgColor: "rgba(34,197,94,.06)",
    message: "You're understanding the material well. Let's explore the next layer of complexity.",
    explanation: "AI systems are increasingly embedded in everyday life — from recommendation engines to autonomous vehicles. Understanding their mechanisms helps you become a more informed citizen and professional.",
  },
  confused: {
    title: "🤔 Confusion Detected",
    titleColor: "#fbbf24",
    borderColor: "rgba(255,166,0,.3)",
    bgColor: "rgba(255,166,0,.08)",
    message: "You seem to be struggling with this concept. Let's break it down in a simpler way.",
    explanation: "Think of AI as teaching a computer how to learn from experience. Just like humans learn from practice, machines learn from data. Start small: a spam filter is a simple AI that learns which emails are junk.",
  },
  distracted: {
    title: "⚠️ Attention Drop Detected",
    titleColor: "#f97316",
    borderColor: "rgba(249,115,22,.3)",
    bgColor: "rgba(249,115,22,.08)",
    message: "Your attention seems to be wandering. Let's bring it back with something engaging.",
    explanation: "Fun fact: The AI in your phone's camera detects your face in real-time, 30 times per second! That's the same technology powering this NeuroLearn session right now.",
  },
  bored: {
    title: "💡 Let's Level Up!",
    titleColor: "#a855f7",
    borderColor: "rgba(168,85,247,.3)",
    bgColor: "rgba(168,85,247,.08)",
    message: "You seem ready for something more challenging. Let's push further!",
    explanation: "Advanced challenge: Can you think of an ethical dilemma posed by AI-driven hiring systems? Consider bias in training data and how it affects real people's careers.",
  },
};

const EXAMPLE_EXPLANATIONS = [
  "Imagine Netflix recommending your next show — that's machine learning analyzing your watch history to predict what you'll enjoy.",
  "A self-driving car's AI processes thousands of images per second to identify pedestrians, traffic lights, and road markings.",
  "When you ask Siri or Alexa a question, natural language processing converts your speech into structured queries an AI can answer.",
  "AI in healthcare can scan an X-ray and flag potential tumors with higher accuracy than many trained radiologists.",
  "Credit card fraud detection uses AI trained on millions of transactions to spot unusual patterns in milliseconds.",
];

/* ─────────────────────────────────────────────
   3. DOM REFS (cached once on load)
───────────────────────────────────────────── */
const DOM = {};

function cacheDom() {
  DOM.emotionValue    = document.querySelector(".metric-value");           // "😊 Happy"
  DOM.attentionValue  = document.querySelectorAll(".metric-value")[1];    // "78%"
  DOM.progressFill    = document.querySelector(".progress-fill");
  DOM.learningState   = document.querySelectorAll(".metric-value")[2];    // "Focused"
  DOM.motivationCard  = document.querySelector(".motivation-card");
  DOM.eventsContainer = document.querySelector(".events");
  DOM.webcamOutput    = document.querySelector(".webcam-output");
  DOM.cameraText      = document.querySelector(".camera-text");
  DOM.cameraStatus    = document.querySelector(".camera-status");
  DOM.detectedSpan    = document.querySelector(".detected");
  DOM.faceBox         = document.querySelector(".face-box");
  DOM.warningBox      = document.querySelector(".warning-box");
  DOM.warningTitle    = document.querySelector(".warning-box h3");
  DOM.warningMsg      = document.querySelector(".warning-box p");
  DOM.adaptiveText    = document.querySelector(".adaptive-text");
  DOM.exampleBtn      = document.querySelector(".example-btn");
  DOM.topicContent    = document.querySelector(".topic-card p");
}

/* ─────────────────────────────────────────────
   4. WEBCAM INTEGRATION
───────────────────────────────────────────── */
async function initWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    STATE.stream = stream;
    STATE.faceDetected = true;

    // Inject <video> into the webcam output
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 14px;
      position: absolute;
      inset: 0;
    `;

    DOM.webcamOutput.appendChild(video);
    DOM.cameraText.style.display = "none";

    // Face box glows green when "detected"
    DOM.faceBox.style.borderColor = "#22c55e";
    DOM.faceBox.style.boxShadow = "0 0 15px #22c55e, 0 0 30px #16a34a";

    updateCameraStatus(true);
    addCognitiveEvent("📷 Webcam Connected");
    addCognitiveEvent("🔍 Face Detection Active");

  } catch (err) {
    // Camera denied or not available — run in simulation mode
    console.warn("Camera unavailable, running in simulation mode.", err);
    DOM.cameraText.textContent = "📵 Camera unavailable — Running in Simulation Mode";
    updateCameraStatus(false);
    addCognitiveEvent("⚠️ Simulation Mode Active");
  }
}

function updateCameraStatus(detected) {
  if (detected) {
    DOM.detectedSpan.textContent = "● Face Detected";
    DOM.detectedSpan.style.color = "#22c55e";
    DOM.cameraStatus.querySelector("span:last-child").textContent = "Looking at Screen";
  } else {
    DOM.detectedSpan.textContent = "○ No Face Detected";
    DOM.detectedSpan.style.color = "#ef4444";
    DOM.cameraStatus.querySelector("span:last-child").textContent = "Awaiting input…";
  }
}

/* ─────────────────────────────────────────────
   5. EMOTION ENGINE (simulation layer)
   In production, replace with DeepFace WebSocket
───────────────────────────────────────────── */
const EMOTION_SEQUENCE = [
  "happy", "focused", "neutral", "confused",
  "happy", "focused", "distracted", "confused",
  "focused", "happy", "bored", "neutral",
];
let emotionIndex = 0;

function tickEmotion() {
  // Cycle through a realistic sequence (replace w/ real data in production)
  const nextKey = EMOTION_SEQUENCE[emotionIndex % EMOTION_SEQUENCE.length];
  const data = EMOTIONS[nextKey] || EMOTIONS.neutral;
  emotionIndex++;

  STATE.emotion = nextKey;
  STATE.emotionHistory.push(nextKey);

  // Derive attention from emotion range
  const [lo, hi] = data.attention;
  STATE.attention = Math.floor(lo + Math.random() * (hi - lo));

  updateEmotionUI(nextKey, data);
  updateAttentionUI();
  deriveAdaptiveMode();
}

function updateEmotionUI(key, data) {
  if (!DOM.emotionValue) return;
  DOM.emotionValue.textContent = `${data.emoji} ${data.label}`;
  DOM.emotionValue.style.color = data.color;

  // Pulse animation on emotion change
  DOM.emotionValue.classList.remove("pulse-anim");
  void DOM.emotionValue.offsetWidth; // reflow
  DOM.emotionValue.classList.add("pulse-anim");
}

function updateAttentionUI() {
  const pct = STATE.attention;
  if (!DOM.attentionValue) return;
  DOM.attentionValue.textContent = `${pct}%`;
  DOM.progressFill.style.width = `${pct}%`;

  // Colour-grade the bar
  if (pct >= 75) {
    DOM.progressFill.style.background = "linear-gradient(90deg, #9333ea, #22c55e)";
    DOM.attentionValue.style.color = "#22c55e";
  } else if (pct >= 50) {
    DOM.progressFill.style.background = "linear-gradient(90deg, #9333ea, #c084fc)";
    DOM.attentionValue.style.color = "#c084fc";
  } else if (pct >= 30) {
    DOM.progressFill.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
    DOM.attentionValue.style.color = "#fbbf24";
  } else {
    DOM.progressFill.style.background = "linear-gradient(90deg, #ef4444, #f87171)";
    DOM.attentionValue.style.color = "#ef4444";
  }

  // Learning state label
  let stateKey = "medium";
  if (pct >= 80) stateKey = "high";
  else if (pct >= 55) stateKey = "medium";
  else if (pct >= 30) stateKey = "low";
  else stateKey = "vlow";

  const ls = LEARNING_STATES[stateKey];
  DOM.learningState.textContent = ls.label;
  DOM.motivationCard.textContent = ls.motivation;
  STATE.learningState = ls.label;
}

/* ─────────────────────────────────────────────
   6. ADAPTIVE MODE → UI RESPONSE
───────────────────────────────────────────── */
function deriveAdaptiveMode() {
  let mode = "normal";
  const pct = STATE.attention;
  const emo = STATE.emotion;

  if (emo === "confused") mode = "confused";
  else if (emo === "angry" || emo === "disgusted" || emo === "fearful") mode = "distracted";
  else if (pct < 40) mode = "distracted";
  else if (pct > 85 && (emo === "focused" || emo === "happy")) mode = "bored";
  else mode = "normal";

  if (mode !== STATE.adaptiveMode) {
    STATE.adaptiveMode = mode;
    renderAdaptiveCard(mode);
    addCognitiveEvent(cognitiveEventForMode(mode));
  }
}

function cognitiveEventForMode(mode) {
  const map = {
    normal:     "✅ Understanding Detected",
    confused:   "🔴 Confusion Detected",
    distracted: "⚡ Attention Drop",
    bored:      "🚀 Curiosity Spike Noted",
  };
  return map[mode] || "📊 State Updated";
}

function renderAdaptiveCard(mode) {
  const r = ADAPTIVE_RESPONSES[mode];
  if (!r || !DOM.warningBox) return;

  // Animate card out, update, animate in
  DOM.warningBox.style.opacity = "0";
  DOM.warningBox.style.transform = "translateY(-8px)";

  setTimeout(() => {
    DOM.warningTitle.textContent = r.title;
    DOM.warningTitle.style.color = r.titleColor;
    DOM.warningBox.style.border = `1px solid ${r.borderColor}`;
    DOM.warningBox.style.background = r.bgColor;
    DOM.warningMsg.textContent = r.message;
    DOM.adaptiveText.textContent = r.explanation;

    DOM.warningBox.style.transition = "opacity .4s ease, transform .4s ease";
    DOM.warningBox.style.opacity = "1";
    DOM.warningBox.style.transform = "translateY(0)";
  }, 250);
}

/* ─────────────────────────────────────────────
   7. COGNITIVE EVENT STREAM
───────────────────────────────────────────── */
let exampleIndex = 0;

function addCognitiveEvent(text) {
  if (!DOM.eventsContainer) return;

  const el = document.createElement("div");
  el.className = "event event-new";
  el.textContent = text;

  // Prepend so newest is on top
  DOM.eventsContainer.insertBefore(el, DOM.eventsContainer.firstChild);

  // Cap at 8 events
  const all = DOM.eventsContainer.querySelectorAll(".event");
  if (all.length > 8) all[all.length - 1].remove();

  // Flash fade-in
  requestAnimationFrame(() => el.classList.add("event-visible"));
}

function randomCognitiveEvent() {
  const pick = COGNITIVE_EVENTS[Math.floor(Math.random() * COGNITIVE_EVENTS.length)];
  addCognitiveEvent(pick);
}

/* ─────────────────────────────────────────────
   8. EXAMPLE BUTTON
───────────────────────────────────────────── */
function handleExampleBtn() {
  const explanation = EXAMPLE_EXPLANATIONS[exampleIndex % EXAMPLE_EXPLANATIONS.length];
  exampleIndex++;

  DOM.adaptiveText.style.opacity = "0";
  setTimeout(() => {
    DOM.adaptiveText.textContent = explanation;
    DOM.adaptiveText.style.transition = "opacity .4s ease";
    DOM.adaptiveText.style.opacity = "1";
  }, 200);

  addCognitiveEvent("💡 Example Suggested");

  // Ripple effect on button
  DOM.exampleBtn.classList.add("btn-active");
  setTimeout(() => DOM.exampleBtn.classList.remove("btn-active"), 300);
}

/* ─────────────────────────────────────────────
   9. FACE BOX ANIMATION (simulated tracking)
───────────────────────────────────────────── */
function animateFaceBox() {
  if (!DOM.faceBox) return;
  const jitterX = (Math.random() - 0.5) * 10;
  const jitterY = (Math.random() - 0.5) * 10;
  DOM.faceBox.style.transform = `translate(calc(-50% + ${jitterX}px), calc(-50% + ${jitterY}px))`;
}

/* ─────────────────────────────────────────────
   10. INJECTED CSS FOR ANIMATIONS
───────────────────────────────────────────── */
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* Emotion value pulse */
    @keyframes emotionPulse {
      0%   { transform: scale(1);    opacity: 1; }
      40%  { transform: scale(1.15); opacity: .85; }
      100% { transform: scale(1);    opacity: 1; }
    }
    .pulse-anim { animation: emotionPulse .5s ease; }

    /* New event fade-in */
    .event-new   { opacity: 0; transform: translateX(-12px); transition: opacity .35s ease, transform .35s ease; }
    .event-visible { opacity: 1; transform: translateX(0); }

    /* Face box glow pulse */
    @keyframes boxGlow {
      0%, 100% { box-shadow: 0 0 15px #a855f7, 0 0 30px #9333ea; }
      50%       { box-shadow: 0 0 25px #c084fc, 0 0 50px #a855f7; }
    }
    .face-box { animation: boxGlow 2.5s ease-in-out infinite; transition: transform .15s ease; }

    /* Progress fill smooth */
    .progress-fill { transition: width .8s ease, background .6s ease; }

    /* Metric values */
    .metric-value { transition: color .5s ease; }

    /* Adaptive card transition */
    .warning-box { transition: opacity .4s ease, transform .4s ease, background .5s ease, border .5s ease; }
    .adaptive-text { transition: opacity .3s ease; }

    /* Example button active */
    .example-btn {
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .example-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(168,85,247,.4);
    }
    .btn-active {
      transform: scale(.97) !important;
      box-shadow: none !important;
    }

    /* Motivation card */
    .motivation-card { transition: all .5s ease; }

    /* Webcam video */
    .webcam-output video { transition: opacity .4s ease; }

    /* Scanning line on webcam */
    @keyframes scanLine {
      0%   { top: 0%; }
      100% { top: 100%; }
    }
    .scan-line {
      position: absolute;
      left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #a855f7, transparent);
      pointer-events: none;
      z-index: 10;
      animation: scanLine 3s linear infinite;
      opacity: .5;
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────
   11. SCANNING LINE (visual flair on webcam)
───────────────────────────────────────────── */
function addScanLine() {
  const line = document.createElement("div");
  line.className = "scan-line";
  DOM.webcamOutput.appendChild(line);
}

/* ─────────────────────────────────────────────
   12. WEBSOCKET HOOK (for Python backend)
   Uncomment and configure when your Flask/FastAPI
   backend emits emotion + attention via WebSocket
───────────────────────────────────────────── */
/*
function connectBackend(url = "ws://localhost:8765") {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log("[NeuroLearn] Backend connected");
    addCognitiveEvent("🔗 Backend Connected");
  };

  ws.onmessage = (evt) => {
    try {
      const payload = JSON.parse(evt.data);
      // Expected: { emotion: "happy", attention: 82 }
      if (payload.emotion) applyBackendEmotion(payload.emotion, payload.attention);
    } catch (e) {
      console.warn("WS parse error", e);
    }
  };

  ws.onclose  = () => addCognitiveEvent("⚠️ Backend Disconnected");
  ws.onerror  = (e) => console.error("WS error", e);
}

function applyBackendEmotion(emotionKey, attention) {
  const data = EMOTIONS[emotionKey] || EMOTIONS.neutral;
  STATE.emotion   = emotionKey;
  STATE.attention = attention ?? STATE.attention;
  updateEmotionUI(emotionKey, data);
  updateAttentionUI();
  deriveAdaptiveMode();
}
*/

/* ─────────────────────────────────────────────
   13. TICKER LOOPS
───────────────────────────────────────────── */
function startLoops() {
  // Emotion update every 5 seconds
  tickEmotion(); // immediate first tick
  setInterval(tickEmotion, 5000);

  // Random cognitive events every 7 seconds
  setInterval(randomCognitiveEvent, 7000);

  // Face box micro-movement every 800ms
  setInterval(animateFaceBox, 800);
}

/* ─────────────────────────────────────────────
   14. BOOT
───────────────────────────────────────────── */
async function init() {
  cacheDom();
  injectStyles();
  addScanLine();
  await initWebcam();
  startLoops();

  if (DOM.exampleBtn) {
    DOM.exampleBtn.addEventListener("click", handleExampleBtn);
  }

  console.log(
    "%c🧠 NeuroLearn Initialised",
    "color:#a855f7;font-weight:700;font-size:14px;"
  );
}

document.addEventListener("DOMContentLoaded", init);