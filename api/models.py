from . import db
from flask_login import UserMixin
from datetime import datetime


class User(UserMixin, db.Document):
    meta = {'collection': 'users'}
    name = db.StringField(max_length=100)
    email = db.EmailField()
    username = db.StringField(max_length=100)
    role = db.StringField(max_length=100)
    password = db.StringField(min_length=6)
    created = db.DateTimeField(default=datetime.now())


class Offer(db.Document):
    meta = {'collection': 'offers'}
    Title = db.StringField(max_length=100, default='')
    Overview = db.StringField(max_length=2000, default='')
    Itinerary = db.StringField(max_length=2000, default='')
    Inclusion = db.StringField(max_length=2000, default='')
    Price = db.StringField(max_length=2000, default='')
    AddInfo = db.StringField(max_length=2000, default='')
    Images = db.ListField(db.ListField(default=list), default=list)
    Created = db.DateTimeField(default=datetime.now())


class Email(db.Document):
    meta = {'collection': 'emails'}
