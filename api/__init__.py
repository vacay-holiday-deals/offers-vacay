from flask import Flask, url_for, send_from_directory
import os
from os.path import exists, join
import datetime
from flask_cors import CORS
from dotenv import load_dotenv
import cloudinary
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

# load environmental variables
load_dotenv(verbose=True)

mongo_uri = os.getenv('MONGO_URI')

cors = CORS()
db = MongoEngine()
jwt = JWTManager()


# create the app function
def create_app():
    app = Flask(__name__, static_folder='../client/build')
    app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(minutes=1)
    app.config['MONGODB_SETTINGS'] = {
        'db': 'offers',
        'host': mongo_uri or None,
        'connect': False
    }

    # create a secret key
    SECRET_KEY = os.urandom(64)
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['JWT_SECRET_KEY'] = SECRET_KEY

    # initialise the database
    db.init_app(app)

    # prevents crossite scripting
    cors.init_app(app)

    # init jwt manager
    jwt.init_app(app)

    # cloudinary configuration
    cloudinary.config(
        cloud_name=os.getenv('CLOUD_NAME'),
        api_key=os.getenv('API_KEY'),
        api_secret=os.getenv('API_SECRET')
    )

    # run static react
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        file_to_serve = path if path and exists(
            join(app.static_folder, path)) else 'index.html'
        return send_from_directory(app.static_folder, file_to_serve)

    # import blueprint from views
    from .views import api

    app.register_blueprint(api)

    return app
