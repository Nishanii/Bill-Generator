from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bills.db'
db = SQLAlchemy(app)

class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    item_name = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

@app.route('/')
def index():
    bills = Bill.query.all()
    return render_template('index.html', bills=bills)

@app.route('/add_bill', methods=['POST'])
def add_bill():
    customer_name = request.form['customerName']
    item_name = request.form['itemName']
    quantity = request.form['quantity']
    price = request.form['price']

    new_bill = Bill(customer_name=customer_name, item_name=item_name, quantity=quantity, price=price)
    db.session.add(new_bill)
    db.session.commit()

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)