import time
from flask import Flask, request, redirect, session, jsonify, make_response
import requests
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import unidecode

'''
because this is being pushed to github, if you want to run this you have to 
use environment variables. You have to set three (CLIENT_ID, CLIENT_SECRET, and SECRET_KEY).
in cmd, enter "set CLIENT_ID='client_id_from_discord'". you do the same for client_secret 
and secret key. 
'''
'''
set CLIENT_ID='9f051e6b07e8444d8653a608d2d28d91'
set CLIENT_SECRET='95f78cbfa84f4275b0f08cc18230a9d6'
set SECRET_KEY='\xc4d\r\x84`\x83z]\x19))F\x04\xe8\x8do\x14\xed\xf8|\xf7\xac31'
'''
SPOTIPY_CLIENT_ID='9f051e6b07e8444d8653a608d2d28d91'
SPOTIPY_CLIENT_SECRET='95f78cbfa84f4275b0f08cc18230a9d6'
SPOTIPY_REDIRECT_URI = 'http://localhost:5000/callback'
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = '\xc4d\r\x84`\x83z]\x19))F\x04\xe8\x8do\x14\xed\xf8|\xf7\xac31'
scopes = "user-read-private user-top-read user-library-read user-read-recently-played user-follow-modify"

@app.route('/')
def login():
	sp = spotipy.oauth2.SpotifyOAuth(
		client_id=SPOTIPY_CLIENT_ID,
		client_secret=SPOTIPY_CLIENT_SECRET,
		redirect_uri=SPOTIPY_REDIRECT_URI,
		scope= scopes
		)
	auth_url = sp.get_authorize_url()
	return redirect(auth_url)
@app.route('/index')
def index():
	buttons = '<a href="/api/get_recently_added_artists">get_recently_added_artists</a><br>'+'<a href="/api/get_recently_played">get_recently_played</a><br>'+'<a href="/api/get_top_artists">get_top_artists</a><br>'+'<a href="/api/get_top_tracks">get_top_tracks</a>'  
	return buttons

@app.route('/api/logout')
def logout():
	session.clear()
	return '<h3> Logged Out </h3>'


@app.route('/callback')
def callback():
	sp_oauth = spotipy.oauth2.SpotifyOAuth(
		client_id=SPOTIPY_CLIENT_ID,
		client_secret=SPOTIPY_CLIENT_SECRET,
		redirect_uri=SPOTIPY_REDIRECT_URI,
		scope=scopes
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
		scope=scopes
		)
		token_info = sp.refresh_access_token(session.get('token_info').get('refresh_token')) 	
	token_valid = True
	return token_info, token_valid

@app.route('/api/get_recently_added_artists',methods=['GET', 'POST'])
def get_top():
	session['token_info'], authorized = get_token(session)
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
	response = sp.current_user_saved_tracks(limit=50)
	artists = []
	freq = {}
	for item in response['items']:
		for artist in item['track']['album']['artists']:
			artists.append(unidecode.unidecode(artist['name']))
	for artist in artists:
		freq[artist] = artists.count(artist)
	freq = dict(sorted(freq.items(), key=lambda item: item[1]))
	data,labels = [],[]
	for point in freq:
		data.append(freq[point])
		labels.append(point)
	return {'data': data},{'labels': labels}

@app.route('/api/get_recently_played',methods=['GET', 'POST'])
def get_recent():
	session['token_info'], authorized = get_token(session)
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
	response = sp.current_user_recently_played()
	played = []
	freq = {}
	for item in response['items']: 
		for artist in item['track']['album']['artists']:
			played.append(unidecode.unidecode(artist['name']))
	for artist in played:
		freq[artist] = played.count(artist)
	freq2 = dict(sorted(freq.items(), key=lambda item: item[1]))
	return(freq2)

@app.route('/api/get_top_tracks',methods=['GET', 'POST'])
def get_tracks():
	session['token_info'], authorized = get_token(session)
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
	response = sp.current_user_top_tracks(limit=50,time_range='medium_term')
	top_tracks = []
	tracks_popularity = []
	for item in response['items']:
		top_tracks.append(item['album']['name'])
		tracks_popularity.append(item['popularity'])
	return dict(zip(top_tracks, tracks_popularity))


@app.route('/api/get_top_artists',methods=['GET', 'POST'])
def get_followed():
	session['token_info'], authorized = get_token(session)
	session.modified = True
	if not authorized:
		return redirect('/')
	sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
	response = sp.current_user_top_artists(limit=100,time_range='medium_term')
	data = []
	vals = []

	freq = []
	for item in response['items']:
		name = item['name']
		pop = item['popularity']
		freq.append({'popularity': pop, 'name': name})
	freq = sorted(freq, key = lambda i: i['popularity'])


	for item in freq:
		data.append(item['popularity'])
		vals.append(item['name'])

	freq = {k:v for k,v in zip(vals,data)}
	return freq

if __name__ == '__main__':
	app.run(port=5000,debug=True)