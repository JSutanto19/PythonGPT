import ast
from scenedetect import open_video, SceneManager, ContentDetector
from scenedetect.scene_manager import save_images
import numpy as np

import os
import cv2
from fcb import return_relevant_vector
from pedri import extract_frame

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from urllib.parse import quote

app = Flask(__name__, static_folder='backend/timestamp-model')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

def timestamp_to_seconds(timestamp):
    hours, minutes, seconds = map(int, timestamp.split(":"))
    return hours * 3600 + minutes * 60 + seconds

def encode_file_path(path):
        # Split the path into parts to avoid encoding the slashes
        parts = path.split('/')
        encoded_parts = [quote(part) for part in parts]
        encoded_path = '/'.join(encoded_parts)
        return encoded_path

@app.route("/images/<path:filename>")
def serve_image(filename):
    directory = "/Users/jason_sutanto/tagpt2/tagpt2/backend/timestamp-model/"
    full_path = os.path.join(directory, filename)
    print("Serving image from:", full_path) 
    return send_from_directory(directory, filename)

@app.route('/forum2', methods=["POST"])
def getImgTimeStamp():
    data = data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"error": "No question provided"}), 400

    question = data['question']
    result = return_relevant_vector(question)
    most_relevant_vector = result["matches"][0]["metadata"]
    most_relevant_vector1 = result["matches"][1]["metadata"]
    print("vector1", most_relevant_vector)
    print("vector2", most_relevant_vector1)
    start_time = most_relevant_vector["start_time"]
    end_time = most_relevant_vector["end_time"]
    title = most_relevant_vector["title"]
    result_seconds = timestamp_to_seconds(start_time)
    start_time1 = most_relevant_vector1["start_time"]
    end_time1 = most_relevant_vector1["end_time"]
    title1 = most_relevant_vector["title"]
    result_seconds1 = timestamp_to_seconds(start_time)


    def find_closest_image(files, target_seconds):
        closest_image = None
        smallest_diff = float("inf")

        for file in files:
            # Assumes file naming follows the 'test-HH:MM:SS.jpg' pattern
            file_timestamp = file.split("-")[-1].replace(".jpg", "")
            file_seconds = timestamp_to_seconds(file_timestamp)

            diff = abs(file_seconds - target_seconds)
            if diff < smallest_diff:
                smallest_diff = diff
                closest_image = file

        return closest_image

    

    # Find the closest image to the given timestamp
    # Ensure 'topic' is a directory name where the images are stored
    files = os.listdir(
        title
    )  
    closest_image_path = find_closest_image(files, result_seconds)
    closest_image_path1 = find_closest_image(files, result_seconds1)
    if closest_image_path:
        most_relevant_vector['img_path'] = closest_image_path
    if closest_image_path1:
        most_relevant_vector1['img_path'] = closest_image_path1
        
    
    
    image_path = most_relevant_vector['title'] + '/' + closest_image_path
    # encoded_image_path = encode_file_path(image_path)
    

    return jsonify({
        "time1": most_relevant_vector['start_time'],
        "time2": most_relevant_vector1['start_time'],
        'title': most_relevant_vector['title'],
        'img_url': image_path,
        "incoming": False
    })
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True) 

