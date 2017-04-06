from index import db
from flask import g

class User(db.Model):
	"""docstring for User"""
	__tablename__ = "users"
	id = db.Column('user_id',db.Integer , primary_key=True)
	email = db.Column('email',db.String(80), unique=True)
	username = db.Column('username',db.String(80), unique=True)
	password = db.Column('password',db.String(80), nullable=False)
	events = db.relationship('Event', backref='user', lazy='dynamic' )
	
	def __init__(self,email,username, password):
		self.email = email
		self.username = username
		self.password = password
		
	# def hash_password(self, password):
	# 	self.password_hash = pwd_context.encrypt(password)

	# def verify_password(self, password):
	# 	return pwd_context.verify(password, self.password_hash)

	def get_id(self):
		return unicode(self.id)

	def __repr__(self):
		return '<User %r>'%self.username


	@staticmethod	
	def verify_email_password(email, password):
	# user = User.verify_auth_token(username_or_token)
		data = User.query.all()
		user = User.query.filter_by(email=email).first()
		if user and user.password == password:
			g.user = user
			return user
		else:
			return None


class Event(db.Model):
	__tablename__ = "events"
	id = db.Column('event_id', db.Integer, primary_key = True)
	date = db.Column('date', db.String(20), nullable=False)
	starttime = db.Column('starttime', db.String(20), nullable=False)
	endtime = db.Column('endtime', db.String(20), nullable=False)
	event_detail = db.Column('event_detail', db.String(100), nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

	def __init__(self,date,starttime,endtime,event_detail):
		self.date = date
		self.starttime= starttime
		self.endtime= endtime
		self.event_detail = event_detail