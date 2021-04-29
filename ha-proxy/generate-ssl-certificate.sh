#!/usr/bin/env bash

# Requires an openssl binary avaiable through $PATH

# @See
# https://serversforhackers.com/c/using-ssl-certificates-with-haproxy
# https://stackoverflow.com/questions/10175812/how-to-create-a-self-signed-certificate-with-openssl

openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout server.key -out server.crt -extensions san -config \
  <(echo "[req]"; 
    echo distinguished_name=req; 
    echo "[san]"; 
    echo subjectAltName=DNS:localhost,DNS:challenge.test,IP:127.0.0.1
    ) \
  -subj "/CN=localhost"

cat server.crt server.key | tee server.pem
