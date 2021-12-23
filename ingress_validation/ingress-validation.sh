#!/bin/bash
LOG_FILE=/tmp/ingress-validation.out.txt
touch $LOG_FILE
echo "-----------------------------------" >> $LOG_FILE
# Check API
ingress_running(){
    API_STATUS=$(curl -m 5 -d "codeName=007" http://challenge.test/login \
         -H 'content-type: application/x-www-form-urlencoded' -L -i | grep -E "(504|200)" | cut -f2 -d' ')
    if [[ $API_STATUS == '504' || $API_STATUS == '200' ]]; then
        return 1;
    fi
    return 0;
}

ingress_file_exists(){
    if [ -f "../ingress.yaml" ]; then
        return 1;
    else
        return 0;
    fi
}

port_assigned(){
    # If no ingress port is set for either default backend or rules exit.
    DEFAULTBACKEND_PORT=$(cat ../ingress.yaml | yq e '.spec.defaultBackend.service.port.number' -  )
    RULES_PORT=$(cat ../ingress.yaml | yq e '.spec.rules[0].http.paths[0].backend.service.port.number' -)
    if [[ $RULES_PORT == "null" ]];
    then
        PORT=$DEFAULTBACKEND_PORT
    else
        PORT=$RULES_PORT
    fi
    if [[ $PORT == "null" ]];
    then
        return 0;
    fi
    return 1;
}

api_ingress_port_match(){
    # If api service port and ingress port do not match - exit.
    DEFAULTBACKEND_PORT=$(cat ../ingress.yaml | yq e '.spec.defaultBackend.service.port.number' -  )
    RULES_PORT=$(cat ../ingress.yaml | yq e '.spec.rules[0].http.paths[0].backend.service.port.number' -)
    if [[ $RULES_PORT == "null" ]];
    then
        PORT=$DEFAULTBACKEND_PORT
    else
        PORT=$RULES_PORT
    fi

    if [[ -f "../api.service.yaml" ]]; then
        API_SERVICE_PORT=$(cat ../api.service.yaml | yq e '.spec.ports[0].port' - )
        if [[ $PORT == $API_SERVICE_PORT && $API_SERVICE_PORT != "null" ]]; then
            return 1;
        fi
    fi
    return 0;
}

https_upgrade_works() {
  local target="http://challenge.test/missions"
  local expectedLocationRegex="https:\/\/challenge.test/missions"
  local expectedStatusCodeRegex="3.."

  local response="$(curl -sI "$target")"
  local actualLocation=$(echo "$response" | grep -iE '^Location')
  local statusCode=$(echo "$response" | grep -iE '^HTTP' | cut -d' ' -f2)

  if [[ "$actualLocation" =~ $expectedLocationRegex && \
        "$statusCode" =~ $expectedStatusCodeRegex ]]; then
    return 1
  else
    return 0
  fi
}

###
ingress_running &>> $LOG_FILE
if [[ $? -eq 0 ]]; then
    case1="false";
else
    case1="true";
fi

ingress_file_exists &>> $LOG_FILE
if [[ $? -eq 0 ]]; then
    case2="false";
else
    case2="true";
fi

port_assigned &>> $LOG_FILE
if [[ $? -eq 0 ]]; then
    case3="false";
else
    case3="true";
fi

api_ingress_port_match &>> $LOG_FILE
if [[ $? -eq 0 ]]; then
    case4="false";
else
    case4="true";
fi

https_upgrade_works &>> $LOG_FILE
if [[ $? -eq 0 ]]; then
    case5="false";
else
    case5="true";
fi

cat<<EOT
[
    { 
        "message": "API ist über den Ingress aufrufbar" ,"success": ${case1}
    },
    {
        "message": "Die ingress.yaml Datei ist vorhanden" ,"success": ${case2}
    },
    {
        "message": "Die Portnummer wurde im Defaultbackend oder in einer Rule definiert" ,"success": ${case3}
    },
    {
        "message": "Der API-Service Port und der Ingress Port stimmen überein" ,"success": ${case4}
    },
    {
        "message": "Der Ingress Proxy führt ein HTTPS Upgrade durch", "success": ${case5}
    }
]
EOT