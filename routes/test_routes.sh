#!/bin/bash

# Test /transactions/upload
curl -X POST http://localhost:3000/transactions/upload \
     -H "Content-Type: application/json" \
     -d '[
         { "date": "2024-12-01", "category": "Fixed Costs", "description": "Rent", "amount": 1500 },
         { "date": "2024-12-01", "category": "Savings", "description": "Emergency Fund", "amount": 200 },
         { "date": "2024-12-01", "category": "Guilt-Free Spending", "description": "Dining Out", "amount": 50 }
     ]'

echo "\n"

# Test /reports/summary
curl -X GET http://localhost:3000/reports/summary

echo "\n"
