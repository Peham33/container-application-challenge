#!/bin/bash
if [ -f "../ingress.yaml" ]; then
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

    #Setup Echoserver
    cat ingress-echo.service.yaml | yq e ".spec.ports[].port = $PORT" - | sudo sponge ingress-echo.service.yaml
    kubectl apply -f ingress-echo.deployment.yaml
	kubectl apply -f ingress-echo.service.yaml

    cat ../ingress.yaml | yq e '.spec.defaultBackend.service.name = "echoserver"' - | sudo sponge ../ingress.yaml
    cat ../ingress.yaml | yq e '.spec.rules[].http.paths[].backend.service.name = "echoserver"' - | sudo sponge ../ingress.yaml
    kubectl apply -f ../ingress.yaml

    echopodReadyState=$(kubectl get pods | grep "echo.*Running" | cut -f9 -d' ')
    while [[ $echopodReadyState != "Running" ]]; do
        sleep 2
        echopodReadyState=$(kubectl get pods | grep "echo.*Running" | cut -f9 -d' ')
        echo "Echoserver not running."
    done
    echo $echopodReadyState
    curl http://challenge.test/?echo_body=funktioniert -L 

    #Cleanup
    echopod=$(kubectl get pods | grep "echo" | cut -f1 -d' ')
    kubectl delete deployment echoserver
    kubectl delete service echoserver 
    kubectl delete pod $echopod --force
    cat ../ingress.yaml | yq e '.spec.defaultBackend.service.name = "api"' - | sudo sponge ../ingress.yaml
    cat ../ingress.yaml | yq e '.spec.rules[].http.paths[].backend.service.name = "api"' - | sudo sponge ../ingress.yaml
else 
    echo "ingress.yaml does not exist!"
fi