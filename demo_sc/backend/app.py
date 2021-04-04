from flask import Flask, jsonify
from flask import request
from API import APIcall
from API import Preprocess
from API import SA 
from flask_cors import CORS, cross_origin
app = Flask(__name__)


@app.route('/result', methods = ['POST'])
def result():
  keyword = request.json['keyword']
  print(keyword)
  newSet=APIcall.creatingTestSet(keyword)
  print(newSet)
  preprocessedSearchedTweets=Preprocess.processTweets(newSet)
  print(preprocessedSearchedTweets)
  labeledTweets=SA.loadModel(preprocessedSearchedTweets)
  return labeledTweets
