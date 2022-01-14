#!/bin/sh
export DEBIAN_FRONTEND=noninteractive
export APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

. ./install-kubectl.sh
. ./install-docker.sh
. ./install-minikube.sh
. ./install-maven.sh
. ./install-nodejs.sh
. ./setup-challenge-website.sh
. ./setup-misc.sh

try() {
  $1 > /tmp/provision.out.txt
  if [ $? -ne 0 ]; then \ 
    echo 'Error while setting up VM!'; \ 
    cat /tmp/provision.out.txt; \ 
    exit 1; \ 
  fi
}

echo '[1/7] Installing kubectl...'
try install_kubectl

echo '[2/7] Installing docker...'
try install_docker

echo '[3/7] Installing minikube...'
try install_minikube

echo '[4/7] Installing maven...'
try install_maven

echo '[5/7] Installing node.js...'
try install_nodejs

echo '[6/7] Setting up challenge website...'
try setup_challenge_website

echo '[7/7] Doing some little tweaks...'
try setup_misc

echo
echo 'Done! In order to connect to the VM shell, use "vagrant ssh"'