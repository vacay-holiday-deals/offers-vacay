import os
from dotenv import load_dotenv
from flask import render_template
import cloudinary
from cloudinary import uploader

# load env variables
load_dotenv(verbose=True)

# functions to do things
# upload file to cloudinary


def upload(file):
    folder = os.getenv('CLOUD_FOLDER')
    res = cloudinary.uploader.upload(file, folder=folder)
    result = res['secure_url']
    return result
