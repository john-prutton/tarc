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
# url="https://api.paystack.co/transaction/initialize"
# content_type="Content-Type: application/json"
# data='{ 
#   "email": "customer@email.com", 
#   "amount": "20"
# }'
# curl "$url" -H "$authorization" -H "$content_type" -d "$data" -X POST

## List countries
# url="https://api.paystack.co/country"
# curl "$url" -H "$authorization" -X GET

## Get bank codes
# url="https://api.paystack.co/bank?currency=ZAR&enabled_for_verification=true&active=truesupports_transfers=true"
# curl "$url" -H "$authorization" -X GET

## Create Transfer Recipient
# url="https://api.paystack.co/transferrecipient"
# data='{ 
#   "type": "basa", 
#   "name": "John Prutton", 
#   "account_number": "1267942886", 
#   "bank_code": "198765", 
#   "currency": "ZAR"
# }'
# curl "$url" -H "$authorization" -H "Content-Type: application/json" -d "$data" -X POST

# {
#   "status":true,
#   "message":"Transfer recipient created successfully",
#   "data":{
#     "active":true,"createdAt":"2024-03-13T14:49:25.842Z","currency":"ZAR",
#     "domain":"test","id":73375710,"integration":1046170,"name":"John Prutton",
#     "recipient_code":"RCP_mrxagdr1hrf8x6u","type":"basa",
#     "updatedAt":"2024-03-13T14:49:25.842Z","is_deleted":false,
#     "isDeleted":false,
#      "details":{
#       "authorization_code":null,"account_number":"1267942886", 
#       "account_name":null,"bank_code":"198765","bank_name":"Nedbank"
#     }
#   }
# }


## Initiate transfer
url="https://api.paystack.co/transfer"
data='{ 
  "source": "balance", 
  "reason": "Testing", 
  "amount":200, 
  "recipient": "RCP_mrxagdr1hrf8x6u",
  "currency": "ZAR",
  "reference": "my-unique-reference"
}'

curl "$url" -H "$authorization" -H "$content_type" -d "$data" -X POST