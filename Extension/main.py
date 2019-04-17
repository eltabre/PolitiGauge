from flask import Flask, request
import requests
import justext

app = Flask(__name__)

@app.route("/")
def hello():
    return "Welcome to Python Flask!"


def runModel(text):
    return text;
    # return "30"

@app.route("/getBias")
def getBias():
    url = request.args.get('url') #if key doesn't exist, returns None
    response = requests.get(url)
    paragraphs = justext.justext(response.content, justext.get_stoplist("English"))
    str = ''
    for paragraph in paragraphs:
      if not paragraph.is_boilerplate:
          str += ("\n" + paragraph.text)
    return runModel(str)

if __name__ == "__main__":
    app.run(debug=True)
