#!/bin/bash

target="http://localhost/missions"
expectedLocationRegex="https:\/\/localhost/missions"
expectedStatusCodeRegex="3.."

response="$(curl -sI "$target")"
actualLocation=$(echo "$response" | grep -iE '^Location')
statusCode=$(echo "$response" | grep -iE '^HTTP' | cut -d' ' -f2)

if [[ "$actualLocation" =~ $expectedLocationRegex && \
      "$statusCode" =~ $expectedStatusCodeRegex ]]; then
  echo "Correct redirect"
else
  echo "Incorrect redirect!"
fi