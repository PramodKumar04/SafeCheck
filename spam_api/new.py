import requests

url = "http://127.0.0.1:5000/predict"
data = {
    "text": "hi keerthana"
}

response = requests.post(url, json=data)
print(response.json())
