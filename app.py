# TODO add selection options below game buttons 
# TODO add table options to rummy.html
# TODO create db

from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)
db = 'students.db'

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/rummy', methods = ['GET', 'POST'])
def rummy():
    return render_template('rummy.html')

if __name__ == '__main__':
    app.run(debug=True)