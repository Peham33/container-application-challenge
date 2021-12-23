#!/bin/sh
install_minikube() {
  curl -sLo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 &&
  chmod +x /usr/local/bin/minikube
}