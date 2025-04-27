#for pose detection
import mediapipe as mp 
import numpy as np

#for image input output operations
import matplotlib.pyplot as plt
import matplotlib.image as pimg

import math

mp_pose = mp.solutions.pose.Pose(min_detection_confidence=0.7,
min_tracking_confidence=0.7)
#where the min_detection_conficence and min_tracking_confidence are the minimum threshold values for detecting the pose

imgO = pimg.imread('./images/slim7.jpg')
img = np.copy(imgO)

#detecting the object using mediapipe
results = mp_pose.process(img)

RShoulder = results.pose_landmarks.landmark[12]
LShoulder = results.pose_landmarks.landmark[11]
LHip = results.pose_landmarks.landmark[23]
RHip = results.pose_landmarks.landmark[24]

print(RShoulder)
print(LShoulder)

print(RHip)
print(LHip)

shoulderWidth = math.dist([RShoulder.x, RShoulder.y, RShoulder.z], [LShoulder.x, LShoulder.y, LShoulder.z])
print("Shoulder width: " + str(shoulderWidth))

hipWidth = math.dist([RHip.x, RHip.y, RHip.z], [LHip.x, LHip.y, LHip.z])
print("Hip width: " + str(hipWidth))

print("Ratio: " + str(shoulderWidth/hipWidth))

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