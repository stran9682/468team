import os
from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

#for pose detection
import mediapipe as mp 
import numpy as np

#for image input output operations
import matplotlib.image as pimg

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
UPLOAD_FOLDER = '/temp'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def landmarks():

    # return a 400 if a file was not attached.
    if 'file' not in request.files:
        abort(400)
    
    file = request.files['file']

    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        #where the min_detection_conficence and min_tracking_confidence are the minimum threshold values for detecting the pose
        mp_pose = mp.solutions.pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)

        imgO = pimg.imread(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        img = np.copy(imgO)

        # Detecting the object using mediapipe
        results = mp_pose.process(img)

        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))

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
    
    # bad file extension.
    else: 
        abort(400)