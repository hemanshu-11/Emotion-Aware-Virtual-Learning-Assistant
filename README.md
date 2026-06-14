# 🧠 NeuroLearn — Emotion-Aware Learning Assistant

NeuroLearn is an adaptive learning dashboard that uses real-time facial emotion recognition to personalise the learning experience. It detects the learner's emotional state via webcam, tracks attention levels, streams cognitive events, and delivers adaptive content responses — all in a sleek, dark-themed UI.

---

## ✨ Features

- **Real-time Webcam Feed** — Live camera stream with animated face-detection overlay and scan-line effect
- **Emotion Recognition** — Detects 9 emotional states (happy, focused, confused, surprised, sad, neutral, angry, disgusted, fearful) via a Python backend (FER) or frontend simulation
- **Attention Tracking** — Derives a dynamic attention score (0–100%) from the detected emotion and updates a live progress bar
- **Cognitive Event Stream** — Generates real-time learning events (e.g. "Focus Detected", "Confusion Detected", "Example Suggested")
- **Adaptive Responses** — Automatically adjusts on-screen guidance based on the learner's current state (normal / confused / distracted / bored)
- **Example Rotator** — "Show Another Example" button cycles through contextual AI explainers
- **Simulation Mode** — Runs a realistic emotion sequence if the camera is unavailable or permission is denied
- **WebSocket-Ready** — Includes a commented-out WebSocket hook (`connectBackend`) to wire up the Python backend in production

---

## 🗂 Project Structure

See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for a detailed breakdown.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend UI | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Google Fonts — Inter |
| Emotion Backend | Python, OpenCV (`cv2`), FER library |
| Backend Integration | WebSocket (ws://) — optional, commented out |

---

## 🎭 Emotion States & Behaviour

| Emotion | Adaptive Mode | Attention Range |
|---|---|---|
| 😊 Happy | normal | 70–90% |
| 🎯 Focused | normal | 75–95% |
| 😐 Neutral | normal | 50–70% |
| 😲 Surprised | normal | 60–80% |
| 😕 Confused | confused | 40–60% |
| 😠 Angry | distracted | 30–55% |
| 😨 Fearful | distracted | 35–60% |
| 🤢 Disgusted | bored | 25–50% |
| 😢 Sad | bored | 20–45% |

---

## 📸 Screenshots

<img width="1256" height="583" alt="image" src="https://github.com/user-attachments/assets/14855a69-efe4-4dd4-ab94-44634bda6b64" />

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

---

## 👥 Authors
Hemanshu M - hemanshu1947@gmail.com / hemanshu.25bai10608@vitbhopal.ac.in

Divyansh Verma - divyanshv235@gmail.com

Parth Chouhan - parthchouhan2007@gmail.com

Shaan Agarwal - shaanagarwal391@gmail.com

Adit Prasad - adit.25bce10115@vitbhopal.ac.

**The Bug Busters** — © 2026
