from flask import Flask, request,g, redirect, url_for, abort,render_template,jsonify,session
from .model import User,Event
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_auth_token,verify_auth_token
from flask_login import LoginManager,current_user,AnonymousUserMixin,login_required,logout_user
from operator import itemgetter
from apiclient.discovery import build_from_document, build
import httplib2
import random
from oauth2client.client import AccessTokenCredentials
from oauth2client.client import OAuth2WebServerFlow
from oauth2client import client
import webbrowser
import uuid
import argparse
from oauth2client import tools
from oauth2client.tools import run_flow
from oauth2client.file import Storage
from time import gmtime, strftime

import tzlocal  # $ pip install tzlocal
import threading
import ast
import json
from oauth2client import GOOGLE_AUTH_URI
from oauth2client import GOOGLE_REVOKE_URI
from oauth2client import GOOGLE_TOKEN_URI
from authorize import client_id, client_secret,redirect_url_path




app.config.update(dict(
	PREFERRED_URL_SCHEME = 'https'
	))

CLIENT_ID = client_id
CLIENT_SECRET = client_secret

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'



class Anonymous(AnonymousUserMixin):
	def __init__(self):
		self.username = 'Guest'

login_manager.anonymous_user = Anonymous


@app.route('/', methods=['GET'])
def index():
	print(client_id)
	print("hello worlllllllddddd")
	return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def any_path(path):
	print("ANYPATH SECTIOn")
	return render_template('index.html')

