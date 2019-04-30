from flask import Flask, request
import requests, json
import justext
# from newsplease import NewsPlease   # can use newsplease for author/title data

app = Flask(__name__)

@app.route("/")
def hello():
    return "Welcome to Python Flask!"


def runModel(resp):
    return resp;
    # return "30"

@app.route("/getBias")
def getBias():
    url = request.args.get('url') #if key doesn't exist, returns None

    # get org data
    url_obj = requests.urllib3.util.parse_url(url)
    baseURL = url_obj.host
    with open('AllSidesFinal.json') as f:
        data = json.load(f)

    bias = data["bias"][baseURL]

    #get main text
    response = requests.get(url)
    paragraphs = justext.justext(response.content, justext.get_stoplist("English"))
    str = ''
    for paragraph in paragraphs:
      if not paragraph.is_boilerplate:
          str += ("\n" + paragraph.text)



    response = {}
    response['text'] = str
    response['orgBias'] = bias
    response['baseURL'] = baseURL
    json_data = json.dumps(response)

    return runModel(json_data)

    # response = NewsPlease.from_url(url)
    # return response.text

if __name__ == "__main__":
    app.run(debug=True)
