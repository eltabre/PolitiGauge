import pickle
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from textblob import Word
from nltk.corpus import stopwords
import nltk
import numpy as np
from keras.models import load_model
import string



with open ('listfile', 'rb') as fp:
    vocab_to_int = pickle.load(fp)
model = load_model('model_bestModel_1.h5')

def lemmat(dataList):
    for i in range(len(dataList)):
        dataList[i] = " ".join([Word(word).lemmatize() for word in dataList[i].split()])
    return dataList

def cleanList(dataList):
    newList = []
    #lowercase
    newList = [x.lower() for x in dataList]
    #removes punctuations
    newList = [s.translate(str.maketrans('', '', string.punctuation)) for s in  newList]
    #removes stop words
    stop = stopwords.words('english')
    for i in range(0, len(newList)):
        newList[i] = " ".join(x for x in newList[i].split() if x not in stop)
    newList = lemmat(newList)
    return newList



def helper_convert_to_int(lst, sequenceLength):
    intList = []
    for each in lst:
        tempList = []
        if each != "":
            for word in each.split():
                if word in vocab_to_int:
                    tempList.append(vocab_to_int[word])
                else:
                    tempList.append(0)
            intList.append(tempList)


    npList = np.zeros((len(intList), sequenceLength), dtype=int)
    for i, row in enumerate(intList):
        npList[i, -len(row):] = np.array(row)[:sequenceLength]
    return npList

def predictModel(lst, sequenceLength):
    lst = cleanList(lst)
    conversion = helper_convert_to_int(lst, sequenceLength)
    predict = model.predict(conversion)
    prediction = []
    for item in predict:
        if item[0] < -.333:
            prediction.append(-1)
        elif item[0] > .333:
            prediction.append(1)
        else:
            prediction.append(0)
    return prediction
