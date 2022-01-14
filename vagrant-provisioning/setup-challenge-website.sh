#!/bin/sh
setup_challenge_website() {
  OLD_PWD=$(pwd)
  rm -rf /opt/challenge-website &&
  cp -r /vagrant/challenge-website /opt/challenge-website &&
  cd /opt/challenge-website &&

  npm ci &&
  
  cd $OLD_PWD &&

  # Configure node server as daemon
  cp ./challenge-website.service /etc/systemd/system/challenge-website.service &&
  systemctl daemon-reload &&
  systemctl start challenge-website.service &&
  systemctl -q enable challenge-website.service
}