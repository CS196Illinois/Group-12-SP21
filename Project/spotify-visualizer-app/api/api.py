import time
from flask import Flask, request, redirect, session, jsonify
import requests
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
import os


'''
because this is being pushed to github, if you want to run this you have to 
use environment variables. You have to set three (CLIENT_ID, CLIENT_SECRET, and SECRET_KEY).
in cmd, enter "set CLIENT_ID='client_id_from_discord'". you do the same for client_secret 
and secret key. 
'''

SPOTIPY_CLIENT_ID =os.environ.get('CLIENT_ID')
SPOTIPY_CLIENT_SECRET =os.environ.get('CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = 'http://localhost:8888/callback'
app = Flask(__name__)

app.secret_key = os.environ.get('SECRET_KEY')


@app.route('/')
def login():
	sp = spotipy.oauth2.SpotifyOAuth(
		client_id=SPOTIPY_CLIENT_ID,
		client_secret=SPOTIPY_CLIENT_SECRET,
		redirect_uri=SPOTIPY_REDIRECT_URI,
		scope="user-library-read"
		)
	auth_url = sp.get_authorize_url()
	return redirect(auth_url)

@app.route('/index')
def index():
	return '<a href="/go">Get Current Saved Tracks</a>'

@app.route('/callback')
def callback():
	sp_oauth = spotipy.oauth2.SpotifyOAuth(
		client_id=SPOTIPY_CLIENT_ID,
		client_secret=SPOTIPY_CLIENT_SECRET,
		redirect_uri=SPOTIPY_REDIRECT_URI,
		scope="user-library-read"
	)
	session.clear()
	code = request.args.get('code')
	token_info = sp_oauth.get_access_token(code)
	session["token_info"] = token_info
	return redirect('index')


def get_token(session):
	token_valid = False
	token_info = session.get("token_info", {})
	if not (session.get('token_info', False)):
		token_valid = False
		return token_info, token_valid

	if session.get('token_info').get('expires_at') - int(time.time()) < 60:
		sp = spotipy.oauth2.SpotifyOAuth(
		client_id=SPOTIPY_CLIENT_ID,
		client_secret=SPOTIPY_CLIENT_SECRET,
		redirect_uri=SPOTIPY_REDIRECT_URI,
		scope="user-library-read"
		)
		token_info = sp.refresh_access_token(session.get('token_info').get('refresh_token')) 	
	token_valid = True
	return token_info, token_valid


@app.route('/go',methods=['GET'])
def go():
	session['token_info'], authorized = get_token(session)
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
	response = sp.current_user_saved_tracks(limit=50)
	artists = []
	for item in response['items']:
		for artist in item['track']['album']['artists']:
			artists.append(artist['name'])
	return(jsonify(artists))

if __name__ == '__main__':
	app.run(host='localhost',debug=True,port=8888)