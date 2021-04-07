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
 results=[]
 df=[]
 model1 = TFBertForSequenceClassification.from_pretrained('results/tokenizer/')
 tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
 tf_batch = tokenizer(preprocessedSearchedTweets, max_length=128, padding=True, truncation=True, return_tensors='tf') 
 tf_outputs = model1(tf_batch)                                  
 tf_predictions = tf.nn.softmax(tf_outputs[0], axis=-1)      
 labels = ['Negative','Positive']
 label = tf.argmax(tf_predictions, axis=1)
 label = label.numpy()
 labeledTweets={}
 for i in range(len(preprocessedSearchedTweets)):
  results.append(round(tf_predictions[i][0].numpy().tolist(),2))
  labeledTweets[preprocessedSearchedTweets[i]]=labels[label[i]];
 tuples=list(zip(preprocessedSearchedTweets,results))
 df = pd.DataFrame(tuples, columns=['Tweet','results'])
 print(df)

#  array=np.array(results).tolist()
 #polarityToJson(df)
 print(labeledTweets)
 polarityvals=df.values.tolist();
 jsonData={"labeledTweets":[labeledTweets],
           "results":[polarityvals]}
 print(jsonData)
 return jsonData

# def polarityToJson(polarityValues):
#   out=polarityValues.to_json(orient='records')
#   with open('C:\\Users\\Admin\\Desktop\\an 3\\DemoSC\\demo_sc\\frontend\\src\\polarityValues.json', 'w') as f:
#    f.seek(0) 
#    f.write(out)
#    f.truncate()
#   return 

