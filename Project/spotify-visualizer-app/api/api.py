import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/login')
def login():
    client_id = app.config['CLIENT_ID']
    redirect_uri = app.config['REDIRECT_URI']
    scope = app.config['SCOPE']

    state_key = createStateKey(15)
    session['state_key'] = state_key

    login_url = 'https://accounts.spotify.com/en/authorize?'
    params = {'response_type': 'code', 'client_id': client_id, 'redirect_uri': redirect_uri, 'scope': scope, 'state': state_key}
    query_params = urlencode(params)
    return make_response(redirect(authorize_url + query_params))

def getToken(code):
  token_url = 'https://accounts.spotify.com/api/token'
  authorization = app.config['AUTHORIZATION']
  redirect_uri = app.config['REDIRECT_URI']
  headers = {'Authorization': authorization, 
             'Accept': 'application/json', 
             'Content-Type': 'application/x-www-form-urlencoded'}
  body = {'code': code, 'redirect_uri': redirect_uri, 
          'grant_type': 'authorization_code'}
  post_response = requests.post(token_url,headers=headers,data=body)
  if post_response.status_code == 200:
    pr = post_response.json()
    return pr['access_token'], pr['refresh_token'], pr['expires_in']
  else:
    logging.error('getToken:' + str(post_response.status_code))
    return None
