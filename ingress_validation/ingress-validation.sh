#!/bin/bash
# Check API
API_STATUS=$(curl -d "codeName=007" http://challenge.test/login \
     -H 'content-type: application/x-www-form-urlencoded' -L -i | grep -E "(504|200)" | cut -f2 -d' ')
if [[ $API_STATUS == '504' || $API_STATUS == '200' ]]; then
    echo "funktioniert";
    exit 0;
fi
# API is not up
if [ -f "../ingress.yaml" ]; then

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
        echo "No port numbers assigned! Define either default backend or rules entry"
        exit 1
    fi

    # If api service port and ingress port do not match - exit.
    if [[ -f "../api.service.yaml" ]]; then
        API_SERVICE_PORT=$(cat ../api.service.yaml | yq e '.spec.ports[0].port' - )
        if [[ $PORT != $API_SERVICE_PORT && $API_SERVICE_PORT != "null" ]]; then
            echo "API service port and ingress port do not match"
            exit 2
        fi
    fi
        
    # Try to reach the Kubernetes cluster, abort if not possible
    kubectl cluster-info
    success=$?
    if [[ $success -ne  0 ]]; then
        echo "Can not connect to kubectl cluster."
        exit 3
    fi
    
    # Setup Echoserver
    cat ingress-echo.service.yaml | yq e ".spec.ports[].port = $PORT" - | sudo sponge ingress-echo.service.yaml
    kubectl apply -f ingress-echo.deployment.yaml
    kubectl apply -f ingress-echo.service.yaml
    
    ECHOPOD_READYSTATE=$(kubectl get pods | grep "echo.*Running" | cut -f9 -d' ')
    WAIT_CYCLES=0
    while [[ $ECHOPOD_READYSTATE != "Running" ]]; do
        sleep 2
        ECHOPOD_READYSTATE=$(kubectl get pods | grep "echo.*Running" | cut -f9 -d' ')
        echo "Echoserver not running."
        WAIT_CYCLES=$((WAIT_CYCLES + 1))
        if [[ $WAIT_CYCLES -gt 5 ]]; then break; fi
    done
    echo $ECHOPOD_READYSTATE
    
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

else
    echo 'ingress.yaml does not exist!'
fi