@app.route('/api/create_user', methods=["POST"])
def create_user():
	# print("VATSALYA")
	incoming = request.get_json()
	user = User(
		email = incoming["email"],
		username=incoming["username"],
		password=incoming["password"],
		sync_token="",
		auth="",

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
	session['id']=newuser.id
	return jsonify(id = user.id, token=generate_auth_token(newuser))


@app.route('/api/get_token', methods=["POST"])
def get_token():
	incoming = request.get_json()
	print(incoming["email"],incoming["password"])
	user = User.verify_email_password(incoming["email"],incoming["password"])
	print("user from get token ",user.username , user.email, user.password,user.id)
	session['id']=user.id
	print("GET Token session------",session['id'],user)
	if user:
		return jsonify(token=generate_auth_token(user))

	return jsonify(error=True),403



@app.route('/api/event', methods=['POST'])
def event():
	incoming = request.get_json()
	print("EVENT REQUEST", request,incoming['id'])
	session['id']=incoming['id']
	event = Event(
		date = incoming['date'],
		starttime = incoming['starttime'],
		endtime = incoming['endtime'],
		event_detail = incoming['event_detail'],
		from_data = 'local',
		gid=''
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

	creds=user.auth
	credentials = client.OAuth2Credentials.from_json(creds)
	http = httplib2.Http()
	http = credentials.authorize(http)
	service = build("calendar", "v3", http=http)

	print(tzlocal.get_localzone().zone)

	ebody={
		'summary':incoming['event_detail'],
		'start':{
			'dateTime':incoming['isoStarttime'],
			'timeZone':tzlocal.get_localzone().zone
		},
		'end':{
			'dateTime':incoming['isoEndtime'],
			'timeZone':tzlocal.get_localzone().zone
		}
	}

	try:
		e = service.events().insert(calendarId='primary',body=ebody,sendNotifications=True).execute()
	except error:
		print("An error occured %s",error)
		if error.resp.status == 401:
			flask.flash('Access Token expired,please click on Sync with Google account in the options');
	
	# print 'Event created: %s' % (event.get('htmlLink'))

	event = Event.query.filter_by(user_id = incoming['id']).all()
	event = sorted(event,key=itemgetter('event_id'))
	items = {}
	for i in event:
		items = {
				'date' : i.date,
				'starttime':i.starttime,
				'endtime':i.endtime,
				'event_detail' : i.event_detail,
				'from_data':i.from_data
					}

	page_token=None
	while True:
		events = service.events().list(calendarId='primary', pageToken=page_token).execute()
		user = User.query.filter_by(id=session['id']).first()
		eventDb = Event.query.filter_by(user_id = 6).all()

		for event in events['items']:
			for item in eventDb:
				if 'date' in event['start']:
					if item.event_detail == event['summary'] and item.date == event['start']['date'][:10] and item.gid != event['id']:

						item.gid = event['id']
						db.session.commit()
				else:
					if item.event_detail == event['summary'] and item.date == event['start']['dateTime'][:10] and item.gid != event['id']:
						item.gid = event['id']
						db.session.commit()

		page_token = events.get('nextPageToken')
		k = events.get('nextSyncToken')
		print("SYNC TOKEN",k)
		user.sync_token=k
		db.session.commit()
		if not page_token:
			break

	return jsonify(event=items);

@app.route('/api/eventList', methods=['POST'])
def eventList():
	print("'"+redirect_url_path+"oauth2callback"+"'")
	incoming = request.get_json();
	session["id"] = incoming["id"]
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
				'event_id':i.id,
				'from_data':i.from_data
					}
		events.append(items)
	# print("EVENTS",events,len(events));
	# print(items);
	return jsonify(event=events,user=user);
	

@app.route('/api/deleteEvent',methods=["POST"])
def deleteEvent():
	incoming = request.get_json();
	session['id']=incoming['user_id']
	event = Event.query.filter_by(id=incoming['id']).all()
	user=User.query.filter_by(id=session['id']).first()
	creds=user.auth
	credentials = client.OAuth2Credentials.from_json(creds)
	# credentials=AccessTokenCredentials(credentials, 'user-agent-value');
	http = httplib2.Http()
	http = credentials.authorize(http)
	service = build("calendar", "v3", http=http)
	for s in event:
		eventId = s.gid
		# if user.sync_token:
		# 	service.events().delete(calendarId='primary',eventId=eventId,sendNotifications=True,syncToken=user.sync_token).execute()
		# else:
		try:
			service.events().delete(calendarId='primary',eventId=eventId,sendNotifications=True).execute()
		except:
			pass

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
	# print("iD ",incoming)
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
	

@app.route('/api/syncAccount',methods=['GET','POST'])
def syncAccount():
	# if session['credentials'] is None:
	incoming = request.get_json();
	# session['id']=incoming['id']
	flow = client.flow_from_clientsecrets(
			'/home/vatsalya/Documents/login/cal/application/client_secret.json',
    		scope='https://www.googleapis.com/auth/calendar',
    		redirect_uri=redirect_url_path+"oauth2callback")
	flow.params['access_type'] = 'offline'
	flow.params['include_granted_scopes'] ="true"
	flow.params['approval_prompt']="force"
  	auth_uri = flow.step1_get_authorize_url()
  	return webbrowser.open_new_tab(auth_uri)



@app.route('/oauth2callback')
def oauth2callback():
  print("STEP - 1")
  code = request.args.get('code')
  print("code",code)
  if code:
  	flow = client.flow_from_clientsecrets(
			'/home/vatsalya/Documents/login/cal/application/client_secret.json',
    		scope='https://www.googleapis.com/auth/calendar',
    		redirect_uri=redirect_url_path+"oauth2callback")
	flow.params['access_type'] = 'offline'
	flow.params['include_granted_scopes'] ="true"
	flow.params['approval_prompt']="force"
  	request.base_url = request.base_url.replace('http://','https://')
  	flow.redirect_uri = request.base_url
  	print request
  	print request.base_url
  	print flow.redirect_uri
  	try:
  		credentials = flow.step2_exchange(code)
  	except Exception as e:
  		print "Unable to get an access token because ", e.message

 #  	print(credentials.access_token,
 #  		AccessTokenCredentials(credentials.access_token, 'user-agent-value').authorize(httplib2.Http()))
	# print(session)
	user = User.query.filter_by(id=session.get('id',None)).first()
	user.auth = credentials.to_json()
	db.session.commit()

  return redirect(url_for('index_api'))


@app.route('/index_api')
def index_api():
	print("IN INDEX /...")
	user = User.query.filter_by(id=session['id']).first()
	creds = user.auth
	credentials = client.OAuth2Credentials.from_json(creds)
	if credentials.access_token_expired:
		return redirect(url_for('syncAccount'))

	http = httplib2.Http()
	# credentials.refresh(http)
	http = credentials.authorize(http)
	print("adkjflsdkjfl HTTP",http)
	service = build("calendar", "v3", http=http)
	print("kkkkkkk")
	body={
		    'id': str(uuid.uuid1()),
		    'type': 'web_hook',
		    'address':redirect_url_path+"notifications",
		    'params':{
		      'ttl': 864000
		    		}
		  	}

	print("zzzzzzzzzzzz")
	# while True:
	# 	page_token = None
	# 	calendar_list = service.calendarList().list(pageToken=page_token).execute()
	# 	for calendar_list_entry in calendar_list['items']:
	# 		print "SYNC TOKEN"
	# 		print calendar_list_entry
	# 	print calendar_list.get('nextSyncToken')
	# 	page_token = calendar_list.get('nextPageToken')
	# 	if not page_token:
	# 		break

	if user.sync_token is None:
		calendar_Watch = service.events().watch(calendarId='primary',body=body).execute()
		print calendar_Watch.get('nextSyncToken')

	else:
		calendar_Watch = service.events().watch(calendarId='primary',body=body).execute()
		print calendar_Watch.get('nextSyncToken')

	try:
		page_token = None
		
		while True:
			if user.sync_token :
				events = service.events().list(calendarId='primary', 
					pageToken=page_token, syncToken=user.sync_token).execute()

			else:
				events = service.events().list(calendarId='primary', pageToken=page_token).execute()

			user = User.query.filter_by(id=session['id']).first()
			eventDb = Event.query.filter_by(user_id = session['id']).all()
			
			if len(eventDb):
				events_ids = [item['id'] for item in events['items']]
				eventDb_ids=[item.gid for item in eventDb]
				filtered_ids = []
				for id_ in events_ids:
 					if id_ not in eventDb_ids:
						filtered_ids.append(id_)

				filtered_events = []
				for event in events['items']:
					print event
					if event['id'] in filtered_ids:
						if 'date' in event['start']:
							eventAdd = Event(
								date=event['start']['date'][:10],
								starttime=event['start']['date'][11:][:5],
								endtime=event['end']['date'][11:][:5],
								event_detail=event['summary'],
								from_data='event',
								gid=event['id']
								)
							eventAdd.user = user
							db.session.add(eventAdd)
							db.session.commit()

						else:
							eventAdd = Event(
								date=event['start']['dateTime'][:10],
								starttime=event['start']['dateTime'][11:][:5],
								endtime=event['end']['dateTime'][11:][:5],
								event_detail=event['summary'],
								from_data='event',
								gid=event['id']
								)
							eventAdd.user = user
							db.session.add(eventAdd)
							db.session.commit()


				for event in events['items']:
					for item in eventDb:
						if 'date' in event['start']:
							if item.event_detail == event['summary'] and item.date == event['start']['date'] and item.gid != event['id']:
								item.gid = event['id']
								db.session.commit()
						else:
							if item.event_detail == event['summary'] and item.date == event['start']['dateTime'] and item.gid != event['id']:
								item.gid = event['id']
								db.session.commit()
			

			else:
				for event in events['items']:
					if 'date' in event['start']:
						print(7)
						eventAdd = Event(
									date=event['start']['date'][:10],
									starttime=event['start']['date'][11:][:5],
									endtime=event['end']['date'][11:][:5],
									event_detail=event['summary'],
									from_data='event',
									gid=event['id']
									)
						eventAdd.user = user
						db.session.add(eventAdd)
						db.session.commit()

					else:
						print(8)
						eventAdd = Event(
								date=event['start']['dateTime'][:10],
								starttime=event['start']['dateTime'][11:][:5],
								endtime=event['end']['dateTime'][11:][:5],
								event_detail=event['summary'],
								from_data='event',
								gid=event['id']
								)
						eventAdd.user = user
						db.session.add(eventAdd)
						db.session.commit()			

			page_token = events.get('nextPageToken')
			k = events.get('nextSyncToken')
			print("SYNC TOKEN",k)
			user.sync_token=k
			db.session.commit()
			if not page_token:
				break
	except client.AccessTokenRefreshError:
  		print('The credentials have been revoked or expired, please re-run'
         	   'the application to re-authorize.')
  	print(redirect_url_path+'/monthview')
	return redirect(redirect_url_path+'monthview')


@app.route('/api/data',methods=['GET'])
def dataToUi():
	print("IN the backend interval")
	user = User.query.filter_by(id=session['id']).first()
	eventDb = Event.query.filter_by(user_id = session['id']).all()
	eventDb_ids=[item.id for item in eventDb]
	incoming=request.get_json()
	filtered_ids = [d.id for d in incoming]
	eventId=[]
	filtered_eventDb=[]
	for _id in eventDb_ids:
		if _id not in filtered_ids:
			eventId.append(_id)

	for event in eventDb:
		for ids in eventId:
			if event.id == ids:
				filtered_eventDb.append(event)

	for a in filtered_eventDb:
		print a.event_detail
		print a.date[:4]
		print a.date[5:][:2]

	data = []
	for i in events:
		items={
				'date' : i.date,
				'starttime':i.starttime,
				'endtime':i.endtime,
				'event_detail' : i.event_detail,
				'event_id':i.id,
				'from_data':i.from_data
					}
		data.append(items)
	print("EVENTS",data,len(data));
	# print(items);
	return jsonify(event=data);



def dataFetch():
	print("SESSION from index..>>>>>",session)
	print("IN INDEX /...")
	user = User.query.filter_by(id=session['id']).first()
	# print(user)
	creds = user.auth
	# print(creds)
	# print("from crendentails users....", creds.access_token)
	credentials = client.OAuth2Credentials.from_json(creds)
	# print(credentials)
	if credentials.access_token_expired:
		print("***************")
		gdata = json.loads(creds)
  		for x,value in gdata.items():
  			if x == "refresh_token":
  				refreshT = value
  				break
		credentials = client.OAuth2Credentials(
			None,CLIENT_ID,
			CLIENT_SECRET,
			refreshT,
			None,
			GOOGLE_TOKEN_URI,
			None,
			revoke_uri=GOOGLE_REVOKE_URI,
			id_token=None,
			token_response=None)
		print credentials
  	

	http = httplib2.Http()
	# credentials.refresh(http)
	http = credentials.authorize(http)
	print("adkjflsdkjfl HTTP",http)
	service = build("calendar", "v3", http=http)

	
	print("zzzzzzzzzzzz")

	try:
		page_token = None
		
		while True:
			if user.sync_token :
				events = service.events().list(calendarId='primary', 
					pageToken=page_token, syncToken=user.sync_token).execute()

			else:
				events = service.events().list(calendarId='primary', pageToken=page_token).execute()

			user = User.query.filter_by(id=session['id']).first()
			eventDb = Event.query.filter_by(user_id = 6).all()
			
			if len(eventDb):
				events_ids = [item['id'] for item in events['items']]
				eventDb_ids=[item.gid for item in eventDb]
				filtered_ids = []
				# print events_ids
				for id_ in events_ids:
 					if id_ not in eventDb_ids:
						filtered_ids.append(id_)

				filtered_events = []
				# print("ids",filtered_ids)
				for event in events['items']:
					for item in eventDb:
						print(event['id'],item.gid)
						if event['id'] == item.gid:
							event_delete= Event.query.filter_by(gid=event['id']).all()
							for e in event_delete:
								db.session.delete(e)
							try:
								db.session.commit()
							except IntegrityError:
								print("Event does not exists");
								return jsonify(message="Event does not exists"),409
													


				for event in events['items']:
					print event
					for d,val in event.items():
						if d == 'start':
							filtered_events.append(event['id'])

				print("filtered events===== ",filtered_events)
				for event in events['items']:
					if event['id'] in filtered_events:
						for data,data_val in event['start'].items():
							print(data,data_val)
							if data == 'date':
								eventAdd = Event(
									date=event['start']['date'][:10],
									starttime=event['start']['date'][11:][:5],
									endtime=event['end']['date'][11:][:5],
									event_detail=event['summary'],
									from_data='event',
									gid=event['id']
									)
								eventAdd.user = user
								db.session.add(eventAdd)
								db.session.commit()

							else:
								eventAdd = Event(
									date=event['start']['dateTime'][:10],
									starttime=event['start']['dateTime'][11:][:5],
									endtime=event['end']['dateTime'][11:][:5],
									event_detail=event['summary'],
									from_data='event',
									gid=event['id']
									)
								eventAdd.user = user
								db.session.add(eventAdd)
								db.session.commit()


				for event in events['items']:
					for item in eventDb:
						for d,val in event.items():
							if d == 'start':
								for data,data_val in event['start'].items():
									# print(data,data_val)
									if data == 'date':
										if item.event_detail == event['summary'] and item.date == event['start']['date'] and item.gid != event['id']:
											item.gid = event['id']
											db.session.commit()
									else:
										if item.event_detail == event['summary'] and item.date == event['start']['dateTime'] and item.gid != event['id']:
											item.gid = event['id']
											db.session.commit()
			

			else:
				for event in events['items']:
					for data,data_val in event['start'].items():
						print(data,data_val)
						if data == 'date':
							print(7)
							eventAdd = Event(
										date=event['start']['date'][:10],
										starttime=event['start']['date'][11:][:5],
										endtime=event['end']['date'][11:][:5],
										event_detail=event['summary'],
										from_data='event',
										gid=event['id']
										)
							eventAdd.user = user
							db.session.add(eventAdd)
							db.session.commit()

						else:
							print(8)
							eventAdd = Event(
									date=event['start']['dateTime'][:10],
									starttime=event['start']['dateTime'][11:][:5],
									endtime=event['end']['dateTime'][11:][:5],
									event_detail=event['summary'],
									from_data='event',
									gid=event['id']
									)
							eventAdd.user = user
							db.session.add(eventAdd)
							db.session.commit()			

			page_token = events.get('nextPageToken')
			k = events.get('nextSyncToken')
			print("SYNC TOKEN",k)
			user.sync_token=k
			db.session.commit()
			if not page_token:
				break
	except client.AccessTokenRefreshError:
  		print('The credentials have been revoked or expired, please re-run'
         	   'the application to re-authorize.')

	return redirect('/monthview')

@app.route('/notifications',methods=['POST'])
def calNotification():
	incoming = request.data
	print(session)
	print("INCOMING DATA FROM WATCH:",incoming,request.get_json(),request)
	return dataFetch();


@app.route('/signout',methods=['POST','GET'])
def signout():
	print(session)
	session.clear()
  	# session['message'] = "You have logged out"
  	# return render_template("index.html")
  	logout_user()
  	return redirect(url_for('index'))


@app.route('/googleace8c75543caa5ec.html')
def googleVerification():
	return render_template("googleace8c75543caa5ec.html")

  