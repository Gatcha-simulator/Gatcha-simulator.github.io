from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# In-memory user data (replace with database in production)
users = []

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Check if user already exists
    if any(user['email'] == email for user in users):
        return jsonify({'success': False, 'message': 'User already exists'})
    
    # Add new user
    users.append({'email': email, 'password': password})
    return jsonify({'success': True, 'message': 'Signup successful!'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if user exists and password is correct
    user = next((user for user in users if user['email'] == email and user['password'] == password), None)
    if user:
        return jsonify({'success': True, 'message': 'Login successful!'})
    return jsonify({'success': False, 'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0', port=5000)
