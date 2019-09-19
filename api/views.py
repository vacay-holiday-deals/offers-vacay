# imports
import os
import datetime
from . import db
import cloudinary
from .models import User
from bson import ObjectId
from ast import literal_eval
from dotenv import load_dotenv
from cloudinary import uploader
from .controllers import upload
from bcrypt import hashpw, gensalt
from flask_pymongo import MongoClient
from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required


# initialise blueprint
api = Blueprint('api', __name__)

# load env variables from the .env file
load_dotenv(verbose=True)

# mongodb configurations
uri = os.getenv('MONGO_URI')
client = MongoClient(uri, connect=False, connectTimeoutMS=30000)
mongo = client.get_database('offers')


# routes
@api.route('/api/adduser', methods=['POST', 'GET'])
def adduser():
    if request.method == 'POST':
        # user details
        data = request.json
        name = data['name']
        username = data['username']
        email = data['email']
        passw = data['password']
        role = data['role']

        try:
            registered_user = User.objects(email=email).first()
            if registered_user:
                error = 'a user with that email already exists'
                print(error)
                return jsonify({'message': error})

            password = hashpw(passw.encode('utf-8'), gensalt(rounds=12))

            new_user = User(name, email, username, role, password)

            new_user.save()
            return jsonify({'message': 'user created'}), 200
        except Exception as error:
            print(error)
            return jsonify({'message': error}), 400
    return jsonify({'message': 'method is not allowed'}), 405


