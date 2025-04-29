from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

counter = 0

@app.route('/', methods=['GET', 'POST'])
def index():
    global counter 
    if request.method == 'POST':
        counter += 1
        return redirect(url_for('index'))

    return render_template('index.html', counter=counter)

if __name__ == '__main__':
    app.run(debug=True)
