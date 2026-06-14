# 📁 NeuroLearn — Project Structure

```
neurolearn/
│
├── index.html              # Main application shell
│                           # Defines the three-column dashboard layout:
│                           #   Left  → Learner State + Cognitive Event Stream
│                           #   Centre → Webcam Feed + Current Topic
│                           #   Right  → Adaptive Response panel
│
├── style.css               # Full visual design system
│                           # - Dark theme (#040816 base, #0d1327 cards)
│                           # - Purple accent palette (#a855f7, #c084fc, #9333ea)
│                           # - CSS Grid dashboard layout (280px | 1fr | 360px)
│                           # - Card hover effects, progress bar, animations
│                           # - Fully responsive (breakpoints at 1200px & 640px)
│
├── neurolearn.js           # Frontend integration & logic layer
│                           # Sections:
│                           #   1.  STATE          — central app state object
│                           #   2.  DATA MAPS      — emotion definitions, learning
│                           #                        states, cognitive events,
│                           #                        adaptive responses, examples
│                           #   3.  DOM REFS       — cached element references
│                           #   4.  WEBCAM         — getUserMedia stream setup,
│                           #                        simulation mode fallback
│                           #   5.  EMOTION ENGINE — simulated emotion tick cycle
│                           #                        (replace with real data)
│                           #   6.  ATTENTION UI   — progress bar + learning state
│                           #                        + motivation card updates
│                           #   7.  COGNITIVE EVENTS — live event stream renderer
│                           #   8.  EXAMPLE BUTTON — rotating AI explainers
│                           #   9.  FACE BOX       — simulated micro-jitter tracking
│                           #   10. INJECTED CSS   — runtime animation keyframes
│                           #   11. SCAN LINE      — webcam visual effect
│                           #   12. WEBSOCKET HOOK — (commented) Python backend
│                           #                        integration via ws://
│                           #   13. TICKER LOOPS   — setInterval orchestration
│                           #   14. BOOT           — init() entry point
│
├── backend.py              # Python emotion detection backend
│                           # - Opens system webcam via OpenCV (cv2)
│                           # - Runs FER (Facial Emotion Recognition) on each frame
│                           # - Overlays the dominant emotion label on the video feed
│                           # - Displays output in a named OpenCV window
│                           # - Press 'q' to quit
│                           # Note: In production, extend this with a WebSocket
│                           # server to stream results to the frontend
│
└── README.md               # Project overview, setup guide, usage docs
```

---

## 🔄 Data Flow

```
Camera (cv2 / getUserMedia)
        │
        ▼
Emotion Detection (FER / simulated sequence)
        │
        ▼
WebSocket Payload  { emotion, attention }
        │
        ▼
neurolearn.js — STATE update
        │
        ├──▶ Learner State panel  (emotion label, attention bar, learning state, motivation)
        ├──▶ Cognitive Event Stream  (auto-generated event labels, fade-in animation)
        └──▶ Adaptive Response panel  (context-aware title, message, explanation)
```

---

## 🧩 Key Relationships

| File | Depends On | Provides |
|---|---|---|
| `index.html` | `style.css`, `neurolearn.js` | DOM structure, semantic markup |
| `style.css` | — | Visual design, layout, responsive rules |
| `neurolearn.js` | `index.html` DOM | Live interactivity, webcam, emotion logic |
| `backend.py` | OpenCV, FER, system camera | Raw emotion detection (feeds into WebSocket) |

---

## ⚙️ Runtime Modes

| Mode | Trigger | Behaviour |
|---|---|---|
| **Live Camera** | Camera permission granted | Real webcam stream shown; emotion simulated until WebSocket connected |
| **Simulation** | Camera denied / unavailable | Emotion cycles through a preset sequence every 5 s; cognitive events fire every 7 s |
| **Full Backend** | WebSocket active (uncommented) | Real FER data from Python replaces simulation tick |
