#!/bin/sh
setup_misc() {
  # Allow root to use minikube configuration of vagrant user
  ln -s /home/vagrant/.kube /root/.kube &&

  # install self-signed certificate
  cp /vagrant/ha-proxy/server.crt /usr/local/share/ca-certificates/ &&
  update-ca-certificates &&

  # change directory automatically when opening a new shell
  echo 'cd /vagrant' >> /home/vagrant/.bashrc &&

  # install tools for yaml changing
  snap install yq &&
  apt-get install moreutils -y &&

  # install docker-compose
  apt-get install docker-compose -y &&

  # Default IP for Minikube
  echo "192.168.49.2 challenge.test" >> /etc/hosts &&

  # Change default directory when opening a new shell
  echo 'cd /vagrant' >> /home/vagrant/.bashrc
}