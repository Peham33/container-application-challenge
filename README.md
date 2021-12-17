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

By running `vagrant up` the VM should start and configure itself automatically, the project directory will be mounted inside the VM.

This may take a few minutes depending on your download speed, the console output should tell you if the setup is done.

After waiting for a few moments - check if the setup worked by accessing the challenge website on your local machine ([http://localhost:3000](http://localhost:3000)).

To connect and work on the virtual machine run.

```bash
vagrant ssh
```

All following commands need to be executed on the virtual machine.

### Setup Docker-Compose

A ready to use compiled java application is included in the repository in order to make the setup faster and simpler.

1. Run `docker-compose up --build` in /vagrant directory
2. The application is now running in the VM under [http://localhost:443](http://localhost:443)

If changes have been made to any files, run 
`docker-compose up --build`.

With this setup you are ready to start the first part of the challenge. You can access the instructions for part 1 at 
[challenge website](http://localhost:3000/compose-challenges.html) or continue with the setup.

### Start and configure minikube

This part of the setup is only needed for the kubernetes part of the challenge.

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

The following files will not be applyable right after the setup and need to be configured correctly first.

- ingress.yaml
- api.service.yaml
- database-credentials.yaml

Now the setup should be complete and you can start with the challenge.
Follow the instructions on the [challenge website](http://localhost:3000/).
All changes you make to files can be made outside the Vagrant VM.

## Challenges

The challenge instructions can be found in [docs/challenges](https://github.com/aeisl/container-application-challenge/tree/main/docs/challenges) or on the [challenge website](http://localhost:3000/) after [starting Vagrant](https://github.com/aeisl/container-application-challenge#start-and-configure-minikube).

We currently have 3 challenge instructions (provided in German!):

1. [Setup mit Docker-Compose](https://github.com/aeisl/container-application-challenge/blob/main/docs/challenges/1_Setup-Mit-Docker-Compose.md)
2. [K8s Deployment ohne Downtime](https://github.com/aeisl/container-application-challenge/blob/main/docs/challenges/2_K8s-Deployment-Ohne-Downtime.md)
3. [Cluster Setup](https://github.com/aeisl/container-application-challenge/blob/main/docs/challenges/3_Cluster-Setup.md)

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
