
# SafeCheck – AI Spam Detector (Chrome Extension)

SafeCheck is an **AI-powered Chrome extension** that automatically detects spam emails in **Gmail** using **machine learning and natural language processing (NLP)**.
It analyzes email content in real time and displays a **spam probability score with a visual risk indicator**, helping users quickly assess message safety.

---

## 🚀 Features

* 📧 **Automatic Gmail Email Reading**
  Analyzes the currently opened email without manual copy–paste.

* 🤖 **Machine Learning–Based Detection**
  Uses NLP with TF-IDF and trained classifiers (Logistic Regression / Naive Bayes).

* 📊 **Spam Probability (%)**
  Shows how likely an email is spam instead of only a binary label.

* 📈 **Visual Risk Meter**
  Color-coded progress bar:

  * 🟢 Safe
  * 🟡 Suspicious
  * 🔴 Spam

* ☁️ **Cloud-Deployed Backend**
  Flask API deployed on Render for global accessibility.

* 🔒 **Privacy-First Design**
  Emails are analyzed only on user request and are **not stored**.

---

## 🧠 System Architecture

```
Chrome Extension (Popup + Content Script)
        ↓
Gmail Web Interface (DOM Extraction)
        ↓
Flask Backend API (Render)
        ↓
ML Model (TF-IDF + Classifier)
        ↓
Spam Probability & Label
```

---

## 🛠️ Tech Stack

### Frontend (Chrome Extension)

* HTML, CSS, JavaScript
* Chrome Extension Manifest V3
* Content Scripts for Gmail DOM access

### Backend

* Python
* Flask + Flask-CORS
* Gunicorn (production server)

### Machine Learning

* scikit-learn
* TF-IDF Vectorization
* Logistic Regression / Naive Bayes
* NLTK (text preprocessing)

### Deployment

* Render (Cloud Hosting)
* GitHub (Version Control)

---


## ⚙️ How It Works

1. User opens an email in Gmail
2. Clicks **SafeCheck → Check Spam**
3. Extension extracts visible email text securely
4. Text is sent to the deployed Flask API
5. ML model predicts spam probability
6. Result is shown with a visual progress bar

---

## 🔐 Privacy Policy (Summary)

* Email content is analyzed **only when the user clicks “Check Spam”**
* No emails or personal data are stored
* No data is sold or shared
* Communication with backend happens over HTTPS

---

## 📦 Installation (Developer Mode)

1. Clone the repository
   ```git clone https://github.com/PramodKumar04/SafeCheck.git```
 
2. Open Chrome → `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the `spam_extension` folder

---

## 🌐 Live Backend

The backend API is deployed on Render:


POST https://safecheck-s5pa.onrender.com/predict


Request body:


{
  "text": "Congratulations! You have won a free prize."
}

## 🎯 Use Cases

* Detect spam or phishing emails
* Assist non-technical users in identifying suspicious messages
* Educational demonstration of applied ML + browser extensions


## 👤 Author

**Pramod Kumar**
GitHub: [https://github.com/PramodKumar04](https://github.com/PramodKumar04)




Render (Cloud Hosting)

GitHub (Version Control)
