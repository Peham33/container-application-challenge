#!/bin/sh
install_nodejs() {
  echo 'update-notifier=false' >> ~/.npmrc &&
  curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - &&
  apt-get install -y nodejs &&
  npm install -g npm &&
  npm config set update-notifier true
}