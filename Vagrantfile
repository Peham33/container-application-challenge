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
apt-get update >/dev/null && apt-get install -y apt-transport-https >/dev/null
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - >/dev/null
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list >/dev/null
apt-get update >/dev/null
apt-get install -y kubectl >/dev/null

# docker
echo '[2/7] Installing docker...'
apt-get install -y ca-certificates gnupg lsb-release >/dev/null
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg >/dev/null
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update >/dev/null
apt-get install -y docker-ce docker-compose >/dev/null
usermod -aG docker vagrant >/dev/null && newgrp docker >/dev/null

# minikube
echo '[3/7] Installing minikube...'
curl -sLo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 >/dev/null
chmod +x /usr/local/bin/minikube >/dev/null

# maven
echo '[4/7] Installing maven...'
apt-get install -y maven >/dev/null

# node.js
echo '[5/7] Installing node.js...'
echo 'update-notifier=false' >> ~/.npmrc
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - >/dev/null
apt-get install -y nodejs >/dev/null
npm install -g npm >/dev/null
npm config set update-notifier true

# challenge website
echo '[6/7] Setting up challenge website...'
OLD_PWD=$(pwd)
rm -rf /opt/challenge-website >/dev/null
cp -r /vagrant/challenge-website /opt/challenge-website >/dev/null
cd /opt/challenge-website >/dev/null

npm ci >/dev/null

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
systemctl daemon-reload >/dev/null
systemctl start challenge-website.service >/dev/null
systemctl -q enable challenge-website.service >/dev/null

echo '[7/7] Doing some little tweaks...'
# Allow root to use minikube configuration of vagrant user
ln -s /home/vagrant/.kube /root/.kube >/dev/null
cd $OLD_PWD >/dev/null

# install self-signed certificate
cp /vagrant/ha-proxy/server.crt /usr/local/share/ca-certificates/ >/dev/null
update-ca-certificates >/dev/null

# change directory automatically when opening a new shell
echo 'cd /vagrant' >> /home/vagrant/.bashrc

# install tools for yaml changing
snap install yq >/dev/null
apt-get install moreutils -y >/dev/null

# Default IP for Minikube
echo "192.168.49.2 challenge.test" >> /etc/hosts

# Change default directory when opening a new shell
echo 'cd /vagrant' >> /home/vagrant/.bashrc

echo
echo 'Done! In order to connect to the VM shell, use "vagrant ssh"'
SCRIPT

end
