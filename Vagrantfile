Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.define "challenge"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
    vb.cpus = "2"
  end

  config.vm.provision "shell", inline: <<-SCRIPT

export DEBIAN_FRONTEND=noninteractive
export APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# kubectl
echo '[1/7] Installing kubectl...'
( apt-get update &&
  apt-get install -y apt-transport-https &&
  curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - &&
  echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list &&
  apt-get update && apt-get install -y kubectl
) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

# docker
echo '[2/7] Installing docker...'
( apt-get install -y ca-certificates gnupg lsb-release &&
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg &&
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null &&
  apt-get update &&
  apt-get install -y docker-ce docker-compose &&
  usermod -aG docker vagrant && newgrp docker
) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

# minikube
echo '[3/7] Installing minikube...'
( curl -sLo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 &&
  chmod +x /usr/local/bin/minikube
) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

# maven
echo '[4/7] Installing maven...'
(apt-get install -y maven) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

# node.js
echo '[5/7] Installing node.js...'
( echo 'update-notifier=false' >> ~/.npmrc &&
  curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - &&
  apt-get install -y nodejs &&
  npm install -g npm &&
  npm config set update-notifier true
) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

# challenge website
echo '[6/7] Setting up challenge website...'
( OLD_PWD=$(pwd)
  rm -rf /opt/challenge-website &&
  cp -r /vagrant/challenge-website /opt/challenge-website &&
  cd /opt/challenge-website &&

  npm ci &&

# Configure node server as daemon
cat <<EOF >> /etc/systemd/system/challenge-website.service
[Unit]
Description=Challenge Website for verificaton
After=network.target

[Service]
Type=simple
User=vagrant
ExecStart=/usr/bin/node /opt/challenge-website/index.js
WorkingDirectory=/opt/challenge-website
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload &&
  systemctl start challenge-website.service &&
  systemctl -q enable challenge-website.service &&

  cd $OLD_PWD
) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

echo '[7/7] Doing some little tweaks...'
( # Allow root to use minikube configuration of vagrant user
  ln -s /home/vagrant/.kube /root/.kube &&

  # install self-signed certificate
  cp /vagrant/ha-proxy/server.crt /usr/local/share/ca-certificates/ &&
  update-ca-certificates &&

  # change directory automatically when opening a new shell
  echo 'cd /vagrant' >> /home/vagrant/.bashrc &&

  # install tools for yaml changing
  snap install yq &&
  apt-get install moreutils -y &&

  # Default IP for Minikube
  echo "192.168.49.2 challenge.test" >> /etc/hosts &&

  # Change default directory when opening a new shell
  echo 'cd /vagrant' >> /home/vagrant/.bashrc
) &> /tmp/provision.out.txt
if [ $? -ne 0 ]; then \ 
  echo 'Error'; \ 
  cat /tmp/provision.out.txt; \ 
  exit 1; \ 
fi

echo
echo 'Done! In order to connect to the VM shell, use "vagrant ssh"'
SCRIPT

end
