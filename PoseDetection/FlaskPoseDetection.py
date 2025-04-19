from flask import Flask

#for pose detection
import mediapipe as mp 
import numpy as np

#for image input output operations
import matplotlib.image as pimg

app = Flask(__name__)

@app.route('/', methods=['GET'])
def landmarks():

    #where the min_detection_conficence and min_tracking_confidence are the minimum threshold values for detecting the pose
    mp_pose = mp.solutions.pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)

    imgO = pimg.imread('test2.jpg')
    img = np.copy(imgO)

    # Detecting the object using mediapipe
    results = mp_pose.process(img)

    # Convert the results to JSON format
    if results.pose_landmarks:
        landmarks = [
            {
                "x": landmark.x,
                "y": landmark.y,
                "z": landmark.z,
                "visibility": landmark.visibility
            }
            for landmark in results.pose_landmarks.landmark
        ]
        return {"pose_landmarks": landmarks}
    else:
        return {"pose_landmarks": None}