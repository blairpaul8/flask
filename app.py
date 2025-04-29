from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

counter = 15

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', counter=counter)

@app.route('/increment', methods=['POST'])
def increment():
    global counter
   # counter += 1
    return jsonify({'counter': counter})

if __name__ == '__main__':
    app.run(debug=True)
