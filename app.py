from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json, os, random
from datetime import datetime

app = Flask(__name__)
CORS(app)

TASKS_FILE = "tasks.json"
CO2_SAVED = 0
RENEWABLE_HISTORY = []  # store last N values

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as f:
            return json.load(f)
    return []

def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent=4)

@app.route("/")
def dashboard():
    return render_template("dashboard.html")

@app.route("/add_task", methods=["POST"])
def add_task():
    global CO2_SAVED
    data = request.json
    name = data.get("name")
    priority = data.get("priority", "Medium")

    tasks = load_tasks()
    renewable = random.randint(30, 100)  # fake renewable % for demo

    status = "pending"
    if priority == "Urgent":
        status = "running"
    elif renewable > 60:  
        status = "running"
        CO2_SAVED += 5  # pretend we saved 5g CO2

    new_task = {
        "name": name,
        "priority": priority,
        "status": status,
        "renewable_at_submission": renewable,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    tasks.append(new_task)
    save_tasks(tasks)

    return jsonify({"message": "Task added!", "task": new_task})

@app.route("/list_tasks", methods=["GET"])
def list_tasks():
    return jsonify(load_tasks())

@app.route("/renewable", methods=["GET"])
def renewable():
    global RENEWABLE_HISTORY
    value = random.randint(30, 100)  # simulate renewable %
    RENEWABLE_HISTORY.append({"time": datetime.now().strftime("%H:%M:%S"), "value": value})
    if len(RENEWABLE_HISTORY) > 10:  # keep only last 10
        RENEWABLE_HISTORY.pop(0)
    return jsonify({"renewable": value, "history": RENEWABLE_HISTORY})

@app.route("/carbon_savings", methods=["GET"])
def carbon_savings():
    return jsonify({"saved": CO2_SAVED})