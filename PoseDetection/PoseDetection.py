#for pose detection
import mediapipe as mp 
import numpy as np

#for image input output operations
import matplotlib.pyplot as plt
import matplotlib.image as pimg

mp_pose = mp.solutions.pose.Pose(min_detection_confidence=0.7,
min_tracking_confidence=0.7)
#where the min_detection_conficence and min_tracking_confidence are the minimum threshold values for detecting the pose

imgO = pimg.imread('test3.jpg')
img = np.copy(imgO)

#detecting the object using mediapipe
results = mp_pose.process(img)
print(results.pose_landmarks)

mp_drawing = mp.solutions.drawing_utils
mp_drawing.draw_landmarks(
    img, 
    results.pose_landmarks, 
    mp.solutions.pose.POSE_CONNECTIONS,
    mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=4, circle_radius=2),
    mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=6, circle_radius=2)
)
plt.imshow(img)
plt.show()