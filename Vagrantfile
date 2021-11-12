Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.network "forwarded_port", guest: 443, host: 443
  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
    vb.cpus = "2"
  end

  config.vm.provision "shell", inline: <<-SCRIPT

# kubectl
apt-get update && apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list
apt-get update
apt-get install -y kubectl

# docker
apt-get install -y ca-certificates gnupg lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-compose
usermod -aG docker vagrant && newgrp docker

# minikube
curl -Lo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x /usr/local/bin/minikube

# maven
apt-get install -y maven

# node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs



# challenge website
OLD_PWD=$(pwd)
rm -rf /opt/challenge-website
cp -r /vagrant/challenge-website /opt/challenge-website
cd /opt/challenge-website

npm ci

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
systemctl daemon-reload
systemctl start challenge-website.service 
systemctl enable challenge-website.service 

# Allow root to use minikube configuration of vagrant user
ln -s /home/vagrant/.kube /root/.kube 
cd $OLD_PWD

# install self-signed certificate
cp /vagrant/ha-proxy/server.crt /usr/local/share/ca-certificates/
update-ca-certificates

# change directory automatically when opening a new shell
echo 'cd /vagrant' >> /home/vagrant/.bashrc

# install tools for yaml changing
snap install yq
apt-get install moreutils -y

# Default IP for Minikube
echo "192.168.49.2 challenge.test" >> /etc/hosts

SCRIPT

end
