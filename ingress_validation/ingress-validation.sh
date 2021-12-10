#!/bin/bash

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
    if [[ -f "../api.service.yaml" ]]; then
        API_SERVICE_PORT=$(cat ../api.service.yaml | yq e '.spec.ports[0].port' - )
        if [[ $PORT != $API_SERVICE_PORT && $API_SERVICE_PORT != "null" ]]; then
            return 0;
        fi
    fi
    return 1;
}

###
ingress_running &>/dev/null
if [[ $? -eq 0 ]]; then
    case1="false";
else
    case1="true";
fi

ingress_file_exists &>/dev/null
if [[ $? -eq 0 ]]; then
    case2="false";
else
    case2="true";
fi

port_assigned &>/dev/null
if [[ $? -eq 0 ]]; then
    case3="false";
else
    case3="true";
fi

api_ingress_port_match &>/dev/null
if [[ $? -eq 0 ]]; then
    case4="false";
else
    case4="true";
fi

cat<<EOT
[
    { 
        "message": "API ist vom Ingress aufrufbar" ,"success": ${case1}
    },
    {
        "message": "Die ingress.yaml Datei ist vorhanden" ,"success": ${case2}
    },
    {
        "message": "Die Portnummer wurde im Defaultbackend oder in einer Rule definiert" ,"success": ${case3}
    },
    {
        "message": "Das API Service und der Ingress verwenden den selben Port" ,"success": ${case4}
    }
]
EOT