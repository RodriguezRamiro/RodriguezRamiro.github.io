from flask import Flask, render_template, request, redirect, url_for
from models import db, Expense, init_db
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///expense.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Set a secret key for sessions
db.init_app(app)

app.register_blueprint(auth_bp)

@app.route('/')
def index():
    expenses = Expense.query.all()
    expenses_df = pd.DataFrame([(e.description, e.amount, e.category) for e in expenses], columns=['description', 'amount', 'category'])

    # Call the prediction function
    future_expenses = predict_expenses(expenses_df)


 # Calculate total expenses by category
    category_totals = db.session.query(
        Expense.category, db.func.sum(Expense.amount)
    ).group_by(Expense.category).all()

    categories = [c[0] for c in category_totals]
    amounts = [c[1] for c in category_totals]

    return render_template('index.html', expenses=expenses, categories=categories, amounts=amounts future_expenses=future_expenses)


@app.route('/add', methods=['GET', 'POST'])
def add_expense():
    if request.method == 'POST':
        description = request.form['description']
        amount = float(request.form['amount'])
        category = request.form['category']

        new_expense = Expense(description=description, amount=amount, category=category)
        db.session.add(new_expense)
        db.session.commit()

        return redirect(url_for('index'))
    return render_template('add_expense.html')

if __name__ == "__main__":
    with app.app_context():
        init_db()
    app.run(debug=True)

@app.route('/filter', methods=['GET', 'POST'])
def filter_expenses():
    if request.method == 'POST':
        month = request.form['month']
        category = request.form['category']

        filtered_expenses = Expense.query.filter(
            db.func.strftime('%Y-%m', Expense.date) == month,
            Expense.category == category
        ).all()

        return render_template('index.html', expenses=filtered_expenses)
    else:
        return render_template('filter.html')


login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('login'))
    return render_template('register.html')