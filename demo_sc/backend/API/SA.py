import pandas as pd
import re
import string
import time
import json
import numpy as np
from transformers import BertTokenizer, TFBertForSequenceClassification
from tensorflow.keras.backend import clear_session
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras import backend as K
import tensorflow as tf

def loadModel(preprocessedSearchedTweets):
 model1 = TFBertForSequenceClassification.from_pretrained('results/tokenizer/')
 tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
 tf_batch = tokenizer(preprocessedSearchedTweets, max_length=128, padding=True, truncation=True, return_tensors='tf') 
 tf_outputs = model1(tf_batch)                                  
 tf_predictions = tf.nn.softmax(tf_outputs[0], axis=-1)      
 labels = ['Negative','Positive']
 label = tf.argmax(tf_predictions, axis=1)
 label = label.numpy()
 results=[]
 labeledTweets={}
 for i in range(len(preprocessedSearchedTweets)):
#   print(tf_predictions[i][0])
  results.append(tf_predictions[i][0])
  labeledTweets[preprocessedSearchedTweets[i]]=labels[label[i]];
#   print(preprocessedSearchedTweets[i], ": ", labels[label[i]])
 df = pd.DataFrame(results, columns=['results'])
#  wordsInTweets = [tweet.split() for tweet in preprocessedSearchedTweets]
#  wordsInTweets = list(itertools.chain(*wordsInTweets))
#  counter = collections.Counter(wordsInTweets)
 print(labeledTweets)
#  jsonStr = json.dumps(labeledTweets)
 return labeledTweets