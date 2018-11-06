import simplejson
import json
from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
document = dict()

@app.route("/entries")
def entries():
    return simplejson.dumps(document)

@app.route("/add/<entryid>", methods=['POST'])
def add_entry(entryid):
    try:
        print request.json
        document[entryid] = request.json
        safe()
        state = True
    except Exception, e:
        state = False
    return simplejson.dumps({'ok': state})

@app.route("/remove/<entryid>", methods=['POST'])
def remove_entry(entryid):
    try:
        del document[entryid]
        state = True
        safe()
    except Exception, e:
        state = False
    return simplejson.dumps({'ok': state})

def safe():
    with open('data.json', 'w+') as f:
        json.dump(document, f)

if __name__ == "__main__":
    if (os.path.isfile('data.json')):
        with open('data.json') as f:
            document = json.load(f)
    CORS(app)
    app.run(host='0.0.0.0', port=5000)