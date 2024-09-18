from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

expenses = []  # In-memory list to store expense data

@app.route('/')
def home():
    return render_template('add_expense.html')

@app.route('/add', methods=['POST'])
def add_expense():
    data = request.get_json()  # Parse incoming JSON data
    description = data['description']
    amount = data['amount']
    category = data['category']

    expense = {
        'description': description,
        'amount': amount,
        'category': category
    }

    expenses.append(expense)  # Append the new expense to the list

    # Return the updated list of expenses as JSON
    return jsonify(expenses)

if __name__ == '__main__':
    app.run(debug=True)
