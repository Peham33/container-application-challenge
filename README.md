# container-application-challenge
SPR5G1 Studienprojekt für gepardec

<!-- Introduction / Begrüßung -->

## Setup

Before you can start the challenge, it is necessary to go through the Setup Guide below.

### Setup Vagrant

The container-application-challenge runs inside a small Vagrant VM. To start the VM it is necessary to download and install [Vagrant](https://www.vagrantup.com/downloads).

<https://www.vagrantup.com/downloads>

If not already installed, a installation of [VirtualBox](https://www.virtualbox.org/wiki/Downloads) is mandatory.

<https://www.virtualbox.org/wiki/Downloads>

### Clone Repo

The Vagrant Startup file and all files needed to run the challenge are located on this GitHub repository.

https://github.com/aeisl/container-application-challenge

To start the challenge, fork the repository.

Navigate to the local directory you want to run the challenge in and clone your fork.

### Start and configure Vagrant

Navigate into the project directory.

```bash
cd container-application-challenge
```

By running `vagrant up` the VM should start and configure itself automatically.

This may take a few minutes depending on your download speed, the console output should tell you if the setup is done.

After waiting for a few moments - check if the setup worked by accessing the challenge website on [https://localhost:3000](https://localhost:3000).

To connect and work on the virtual machine run.

```bash
vagrant ssh
```

All following commands need to be executed on the virtual machine.

### Start and configure minikube

To start the kubernetes cluster run:

```bash
minikube start
```

After starting minikube some configuration of the cluster needs to be done. For this a setup script will be provided.
Simply execute the script by running the following command inside Vagrant.

```bash
/vagrant/minikube-setup.sh
```

The script executes the following steps:

1. Enable the minikube ingress addon.
2. Disable the TLS CA verification to allow a self-signed certificate.
3. Apply various k8s configurations.
4. Create the TLS secret.

<!-- 
We want an Ingress Control Pod to be available, so the ingress addon for minikube needs to be enabled.

```bash
minikube addons enable ingress

# Verify that the nginx-controller pod is available
kubectl get pods --namespace ingress-nginx
# or if you don't have namespaces, check for a pod called 'ingress-controller'
kubectl get pods -A
```

Disable verification of TLS CA to allow a self-signed certificate (See [Issue #5401](https://github.com/kubernetes/ingress-nginx/issues/5401#issuecomment-662424306))

This command needs to be executed after every restart of the minikube cluster.

```bash
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

### Applying the configuration of the base cluster pods

```bash
kubectl apply -f github-registry-secret.yaml # Allows for pulling private Docker images
kubectl apply -f api.configmap.yaml # Applies config map for api 
kubectl apply -f database.service.yaml -f database.deployment.yaml
kubectl apply -f api.deployment.yaml
kubectl apply -f database.volume.yaml -f database.claim.yaml
```

Add the SSL certificate as kubernetes secret type _tls_
```bash
kubectl create secret tls challenge-test-tls --key ha-proxy/server.key --cert ha-proxy/server.crt
``` 
-->

The following files will not be applyable right after the setup and need to be configured correctly first.

- ingress.yaml
- api.service.yaml
- database-credentials.yaml

Now the setup should be complete and you can start with the challenge.
Follow the instructions on the [challenge website](http://localhost:3000/).

## Handing in your Solution

When you are done with the challenge you should create a pull request from your fork onto the main repository.
The followup interview with gepardec will be based on this pull request.

## Cleanup

Using the command `vagrant destroy` all traces of the Vagrant VM will be deleted from your machine.

## Query Samples

These samples should be executed on the Vagrant VM.

If the cluster is set up correctly, the following queries should return status code 200.

Curl command for registering a new agent.

    curl -d "codeName=123&name=test" https://challenge.test/register -v -H 'content-type: application/x-www-form-urlencoded' -i

Curl command to check if register worked.

    curl -d "codeName=123" http://challenge.test/login -H 'content-type: application/x-www-form-urlencoded' -L -i  

## FAQ

<!-- 
My ingress, api and database are correct according to the challenge-website validations but the ingress can not be applied.

Answer:

```bash
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
``` 
-->