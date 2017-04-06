from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from index import app

def generate_auth_token(self,expiration = 600):
	s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
	token = s.dumps({
    'id': self.id,
    'email': self.email,
    'username':self.username,
    }).decode('utf-8')
   	return token

def verify_auth_token(token):
	s = Serializer(app.config['SECRET_KEY'])
	try:
		data=s.loads(token)
	except SignatureExpired:
		return None #valid token but expired
	except BadSignature:
		return None #invalid token

	user = User.query.get(data['id'])
	return user