# login route
@api.route('/api/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        # get value from field
        data = request.json
        try:
            pass_candidate = data['password']
            username = data['username']

            # get user by username
            log_user = User.objects(username=username).first()
            if log_user:
                # check if password is same as one in the db
                identity = {
                    'username': log_user['username'],
                    'email': log_user['email']
                }
                expires = datetime.timedelta(hours=2)

                # create access token
                access_token = create_access_token(
                    identity=identity, expires_delta=expires, user_claims=log_user['role'])

                if hashpw(pass_candidate.encode('utf-8'), log_user['password'].encode('utf-8')) == log_user['password'].encode('utf-8'):
                    return jsonify(token=access_token), 200
                else:
                    error = 'invalid login, check username or password'
                    return jsonify({'message': error}), 400
            else:
                error = 'this user does not exist'
                print(error)
                return jsonify({'message': error}), 400
        except Exception as error:
            print(error)
            err = 'Error, something went wrong'
            return jsonify({'message': err}), 400
    return jsonify({'message': 'method is not allowed'}), 405

# route to add an offer
@api.route('/api/addoffer', methods=['POST', 'GET'])
def add_offer():
    data = request.json
    if request.method == 'POST':
        Images = data['images']
        Title = data['title']
        Overview = data['overview']
        Itinerary = data['itinerary']
        Inclusion = data['inclusion']
        Price = data['price']
        AddInfo = data['addinfo']

        new_offer = {
            'Title': Title,
            'Overview': Overview,
            'Itinerary': Itinerary,
            'Inclusion': Inclusion,
            'Price': Price,
            'AddInfo': AddInfo,
            'Images': Images,
            'CreatedAt': datetime.datetime.now()
        }

        try:
            # add a new offer to the database
            offers = mongo.offers
            offers.insert_one(new_offer)
            return jsonify({'message': 'The offer has been created'}), 200
        except Exception as error:
            print(error)
            return jsonify({'message': error}), 400
    return jsonify({'message': 'method is not allowed'}), 405

# show the offers available
@api.route('/api/getoffer', methods=['GET'])
def get_offers():
    if request.method == 'GET':
        try:
            # connect to db
            offers = mongo.offers
            # find all overs
            my_offers = list(offers.find({}))
            output = []
            for offer in my_offers:
                if not offer:
                    return jsonify({'message': 'no offers were found'})
                output.append({
                    'id': str(offer['_id']),
                    'title': offer['Title'],
                    'overview': offer['Overview'],
                    'itinerary': offer['Itinerary'],
                    'inclusion': offer['Inclusion'],
                    'price': offer['Price'],
                    'addinfo': offer['AddInfo'],
                    'images': offer['Images'],
                    'created': offer['CreatedAt']
                })
            return jsonify(output), 200
        except Exception as error:
            print(error)
            return jsonify({'message': error}), 400
    return jsonify({'message': 'method not allowed'}), 405


# endpoint to get article by id
@api.route('/api/getoffer/<title>', methods=["GET"])
def get_offer(title):
    offers = mongo.offers
    try:
        offer = offers.find_one(filter={"Title": title})
        if offer:
            output = {
                # 'id': offer['_id'],
                'title': offer['Title'],
                'overview': offer['Overview'],
                'itinerary': offer['Itinerary'],
                'inclusion': offer['Inclusion'],
                'price': offer['Price'],
                'addinfo': offer['AddInfo'],
                'images': offer['Images'],
                'created': offer['CreatedAt']
            }
            return output, 200
        else:
            return jsonify({"Message": "could not get offer"}), 400
    except Exception as error:
        print(error)
        return jsonify({"Message": "something went wrong"}), 400

# route to edit offer
@api.route('/api/editoffer/<string:id>', methods=['POST', 'GET'])
@jwt_required
def edit_offer(id):
    # get the form model
    data = request.json
    # get details from db
    # connect to db
    offers = mongo.offers
    # find offers
    offer = offers.find_one({'_id': ObjectId(id)})
    images = offer['Images']
    offer_id = offer['_id']

    # add data to the fields
    form.file.data = images
    form.title.data = offer['Title']
    form.overview.data = offer['Overview']
    form.itinerary.data = offer['Itinerary']
    form.inclusion.data = offer['Inclusion']
    form.price.data = offer['Price']
    form.addinfo.data = offer['AddInfo']

    # post the updated information
    # If method == post
    if request.method == 'POST':
        # get the new new form data
        files = request.files.getlist('file')
        for file in files:
            if not file:
                images = form.file.data
            else:
                result = upload(file)
                images.insert(0, result)

        title = request.form.get('title')
        overview = request.form.get('overview')
        itinerary = request.form.get('itinerary')
        inclusion = request.form.get('inclusion')
        price = request.form.get('price')
        addinfo = request.form.get('addinfo')

        # create the update object with all updated data
        update = {'$set': {
            "Images": images,
            "Title": title,
            "Overview": overview,
            "Itinerary": itinerary,
            "Inclusion": inclusion,
            "Price": price,
            "AddInfo": addinfo,
            'CreatedAt': datetime.datetime.now()
        }
        }
        # call the update function in mongo and pass the update
        try:
            offers.update_one({'_id': ObjectId(id)},
                              update=update, upsert=True)
            return jsonify({'message': 'offer updated'}), 200
        except Exception as error:
            print(error)
            return jsonify({'message': 'something went wrong'}), 400
    return jsonify({'message': 'method not allowed'}), 405


# route to delete an offer
@api.route('/api/delete/<string:id>', methods=['POST', 'GET'])
@jwt_required
def delete_offer(id):
    if request.method == 'POST':
        # connect to the database
        offers = mongo.offers
        # find item to delete
        try:
            offers.delete_one({'_id': ObjectId(id)})
            return jsonify({'message': 'offer deleted'}), 200
        except Exception as error:
            print(error)
            return jsonify({'message': 'something went wrong'}), 400
    return jsonify({'message': 'method is not allowed'}), 405

    return jsonify({'message': 'hello world'})


@api.route('/api/usersdata', methods=['POST'])
def get_data():
    if request.method == 'POST':
        usr = os.getenv('USR')
        pwd = os.getenv('PASSWORD')
        sender = os.getenv('SENDER')
        receiver = os.getenv('RECEIVER')
        port = 465

        data = request.data
        new_data = literal_eval(data.decode('utf-8'))
        try:
            # email object
            email_object = {
                'Name': new_data['Name'],
                'Email': new_data['Email'],
                'Nationality': new_data['Nationality'],
                'Number': new_data['Number'],
                'Package': new_data['Package'],
                'Depature': new_data['Departure'],
                'Adult': new_data['Adults'],
                'Children': new_data['Children'],
                'Bugdet': new_data['Budget'],
                'Addinfo': new_data['Info'],
                'CreadetAt': datetime.datetime.now()
            }
            # add email to db
            emails = mongo.emails
            emails.insert_one(email_object)

            body = """
                <div style="height: auto; background: #eeeeee; color:#000411; padding: 10px; border-radius: 3px; font-size: .9rem">
                   <p> Name :  %s  </p>
                   <p> Email :  %s  </p>
                   <p> Nationality :  %s  </p>
                   <p> Number :  %s  </p>
                   <p> Departure :  %s  </p>
                   <p> Adults :  %s  </p>
                   <p> Children :  %s  </p>
                   <p> Budget :  %s  </p>
                   <span> <h4> Additional Information </h4> <p> %s </p></span>
            """ % (new_data['Name'], new_data['Email'], new_data['Nationality'], new_data['Number'], new_data['Departure'], new_data['Adults'], new_data['Children'], new_data['Budget'], new_data['Info'])

            # # send mail to mail server
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL("smtp.webfaction.com", port=port, context=context) as server:
                # connect to smtp server
                server.login(usr, pwd)
                msg = MIMEMultipart()
                msg['FROM'] = sender
                msg['TO'] = receiver
                msg['Subject'] = new_data['Package']
                body = body
                msg.attach(MIMEText(body, 'html'))
                text = msg.as_string()
                server.sendmail(sender, receiver, text)

            return jsonify({'Message': 'Your inquiry has been sent'}), 200
        except Exception as error:
            print(error)
            return jsonify({'Message': 'Something went wrong please try again'}), 400
    return jsonify({'Message': 'you encountered a problem'}), 400
