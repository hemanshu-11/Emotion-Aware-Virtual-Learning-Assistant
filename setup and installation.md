# 🛠️ Setup and Installation Guide

## NeuroLearn — Emotion-Aware Virtual Learning Assistant

---

## 📋 Prerequisites

Before getting started, make sure you have the following installed on your system:

| Requirement | Version | Purpose |
|---|---|---|
| Git | Latest | Clone the repository |
| Python | 3.8 or higher | Run the emotion detection backend |
| pip | Latest | Install Python dependencies |
| Node.js / npx | Optional | Run a local dev server |
| A modern browser | Chrome / Firefox / Edge | Run the frontend UI |

> **Note:** A working webcam is required for real-time emotion detection. The app can also run in simulation mode without one.

---

## 📥 Step 1 — Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/hemanshu-11/Emotion-Aware-Virtual-Learning-Assistant.git
cd Emotion-Aware-Virtual-Learning-Assistant
```

---

## 🌐 Step 2 — Run the Frontend

No build tools or package managers are needed for the frontend. It is plain HTML, CSS, and JavaScript.

### Option A — Open Directly in Browser

```bash
open index.html
```

> ⚠️ **Important:** Opening via `file://` will block webcam access in most browsers due to security restrictions.

### Option B — Local Dev Server (Recommended)

Using Python (built-in, no install needed):

```bash
python -m http.server 8080
```

Using Node.js `serve`:

```bash
npx serve .
```

Then open your browser and navigate to:

```
http://localhost:8080
```

> ✅ Serving over `http://localhost` allows the browser to grant webcam permissions.

---

## 🐍 Step 3 — Install Python Backend Dependencies (Optional)

The Python backend provides real facial emotion recognition using your webcam via the FER library. This step is **optional** — the app runs in simulation mode without it.

### Install the required packages:

```bash
pip install opencv-python fer
```

| Package | Purpose |
|---|---|
| `opencv-python` | Webcam capture and image processing |
| `fer` | Facial Emotion Recognition using deep learning |

---

## ▶️ Step 4 — Run the Python Backend (Optional)

Once dependencies are installed, start the emotion detector:

```bash
python Backend.py
```

A separate OpenCV window will open showing your live webcam feed with the detected dominant emotion overlaid on the frame.

---

## 🔌 Step 5 — Connect Backend to Frontend (Optional)

The frontend includes a ready-to-use WebSocket hook in `neurolearn.js`. To enable full backend integration:

### 1. Set up a WebSocket server in Python

Install the `websockets` library:

```bash
pip install websockets
```

Your WebSocket server should emit JSON payloads in this format:

```json
{ "emotion": "happy", "attention": 82 }
```

### 2. Uncomment the WebSocket hook in `neurolearn.js`

Locate the `connectBackend()` function and its call, and remove the comment markers.

### 3. Update the WebSocket URL if needed

Default URL used by the frontend:

```
ws://localhost:8765
```

---

## 📁 Project Structure

```
Emotion-Aware-Virtual-Learning-Assistant/
│
├── index.html          # Main UI — dashboard layout
├── neurolearn.js       # Core logic, emotion handling, WebSocket hook
├── style.css           # Dark-themed stylesheet
├── Backend.py          # Python emotion detector (OpenCV + FER)
├── PROJECT_STRUCTURE.md
└── README.md
```

---

## 🎭 Emotion States Reference

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

## ❓ Troubleshooting

### Webcam not working?
- Make sure you are serving the app over `http://localhost`, not `file://`
- Check that your browser has permission to access the camera (Settings → Privacy → Camera)
- If no camera is available, the app will automatically switch to **Simulation Mode**

### Python backend errors?
- Ensure Python 3.8+ is installed: `python --version`
- Reinstall dependencies: `pip install --upgrade opencv-python fer`
- On some systems you may need: `pip3 install opencv-python fer`

### WebSocket not connecting?
- Make sure the Python WebSocket server is running before loading the frontend
- Check that the URL in `neurolearn.js` matches your server address (default: `ws://localhost:8765`)

---

## 👥 Authors

**The Bug Busters** — © 2026

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/hemanshu-11/Emotion-Aware-Virtual-Learning-Assistant/blob/main/LICENSE).
