from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
import os

app = Flask(__name__)

mongo_uri = os.environ.get('MONGO_URI', 'mongodb://mongodb-service:27017/studentdb')
app.config["MONGO_URI"] = mongo_uri
mongo = PyMongo(app)
db = mongo.db

@app.route('/api/students', methods=['GET'])
def get_students():
    students = list(db.students.find())
    return dumps(students), 200, {'Content-Type': 'application/json'}

@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json() or {}
    name = data.get('name')
    if not name:
        return jsonify({'error': 'name is required'}), 400
    student = {
        'name': name,
        'age': data.get('age'),
        'course': data.get('course')
    }
    res = db.students.insert_one(student)
    student['_id'] = str(res.inserted_id)
    return jsonify(student), 201

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status':'ok'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
