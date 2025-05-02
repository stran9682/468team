import os
from flask import Flask, abort, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

import numpy as np

import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

import requests
import random


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
UPLOAD_FOLDER = 'temp'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

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

@app.route('/', methods=['POST'])
def landmarks():

    # return a 400 if a file was not attached.
    if 'file' not in request.files:
        abort(400)
    
    file = request.files['file']

    # bad file extension.
    if not file or not allowed_file(file.filename):
        abort(400)

    # Store the file locally real quick
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Load the input image.
    image = mp.Image.create_from_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Detect pose landmarks from the input image.
    detection_result = detector.detect(image)

    # Remove the file, we're done with it now.
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Get the chest/torso ratio
    ratio = getRatio(detection_result)

    shirtFit = getShirtFit(ratio)
    shirts = requests.get("http://worker:8080/ClothingItem", params={"type": "shirt", "fit":shirtFit}).json()

    while (len(shirts) < 1):
        shirtFit = getShirtFit(ratio)
        shirts = requests.get("http://worker:8080/ClothingItem", params={"type": "shirt", "fit":shirtFit}).json()

    shirt = random.choice(shirts)

    print(shirt)

    pantFit = random.choice(shirtToPantFit.get(shirtFit))
    selectedPants = requests.get("http://worker:8080/ClothingItem", params={"type": "pants", "fit":pantFit}).json()

    while (len(selectedPants) < 1):
        pantFit = random.choice(shirtToPantFit.get(shirtFit))
        selectedPants = requests.get("http://worker:8080/ClothingItem", params={"type": "pants", "fit":pantFit}).json()

    pant = random.choice(selectedPants)

    outfit = [shirt, pant]
    print(outfit)

    return outfit

def getShirtFit (ratio):
    shirtFits = []
    if (ratio < 1.07):
        shirtFits = ["oversized", "loose", "relaxed"]
    elif(ratio < 1.15): #rename variables
        shirtFits = ["loose", "relaxed", "regular"]
    else:
        shirtFits = ["relaxed", "regular", "slim"]

    shirtFit = random.choice(shirtFits)

    return shirtFit

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

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)