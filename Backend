import cv2
from fer.fer import FER

detector = FER()

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    results = detector.detect_emotions(frame)

    if results:
        emotions = results[0]["emotions"]

        dominant = max(emotions, key=emotions.get)

        cv2.putText(
            frame,
            f"Emotion: {dominant}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

    cv2.imshow("NeuroLearn Emotion Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
