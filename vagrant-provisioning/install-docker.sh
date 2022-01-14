#!/bin/sh
install_docker() {
  apt-get install -y ca-certificates gnupg lsb-release &&
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg &&
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null &&
  apt-get update &&
  apt-get install -y docker-ce docker-compose &&
  usermod -aG docker vagrant && newgrp docker
}