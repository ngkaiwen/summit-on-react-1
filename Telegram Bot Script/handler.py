import json
import os
import sys
import time
from botocore.vendored import requests

here = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(here, "./vendored"))

TOKEN = os.environ['TELEGRAM_TOKEN']
BASE_URL = "https://api.telegram.org/bot{}".format(TOKEN)
FB_URL="#YOURFIREBASEHERE"
GET_URL =  "YOURFIREBASEHERE"
users = {}

def get_course_data():
    resp = requests.get(GET_URL)
    courses = list(resp.json().keys())
    return courses

courses = get_course_data()

def write_to_firebase(dataToWrite,url):
    resp = requests.post(url = url, data = json.dumps(dataToWrite))

def hello(event, context):
    try:
        data = json.loads(event["body"])
        message = str(data["message"]["text"])
        chat_id = data["message"]["chat"]["id"]
        first_name = data["message"]["chat"]["first_name"]

        response = "/start to start and /q to post"

        if "/start " == message[:7]:
            try:
                id = message.split(" ")[1]
                if id in courses:
                    users[chat_id] = id
                    response = "Added to {}".format(id)
                else:
                    response = "Invalid chat ID"
            except Exception as e:
                response = "Format incorrect"
                print(e)

        if "/q " == message[:3]:
            if chat_id not in users:
                response = "Use /start <course ID> to start"
            else:
                if len(message) <= 120:
                    write_to_firebase({'message': message[3:], 'from': first_name, 'time':time.ctime()},FB_URL + "/" + users[chat_id] + "/chats.json")
                    response = "You posted a question to {}".format(users[chat_id])
                else:
                    response = "Message must be 120 characters or fewer"
            

        data = {"text": response.encode("utf8"), "chat_id": chat_id}
        url = BASE_URL + "/sendMessage"
        requests.post(url, data)

    except Exception as e:
        print(e)

    return {"statusCode": 200}
