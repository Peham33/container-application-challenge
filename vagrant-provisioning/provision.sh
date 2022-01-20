#!/bin/sh
export DEBIAN_FRONTEND=noninteractive
export APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

. ./install-kubectl.sh
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

echo '[1/6] Installing kubectl...'
try install_kubectl

echo '[2/6] Installing minikube...'
try install_minikube

echo '[3/6] Installing maven...'
try install_maven

echo '[4/6] Installing node.js...'
try install_nodejs

echo '[5/6] Setting up challenge website...'
try setup_challenge_website

echo '[6/6] Doing some little tweaks...'
try setup_misc

echo
echo 'Done! In order to connect to the VM shell, use "vagrant ssh"'
