from dotenv import load_dotenv
from flask import Flask

# load env variables
load_dotenv()


# create the Flask application
app = Flask(__name__)


# home page
@app.route("/")
def home():
    return {"Welcome": "Hello, World!"}


# members route for testing
@app.route("/members")
def members():
    return {
        "members": ["Cameron", "Lemmy", "Ammadou", "Kevin"]
    }


# run the flass server
if __name__ == "__main__":
    app.run(debug=True)
