import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS

from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import numpy as np

import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

import matplotlib.pyplot as plt
import matplotlib.image as pimg

import requests
import random

UPLOAD_FOLDER = 'temp'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Creating the MediaPipe pose detection model
base_options = python.BaseOptions(model_asset_path='pose_landmarker_full.task')
options = vision.PoseLandmarkerOptions(
    base_options=base_options,
    output_segmentation_masks=True)
detector = vision.PoseLandmarker.create_from_options(options)

shirtToPantFit = {
    "oversized" : ["baggy", "relaxed"],
    "loose"     : ["baggy", "relaxed", "slim"],
    "relaxed"   : ["relaxed", "straight"],
    "regular"   : ["regular", "slim"],
    "slim"      : ["slim", "baggy"]
}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('download_file', name=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/uploads/<name>')
def download_file(name):
    
    # Load the input image.
    image = mp.Image.create_from_file(os.path.join(app.config['UPLOAD_FOLDER'], name))

    # Detect pose landmarks from the input image.
    detection_result = detector.detect(image)

    # Remove the file, we're done with it now.
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], name))

    ratio = getRatio(detection_result)
    
    print(ratio)

    shirtFits = []
    if (ratio < 1.07):
        shirtFits = ["oversized", "loose", "relaxed"]
    elif(ratio < 1.15): #rename variables
        shirtFits = ["loose", "relaxed", "regular"]
    else:
        shirtFits = ["relaxed", "regular", "slim"]

    shirtFit = random.choice(shirtFits)
    shirts = requests.get("http://localhost:8080/ClothingItem", params={"type": "shirt", "fit":shirtFit}).json()

    while (len(shirts) < 1):
        shirtFit = random.choice(shirtFits)
        shirts = requests.get("http://localhost:8080/ClothingItem", params={"type": "shirt", "fit":shirtFit}).json()

    shirt = random.choice(shirts)

    print(shirt)

    pantFit = random.choice(shirtToPantFit.get(shirtFit))
    selectedPants = requests.get("http://localhost:8080/ClothingItem", params={"type": "pants", "fit":pantFit}).json()

    while (len(selectedPants) < 1):
        pantFit = random.choice(shirtToPantFit.get(shirtFit))
        selectedPants = requests.get("http://localhost:8080/ClothingItem", params={"type": "pants", "fit":pantFit}).json()

    pant = random.choice(selectedPants)

    outfit = [shirt, pant]
  
    return outfit

def getRatio (detection_result):
    # STEP 3: Create segrementation mask from detected result
    segmentation_mask = detection_result.segmentation_masks[0].numpy_view().round().astype(np.uint8)

    # STEP 4: Get pixel location of landmarks
    landmarks = detection_result.pose_landmarks[0]

    # where your hip is on the Y axis
    HipY = int(landmarks[24].y * np.size(segmentation_mask, 0))

    # where your right shoulder is on the x axis
    ShoulderLX = int(landmarks[12].x * np.size(segmentation_mask, 1))

    # where your right shoulder is on the y axis
    ShoulderRX = int(landmarks[11].x * np.size(segmentation_mask, 1))  

    # where your shoulders are on the Y axis
    ShouldersY = int(landmarks[11].y * np.size(segmentation_mask, 0))

    # Y midpoint of your torso
    avgLeftSideY = ((landmarks[12].y * np.size(segmentation_mask, 0)  + landmarks[24].y * np.size(segmentation_mask, 0) )/2)
    avgRightSideY = ((landmarks[11].y * np.size(segmentation_mask, 0)  + landmarks[23].y * np.size(segmentation_mask, 0) )/2)
    avgBodyY = (avgLeftSideY + avgRightSideY) /2

    RowIdx = ShouldersY
    topPxCount = 0
    while (RowIdx < avgBodyY):
        ColIdx = ShoulderLX

        while (ColIdx <= ShoulderRX):
            if (segmentation_mask[RowIdx, ColIdx] == 1):
                topPxCount  +=1

            ColIdx += 1
            
        RowIdx +=1

    RowIdx = int(avgBodyY)
    btmPxCount = 0
    while (RowIdx < HipY):
        ColIdx = ShoulderLX

        while (ColIdx <= ShoulderRX):
            if (segmentation_mask[RowIdx, ColIdx] == 1):
                btmPxCount +=1

            ColIdx += 1
            
        RowIdx +=1
    
    ratio = topPxCount/btmPxCount

    return ratio
