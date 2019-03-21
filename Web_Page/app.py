#!flask/bin/python
from flask import Flask, jsonify, render_template, redirect, url_for
from flask_cors import CORS
from flask import g
from flask import Response
from flask import request
import json
import pymysql
from sankey_data import s_data

app = Flask(__name__)
CORS(app)
'''cors = CORS(app, resources={r"/*": {"origins": "*"}})'''

@app.before_request
def db_connect():
  g.conn = pymysql.connect(host='us-cdbr-iron-east-03.cleardb.net',
                           user='b3e3f4a1ff2684',
                           passwd='0a88bed9',
                           db='heroku_fd48420af727b24')
  g.cursor = g.conn.cursor()

@app.after_request
def db_disconnect(response):
  g.cursor.close()
  g.conn.close()
  return response

@app.route("/sankey_data", methods=['GET'])
def sankey_data():
  data =  s_data()
  return jsonify(data)
  
@app.route('/')
def home():
  '''return render_template('index.html',  title = 'Projects')'''
  return redirect(url_for('static', filename='index.html'))


@app.route("/animal", methods=['GET'])
def animal():
  g.cursor.execute('select b.ANIMAL_TYPE_NAME,count(*) cnt from acc_shelter_outcome a Join animal_type b on b.animal_type_id = a.animal_type_id group by b.animal_type_name')
  data = g.cursor.fetchall()  
  animal_list=[]
  for item in data:
    i = {
    'animal_type':item[0],
    'cnt':item[1]
    }
    animal_list.append(i)
  data = json.dumps(animal_list)
  resp = Response(data, status=200, mimetype='application/json')
  return resp
'''return {'StatusCode':'200','Animal':animal_list}'''


  
if __name__ == '__main__':
    app.run(debug=True)
    
    '''  return jsonify(animal_type=result[0],
                 cnt=result[1])'''  