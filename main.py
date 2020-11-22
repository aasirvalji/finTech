from serpapi import GoogleSearch
from flask import Flask
import json
import twilio
import os
from twilio.rest import Client
from flask_cors import CORS
import requests
from PIL import Image, ImageOps, ImageFilter, ImageEnhance, ImageStat
import pytesseract
import re
import cv2
from flask import request

account_sid = os.environ("ACCOUNT_SID")
auth_token = os.environ("AUTH_TOKEN")
client = Client(account_sid, auth_token)


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return "Hello world"


def brightness( image ):
   stat = ImageStat.Stat(image)
   return stat.rms[0]


def ocr(image):
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract'
    im = Image.open(image)

    #enhancer = ImageEnhance.Sharpness(im)
    #im = enhancer.enhance(1.3)
    enhancer = ImageEnhance.Brightness(im)
    im = enhancer.enhance(1.5)

    thresh = 150
    fn = lambda x: 255 if x > thresh else 0
    im = im.convert('L').point(fn, mode='1')
    val = brightness(im)
    print(230/val)

    length_x, width_y = im.size
    factor = min(1, float(1024.0 / length_x))
    size = int(factor * length_x), int(factor * width_y)
    im = im.resize(size, Image.ANTIALIAS)

    if im.width > im.height:
        im = im.rotate(270)

    im = im.filter(ImageFilter.SHARPEN)

    im2 = im.save("test1.jpg")

    total = pytesseract.image_to_string(im)
    match = re.search(r'\bTOTAL.*\d+\.\d+|\bTotal.*\d+\.\d+', total)
    if match == None:
        print("Receipt could not be read")
    else:
        rest = total[match.start()+6:]
        itemMatch = re.search(r'\bTOTAL|\bTotal', total[:match.start()])
        if itemMatch == None:
            itemMatch = re.search(r'PM|AM', total[:match.start()])
        items = total[itemMatch.start()+6:match.start()]
        finalPrice = float(re.search(r'\d+\.\d+', rest).group())
    #print(finalPrice+ " \n"+items)
    
    return [items,finalPrice]
    

def generateLinks(age,gender,student,salary,city,state,country):
    links = {}

    toSearch = ""
    
    state = "ontario"

    if gender == "M" or gender == "F":
        toSearch = toSearch + gender + " "
    else:
        toSearch = toSearch + "LGBTQ "

    toSearch = toSearch + "scholarship "

    if student == 'true':
        toSearch = toSearch + "student "

    if salary < 48535:
        toSearch = toSearch + "low income "
    elif salary < 97069:
        toSearch = toSearch + "middle income "

    toSearch = toSearch + country

    search = GoogleSearch({"q": toSearch, "location": city+','+state, "api_key": "157a826ffcd18b1592accedc793f1059857ee66c91b004dfd295b6a9b28cadfc"})
    results = search.get_dict()
    print("-------------------------")
    organic_results = results['organic_results']
    link = "searchLink: " + results['search_metadata']['google_url']

    print("\n\n" + link)
    count = 1
    finalString = ""
    for x in organic_results[:3]:
        finalString = finalString + x["link"] + ","
        count += 1

    return finalString

@app.route('/getlinks', methods=['POST'])
def sendLinks():
    data = request.data
    dataDict = json.loads(data)
    age = int(dataDict["age"])
    gender = dataDict["gender"]
    student = dataDict["student"]
    salary = int(dataDict["salary"])
    city = dataDict["city"]
    state = dataDict["state"]
    country = dataDict["country"]

    print(request.data)
    
    d = generateLinks(age,gender,student,salary,city,state,country)
    return d

@app.route('/sendnotif')
def sendText():
    number = os.environ("TO_NUMBER")
    message = client.messages \
        .create(
        body="You are reaching your spending limit for Food and Drinks" ,
        from_=os.environ("FROM_NUMBER"),
        to=number
    )

    return "Sent message to "+number

def determineCategory(text_content):
    from google.cloud import language_v1

    client = language_v1.LanguageServiceClient()

    # Available types: PLAIN_TEXT, HTML
    type_ = language_v1.Document.Type.PLAIN_TEXT

    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    response = client.classify_text(request={'document': document})

    categories = []
    # Loop through classified categories returned from the API
    for category in response.categories:
        # Get the name of the category representing the document.
        # See the predefined taxonomy of categories:
        # https://cloud.google.com/natural-language/docs/categories
        print(u"Category name: {}".format(category.name))
        # Get the confidence. Number representing how certain the classifier
        # is that this category represents the provided text.
        print(u"Confidence: {}".format(category.confidence))
        categories.append(category.name)

    return categories[0]

@app.route('/image', methods=['POST'])
def getImage():
    link = request.data
    linkdict = json.loads(link)
    url = linkdict["imgUrl"]
    print("\n---------\n" + url + "\n----------\n")
    parsedText = ocr(url)
    category = determineCategory(parsedText[0])
    final = [parsedText[0],parsedText[1],category]
    return final

