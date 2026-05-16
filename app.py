from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Sales Forecast AI is running successfully!"