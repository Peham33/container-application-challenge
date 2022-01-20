Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.define "challenge"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
    vb.cpus = "2"
  end

  # install docker using the vagrant provisioner and preload required images
  config.vm.provision "docker",
    images: ["postgres:alpine", "haproxy:2.3-alpine"]

  config.vm.provision "file", source: "./vagrant-provisioning", destination: "/tmp/vagrant-provisioning"

  config.vm.provision "shell", inline: <<-SCRIPT
    cd /tmp/vagrant-provisioning && chmod +x *.sh && sh provision.sh
  SCRIPT
end
