from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your actual secret key

# Simulate a database with a dictionary
users_db = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    if username in users_db:
        flash('Username already exists!')
        return redirect(url_for('index'))

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)
    users_db[username] = {'email': email, 'password': hashed_password}
    flash('Registration successful! Please log in.')
    return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    user = users_db.get(username)

    if not user or not check_password_hash(user['password'], password):
        flash('Invalid username or password!')
        return redirect(url_for('index'))

    flash('Login successful!')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
