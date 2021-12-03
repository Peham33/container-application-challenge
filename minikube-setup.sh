#!/bin/bash
STEPS_COUNT="11"
LOG_FILE=/tmp/minikube-setup.out.txt
touch $LOG_FILE
echo "" > $LOG_FILE

# Enable ingress
echo '[1/11] Enabling minikube ingress addon (this may take a moment)...'
minikube addons enable ingress >> $LOG_FILE
if [ $? -ne 0 ]; then
    cat /tmp/minikube-startup.out.txt
    exit 1;
fi

# Verification of ingress
echo '[2/11] Checking if ingress controller is running...'
INGRESS_ENABLED=$(kubectl get pods --namespace ingress-nginx \
| grep ingress-nginx-controller \
| tr -s ' ' \
| cut -f3 -d' ');
if [[ $INGRESS_ENABLED != "Running" ]]; then
    echo "Ingress Controller Pod not running." >> $LOG_FILE
    exit 2;
fi

# Disable verification of TLS CA
echo '[3/11] Disabling TLS CA verification...'
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission >> $LOG_FILE

# Applying of k8s files
echo '[4/11] Applying github registry secret...'
kubectl apply -f github-registry-secret.yaml >> $LOG_FILE
echo '[5/11] Applying API configmap...'
kubectl apply -f api.configmap.yaml >> $LOG_FILE
echo '[6/11] Applying Database Service...'
kubectl apply -f database.service.yaml >> $LOG_FILE
echo '[7/11] Applying Database Deployment...'
kubectl apply -f database.deployment.yaml >> $LOG_FILE
echo '[8/11] Applying API Deployment...'
kubectl apply -f api.deployment.yaml >> $LOG_FILE
echo '[9/11] Applying Database PersistentVolume...'
kubectl apply -f database.volume.yaml >> $LOG_FILE
echo '[10/11] Applying Database PersistentVolumeClaim...'
kubectl apply -f database.claim.yaml >> $LOG_FILE

# Create secret
echo '[11/11] Creating TLS secret...'
kubectl create secret tls challenge-test-tls --key ha-proxy/server.key --cert ha-proxy/server.crt >> $LOG_FILE

echo 'Log written to '$LOG_FILE
