# container-application-challenge
SPR5G1 Studienprojekt für gepardec

## Setup

Before you can start the challenge, it is necessary to go through the Setup Guide below.

### Setup Vagrant

The container-application-challenge runs inside a small Vagrant VM. To start the VM it is necessary to download and install [Vagrant](https://www.vagrantup.com/downloads).

<https://www.vagrantup.com/downloads>

If not already installed a installation of [VirtualBox](https://www.virtualbox.org/wiki/Downloads) is also mandatory.

<https://www.virtualbox.org/wiki/Downloads>

### Clone Repo

The Vagrant Startup file and all files needed to run the challenge are located on this GitHub repository.

https://github.com/aeisl/container-application-challenge

Navigate to the local directory you want to run the challenge in.

Run this command

```bash
git clone https://github.com/aeisl/container-application-challenge.git
```

and navigate into the directory.

```bash
cd container-application-challenge
```

### Start and configure Vagrant

By running `vagrant up` the VM should start and configure itself automatically.

This may take a few minutes depending on your download speed.

To check if the setup worked you can access the challenge website on [https://localhost:3000](https://localhost:3000).

To connect to the Vagrant VM run

```bash
vagrant ssh
```

### Start minikube

To start the kubernetes cluster run:

```bash
minikube start
```

We want an Ingress Control Pod to be available, so the ingress addon for minikube needs to be enabled.

```bash
minikube addons enable ingress

# Verify that the nginx-controller pod is available
kubectl get pods --namespace ingress-nginx
# or if you dont have namespaces, check for a pod called 'ingress-controller'
kubectl get pods -A
```

Disable verfication of TLS CA to allow a self-signed certificate (See [Issue #5401](https://github.com/kubernetes/ingress-nginx/issues/5401#issuecomment-662424306))
```bash
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

<!-- We should setup the specific pods that need to be applied at the first start. -->

Now the setup should be complete.

## Handing in your Solution

<!-- TODO -->

## Cleanup

Using the command `vagrant destroy` all traces of the Vagrant VM will be deleted from your machine.

## FAQ

<!-- TODO -->
