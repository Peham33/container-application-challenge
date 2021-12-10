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

kubectl_is_reachable(){
    # Try to reach the Kubernetes cluster, abort if not possible
    kubectl cluster-info
    success=$?
    if [[ $success -ne  0 ]]; then
        return 0;
    fi
    return 1;
}


setup_echo_server_and_cleanup(){
    # TESTING - Copy ingress.yaml and change it afterwards
    cp ../ingress.yaml ../echoserver-ingress.yaml
    if [[ $DEFAULTBACKEND_PORT != "null" ]];
    then       
        cat ../echoserver-ingress.yaml | yq e '.spec.defaultBackend.service.name = "echoserver"' - | sudo sponge ../echoserver-ingress.yaml
    fi
    if [[ $RULES_PORT != "null" ]];
    then
        cat ../echoserver-ingress.yaml | yq e '.spec.rules[].http.paths[].backend.service.name = "echoserver"' - | sudo sponge ../echoserver-ingress.yaml
    fi
    kubectl apply -f ../echoserver-ingress.yaml
    
    sleep 5
    curl http://challenge.test/?echo_body=funktioniert -L -m 5
    
    echo ""
    
    #Cleanup
    ECHOPOD=$(kubectl get pods | grep "echo" | cut -f1 -d' ')
    kubectl delete deployment echoserver
    kubectl delete service echoserver
    kubectl delete pod $ECHOPOD --force
    kubectl delete ingress challenge
    kubectl apply -f ../ingress.yaml
    rm ../echoserver-ingress.yaml
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

kubectl_is_reachable &>/dev/null
if [[ $? -eq 0 ]]; then
    case5="false";
else
    case5="true";
fi

setup_echo_server_and_cleanup &>/dev/null

cat<<EOT
[
    { 
        "message": "ingress works" ,"success": ${case1}
    },
    {
        "message": "ingress.yaml file is present in the root folder" ,"success": ${case2}
    },
    {
        "message": "Port number defined in the default backend or in the rule" ,"success": ${case3}
    },
    {
        "message": "API service port and ingress port match" ,"success": ${case4}
    },
    {
        "message": "Connection to the kubectl cluster" ,"success": ${case5}
    }
]
EOT
