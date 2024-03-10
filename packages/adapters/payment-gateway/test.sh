#!/bin/sh
authorization="Authorization: Bearer "${PAYSTACK_SECRET}

## Fetch timeout
# url="https://api.paystack.co/integration/payment_session_timeout"
# curl "$url" -H "$authorization" -X GET

## Update timeout
# url="https://api.paystack.co/integration/payment_session_timeout"
# content_type="Content-Type: application/json"
# data='{ "timeout": 600 }'
# curl "$url" -H "$authorization" -H "$content_type" -d "$data" -X PUT

## Initialize transaction
url="https://api.paystack.co/transaction/initialize"
content_type="Content-Type: application/json"
data='{ 
  "email": "customer@email.com", 
  "amount": "20"
}'
curl "$url" -H "$authorization" -H "$content_type" -d "$data" -X POST