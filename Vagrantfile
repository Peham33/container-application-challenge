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
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl

# docker
sudo apt-get install -y ca-certificates gnupg lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-compose
sudo usermod -aG docker vagrant && newgrp docker

# minikube
sudo curl -Lo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x /usr/local/bin/minikube

# maven
sudo apt-get install -y maven

# node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs



# challenge website
OLD_PWD=$(pwd)
rm -rf /opt/challenge-website
cp -r /vagrant/challenge-website /opt/challenge-website
cd /opt/challenge-website

npm install
npm install -g forever
forever start .

# Allow root to use minikube configuration of vagrant user
ln -s /home/vagrant/.kube /root/.kube 
cd $OLD_PWD

# install self-signed certificate
sudo cp /vagrant/ha-proxy/server.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates

# change directory automatically when opening a new shell
echo 'cd /vagrant' >> /home/vagrant/.bashrc

# install tools for yaml changing
sudo snap install yq
sudo apt-get install moreutils -y

# Default IP for Minikube
echo "192.168.49.2 challenge.test" >> /etc/hosts

SCRIPT

end
