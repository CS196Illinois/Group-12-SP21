import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}
