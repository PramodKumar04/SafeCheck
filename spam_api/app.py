from flask import Flask,request,jsonify
from flask_cors import CORS
import joblib
import string
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import nltk

nltk.download('stopwords')

#initialize app

app = Flask(__name__)
CORS(app)

model = joblib.load('spam_model.pkl')
vectorizer = joblib.load("tfidf_vectorizer.pkl")
stop_words= set(stopwords.words('english'))
stemmer = SnowballStemmer('english')

def preprocessor(text):
    text= text.lower()
    text =''.join(c for c in text if c not in string.punctuation)
    words = text.split()
    words = [stemmer.stem(w) for w in words if w not in stop_words]
    return ' '.join(words)

@app.route("/predict",methods=["POST"])

def predict():
    data = request.get_json()

    if "text" not in data:
        return jsonify({"error":"no text provided"}),400
    
    text = data["text"]
    clean_text = preprocessor(text)
    vector= vectorizer.transform([clean_text])

    spam_prob = model.predict_proba(vector)[0][1]*100
    label = "Spam" if spam_prob>=50 else "Ham"

    
    print("RAW TEXT LENGTH:", len(text))
    print("CLEAN TEXT LENGTH:", len(clean_text))

    return jsonify({
        "label":label,
        "spam_probability":round(spam_prob,2)
    })




if __name__=="__main__":
    app.run(host="0.0.0.0", port=5000)



