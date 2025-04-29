from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

counter = -1

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', counter=counter)

@app.route('/mack-address', methods=['GET'])
def mack():
    return jsonify({'name': 'Mack Address Hansen'})

@app.route('/increment', methods=['POST'])
def increment():
    global counter
   # counter += 1
    return jsonify({'counter': counter})

@app.route('/esp', methods=['POST'])
def getCount():
    global counter
    data = request.get_json()
    if not data or 'count' not in data:
        return jsonify({'error': 'Missing "counter" in JSON'}), 400

    try:
        counter = int(data['count'])
        return jsonify({'status': 'success', 'new_count': counter}), 200
    except ValueError:
        return jsonify({'error': '"count" must be an integer'}), 400



if __name__ == '__main__':
    app.run(debug=True)
