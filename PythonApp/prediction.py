# prediction.py

import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load your trained model (ensure you have a trained model saved as 'model.pkl')
model = joblib.load('model.pkl')

def predict_expenses(expenses_df):
    """
    Predict future expenses based on historical data.

    :param expenses_df: DataFrame with historical expenses data
    :return: predicted future expenses
    """
    # Prepare features and target variable
    X = expenses_df[['feature1', 'feature2']]  # Replace with actual feature columns
    y = expenses_df['target']  # Replace with actual target column

    # Fit the model (if training is needed; otherwise, use loaded model)
    model.fit(X, y)

    # Predict future expenses
    future_expenses = model.predict(X)  # Replace with actual prediction logic
    return future_expenses
