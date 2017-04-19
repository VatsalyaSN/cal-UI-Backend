from flask import Flask, request,g, redirect, url_for, abort,render_template,jsonify
from .model import User,Event
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_auth_token,verify_auth_token
from flask_login import LoginManager,current_user,AnonymousUserMixin
from operator import itemgetter

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class Anonymous(AnonymousUserMixin):
	def __init__(self):
		self.username = 'Guest'

login_manager.anonymous_user = Anonymous

@app.before_request
def before_request():
	g.user = current_user

@app.route('/', methods=['GET'])
def index():
	print("hello worlllllllddddd")
	return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def any_path(path):
	return render_template('index.html')

@app.route('/api/create_user', methods=["POST"])
def create_user():
	# print("VATSALYA")
	incoming = request.get_json()
	user = User(
		email = incoming["email"],
		username=incoming["username"],
		password=incoming["password"]
		)
	if incoming["email"] is None or incoming["username"] is None or incoming["password"] is None:
		abort(400) #missing argument error

	if User.query.filter_by(username = incoming["username"]).first() is not None:
		abort(400) #existing user

	db.session.add(user)
	try:
		db.session.commit()
	except IntegrityError:
		print("User already exists");
		return jsonify(message="User with the email already exists"),409

	newuser = User.query.filter_by(email=incoming["email"]).first()
	# print("below is the user")
	# print(newuser)
	return jsonify(id = user.id, token=generate_auth_token(newuser))


@app.route('/api/get_token', methods=["POST"])
def get_token():
	incoming = request.get_json()
	user = User.verify_email_password(incoming["email"],incoming["password"])
	# print("user from get token ",user.username , user.email, user.password)
	g.user = user;
	if user:
		return jsonify(token=generate_auth_token(user))

	return jsonify(error=True),403

# def getEventList(id):
# 	event = Event.query.filter_by(user_id = id).all()
# 	if event is not None:
# 		for i in event:
# 			items = {
# 				'date' : i.date,
# 				'time':i.time,
# 				'event_detail' : i.event_detail
# 					}
		
# 	# print(items);
# 	return jsonify(event=items);


@app.route('/api/event', methods=['POST'])
def event():
	incoming = request.get_json()
	event = Event(
		date = incoming['date'],
		starttime = incoming['starttime'],
		endtime = incoming['endtime'],
		event_detail = incoming['event_detail']
		)
	# print(incoming['date'],incoming['starttime'],incoming['endtime'],incoming['event_detail']);
	user = User.query.filter_by(id = incoming['id']).first();
	event.user = user
	if incoming['date'] is None or incoming['starttime'] is None or incoming['endtime'] is None or incoming['event_detail'] is None:
		abort(400) #missing arguments

	# if Event.query.filter_by(date=incoming['date'],time=incoming['time'],event_detail = incoming["event_detail"]).first() is not None:
	# 	abort(400)

	db.session.add(event)
	try:
		db.session.commit()
	except IntegrityError:
		print("Event already exists");
		return jsonify(message="Event already exists"),409

	event = Event.query.filter_by(user_id = incoming['id']).all()
	event = sorted(event,key=itemgetter('event_id'))
	items = {}
	for i in event:
		items = {
				'date' : i.date,
				'starttime':i.starttime,
				'endtime':i.endtime,
				'event_detail' : i.event_detail
					}

	# print(items,incoming['id']);
	return jsonify(event=items);

@app.route('/api/eventList', methods=['POST'])
def eventList():
	incoming = request.get_json();
	print(incoming['id']);
	event = Event.query.filter_by(user_id = incoming['id']).all()
	user = User.query.filter_by(id= incoming['id']).first()
	user = {
		'id':user.id,
		'username':user.username
	}
	events = []
	for i in event:
		# print("FETCHING LIST")
		# print(i.date)
		# print(i.starttime)
		# print(i.endtime)
		# print(i.event_detail)
		# print(i.id)
		items={
				'date' : i.date,
				'starttime':i.starttime,
				'endtime':i.endtime,
				'event_detail' : i.event_detail,
				'event_id':i.id
					}
		events.append(items)
	# print("EVENTS",events,len(events));
	# print(items);
	return jsonify(event=events,user=user,eventCount=len(events));
	

@app.route('/api/deleteEvent',methods=["POST"])
def deleteEvent():
	incoming = request.get_json();
	print("ID OF EVENT", incoming)
	event = Event.query.filter_by(id=incoming['id']).all()
	for e in event:
		db.session.delete(e)
	try:
		db.session.commit()
	except IntegrityError:
		print("Event does not exists");
		return jsonify(message="Event does not exists"),409
	print("MESSAGE DELETD");
	return jsonify(message="Deleted");

@app.route('/api/changeEvent',methods=['POST'])
def changeEvent():
	incoming = request.get_json();
	print("iD ",incoming)
	event = Event.query.filter_by(id=incoming['id']).first()
	event.event_detail = incoming['text'];
	if incoming['date'] is not None:
		event.date = incoming['date']
	if incoming['starttime'] is not None:
		event.starttime = incoming['starttime']
	if incoming['endtime'] is not None:
		event.endtime = incoming['endtime']
		
	try:
		db.session.commit()
	except IntegrityError:
		print("EVENT could not be updated");
		return jsonify(message="Event could not be updated")
	return jsonify(message="Event updated successfully");
	