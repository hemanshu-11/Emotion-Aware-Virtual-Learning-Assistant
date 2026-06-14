# 🛠️ Setup and Installation Guide

## NeuroLearn — Emotion-Aware Virtual Learning Assistant

---

## 📋 Prerequisites

Make sure the following are installed on your system before proceeding:

| Requirement | Version | Purpose |
|---|---|---|
| Git | Latest | Clone the repository |
| Python | 3.8 or higher | Run the emotion detection backend |
| pip | Latest | Install Python dependencies |
| A modern browser | Chrome / Firefox / Edge | Run the frontend UI |
| Webcam | Any | Real-time facial emotion detection |

> **Note:** A working webcam is required. The system uses it to capture your facial expressions and feed them into the emotion recognition engine in real time.

---

## 📥 Step 1 — Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/hemanshu-11/Emotion-Aware-Virtual-Learning-Assistant.git
cd Emotion-Aware-Virtual-Learning-Assistant
```

---

## 🐍 Step 2 — Install Python Backend Dependencies

The Python backend handles all real-time facial emotion detection using OpenCV and the FER deep learning library. Install the required packages:

```bash
pip install opencv-python fer websockets
```

| Package | Purpose |
|---|---|
| `opencv-python` | Webcam capture and image frame processing |
| `fer` | Facial Emotion Recognition using deep learning |
| `websockets` | Real-time communication between backend and frontend |

> If you are using Python 3 explicitly, use `pip3` instead of `pip`.

---

## ▶️ Step 3 — Start the Python Backend

Run the backend server before opening the frontend. This starts the emotion detector and WebSocket server:

```bash
python Backend.py
```

Once running:
- An OpenCV window will open showing your live webcam feed with the detected emotion overlaid on the frame.
- The WebSocket server starts listening on `ws://localhost:8765`, ready to stream emotion data to the frontend.

> Keep this terminal window open throughout your session. Closing it will stop emotion detection.

---

## 🌐 Step 4 — Run the Frontend

The frontend is plain HTML, CSS, and JavaScript — no build tools needed. Serve it over a local server so the browser can access the webcam and connect to the WebSocket.

Using Python's built-in server:

```bash
python -m http.server 8080
```

Then open your browser and go to:

```
http://localhost:8080
```

> ⚠️ Do **not** open `index.html` directly via `file://` — this blocks webcam access and WebSocket connections due to browser security policies. Always use `http://localhost`.

---

## 🔌 Step 5 — Backend ↔ Frontend Connection

The frontend connects to the Python backend via WebSocket at:

```
ws://localhost:8765
```

The backend streams real-time emotion data as JSON payloads in this format:

```json
{ "emotion": "happy", "attention": 82 }
```

The frontend reads this data and:
- Updates the **Emotion Display** in real time
- Adjusts the **Attention Score** meter (0–100%)
- Logs events to the **Cognitive Event Stream**
- Switches the **Adaptive UI Mode** based on the detected emotional state

> As long as both the backend (`python Backend.py`) and the frontend (`http://localhost:8080`) are running simultaneously, the connection is established automatically on page load.

---

## 📁 Project Structure

```
Emotion-Aware-Virtual-Learning-Assistant/
│
├── index.html          # Main dashboard UI
├── neurolearn.js       # Core logic, emotion handling, WebSocket client
├── style.css           # Dark-themed stylesheet
├── Backend.py          # Python emotion detector + WebSocket server
├── PROJECT_STRUCTURE.md
└── README.md
```

---

## ❓ Troubleshooting

### Webcam not detected?
- Ensure your webcam is plugged in and not being used by another application.
- Check that your browser has camera permissions: **Settings → Privacy → Camera**.
- Make sure you are on `http://localhost` and not `file://`.

### Python backend not starting?
- Verify Python version: `python --version` (must be 3.8+)
- Reinstall dependencies: `pip install --upgrade opencv-python fer websockets`
- On some systems: `pip3 install opencv-python fer websockets`

### WebSocket not connecting?
- Confirm `Backend.py` is running **before** you open the browser.
- Check that nothing else is occupying port `8765`.
- Verify the WebSocket URL in `neurolearn.js` is set to `ws://localhost:8765`.

### Frontend not loading?
- Make sure you started the local server (`python -m http.server 8080`) from inside the project folder.
- Navigate to `http://localhost:8080`, not `http://localhost:8080/index.html` (though both should work).

---

## 👥 Authors

**The Bug Busters** — © 2026

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/hemanshu-11/Emotion-Aware-Virtual-Learning-Assistant/blob/main/LICENSE).
