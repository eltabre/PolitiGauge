from flask import Flask, request
from flask_cors import CORS
import requests, json
import justext
import RNN
# from newsplease import NewsPlease   # can use newsplease for author/title data

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Welcome to Python Flask!"


#Taber
def runModel(vector):
    return 0

#Yoseph
def runRNN(text):

    prediction = RNN.predictModel(text, 50)
    return prediction
    # return "30"

@app.route("/getBias")
def getBias():
    url = request.args.get('url') #if key doesn't exist, returns None

    # get org data
    url_obj = requests.urllib3.util.parse_url(url)
    baseURL = url_obj.host
    path = url_obj.path
    if (path.startswith("/opinion")):
        baseURL = baseURL + "/opinion"

    with open('AllSidesFinal.json') as f:
        allSidesData = json.load(f)
    with open('MBFCFinal.json') as m:
        MBFCData = json.load(m)

    allSidesBias = 'none'
    MBFCBias = 'none'
    bias = 'none'
    allSidesFlag = True
    MBFCFlag = True

    try:
        allSidesBias = allSidesData["bias"][baseURL]
        allSidesConfidence = allSidesData["confidence"][baseURL]
        allSidesReaderAgreeRatio = allSidesData["agree_ratio"][baseURL]
    except KeyError as e:
        print('Not found in allsides')
        allSidesFlag = False

    try:
        MBFCBias = MBFCData["bias"][baseURL]
    except KeyError as e:
        print('Not found in MBFC')
        MBFCFlag = False


    # Decision Algorithm
    bias = allSidesBias
    if (allSidesFlag is False):
        bias = MBFCBias
        if (MBFCFlag is False):
            bias = 'none'
    elif (MBFCFlag and MBFCBias != allSidesBias):  # Discrepancy
        if (allSidesConfidence == "Not Available" or float(allSidesReaderAgreeRatio) < 0.66):
            bias = MBFCBias


    #get main text
    response = requests.get(url)
    paragraphs = justext.justext(response.content, justext.get_stoplist("English"))
    str = ''
    for paragraph in paragraphs:
      if not paragraph.is_boilerplate:
          str += ("\n" + paragraph.text)

    # Weighted-sum algorithm with RNN and Model ratings
    adjustment = runRNN(str)
    if (bias == 'none'):    # Not found on MBFC or AllSides
        bias = adjustment * (10/3)
    else:
        # bias += adjustment
        # if(bias > 100):
        #    bias = 100
        # else if(bias < -100):
        #    bias = -100


    response = {}
    response['text'] = str
    response['orgBias'] = bias
    response['baseURL'] = baseURL
    json_data = json.dumps(response)

    return json_data

if __name__ == "__main__":
    app.run(host="0.0.0.0",port="80")
