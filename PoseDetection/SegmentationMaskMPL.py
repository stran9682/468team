from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import numpy as np

import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

import matplotlib.pyplot as plt
import matplotlib.image as pimg

# STEP 2: Create an PoseLandmarker object.
base_options = python.BaseOptions(model_asset_path='pose_landmarker_full.task')
options = vision.PoseLandmarkerOptions(
    base_options=base_options,
    output_segmentation_masks=True)
detector = vision.PoseLandmarker.create_from_options(options)

# STEP 3: Load the input image.
image = mp.Image.create_from_file("./20.jpg")


# STEP 4: Detect pose landmarks from the input image.
detection_result = detector.detect(image)

def draw_landmarks_on_image(rgb_image, detection_result):
    pose_landmarks_list = detection_result.pose_landmarks
    annotated_image = np.copy(rgb_image)

    # Loop through the detected poses to visualize.
    for idx in range(len(pose_landmarks_list)):
        pose_landmarks = pose_landmarks_list[idx]

        # Draw the pose landmarks.
        pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        pose_landmarks_proto.landmark.extend([
            landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in pose_landmarks
        ])

        solutions.drawing_utils.draw_landmarks(
            annotated_image,
            pose_landmarks_proto,
            solutions.pose.POSE_CONNECTIONS,
            solutions.drawing_utils.DrawingSpec(color=(255, 0, 0), thickness=4, circle_radius=2),
            solutions.drawing_utils.DrawingSpec(color=(255, 0, 0), thickness=6, circle_radius=2)
        )

    return annotated_image

annotated_image = draw_landmarks_on_image(image.numpy_view(), detection_result)
plt.imshow(annotated_image)
plt.show()

segmentation_mask = detection_result.segmentation_masks[0].numpy_view().round().astype(np.uint8)

landmarks = detection_result.pose_landmarks[0]
# print("x: " + str(landmarks[26].x * np.size(segmentation_mask, 1) ) + "\t" + "y: " +str(landmarks[26].y * np.size(segmentation_mask, 0)))

HipY = int(landmarks[24].y * np.size(segmentation_mask, 0))
ShoulderL = int(landmarks[12].x * np.size(segmentation_mask, 1))
ShoulderR = int(landmarks[11].x * np.size(segmentation_mask, 1))
ShoulderY = int(landmarks[11].y * np.size(segmentation_mask, 0))


shouldx = ((landmarks[11].x * np.size(segmentation_mask, 1)  + landmarks[12].x * np.size(segmentation_mask, 1) )/2)
waistx = ((landmarks[24].x * np.size(segmentation_mask, 1)  + landmarks[23].x * np.size(segmentation_mask, 1) )/2)
bodyx = (shouldx + waistx) / 2


lefty = ((landmarks[12].y * np.size(segmentation_mask, 0)  + landmarks[24].y * np.size(segmentation_mask, 0) )/2)
righty = ((landmarks[11].y * np.size(segmentation_mask, 0)  + landmarks[23].y * np.size(segmentation_mask, 0) )/2)
bodyy = (lefty + righty) /2


RowIdx = ShoulderY
count1 = 0
while (RowIdx < bodyy):
    ColIdx = ShoulderL

    while (ColIdx <= ShoulderR):
        if (segmentation_mask[RowIdx, ColIdx] == 1):
            count1 +=1

        ColIdx += 1
        
    RowIdx +=1


print(count1)

RowIdx = int(bodyy)
count1 = 0
while (RowIdx < HipY):
    ColIdx = ShoulderL

    while (ColIdx <= ShoulderR):
        if (segmentation_mask[RowIdx, ColIdx] == 1):
            count1 +=1

        ColIdx += 1
        
    RowIdx +=1

print(count1)


visualized_mask = np.repeat(segmentation_mask[:, :, np.newaxis], 3, axis=2)*255 # converts 2d array into a 3d RGB array
plt.imshow(draw_landmarks_on_image(visualized_mask, detection_result))
plt.show()
