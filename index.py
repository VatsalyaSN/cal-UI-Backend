from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
# from flask_httpauth import HTTPBasicAuth
# from passlib.apps import custom_app_context as pwd_context
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
# from itsdangerous import SignatureExpired, BadSignature

app = Flask(__name__,static_folder="./static",template_folder="./templates")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:test@localhost/calendar'
db = SQLAlchemy(app)
app.debug = True

# auth = HTTPBasicAuth()

app.config.update(dict(
    DEBUG=True,
    SECRET_KEY='development key'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)
