# container-application-challenge
SPR5G1 Studienprojekt für gepardec

## Setup

Bevor Sie mit der Challenge starten können, ist es notwendig die untenstehende Setup-Anleitung durchzugehen.

### Vagrant

Die container-application-challenge läuft in einer kleinen Vagrant-VM. Um diese VM starten zu können, ist eine Installation von [Vagrant](https://www.vagrantup.com/downloads) notwendig.

<https://www.vagrantup.com/downloads>

Für Vagrant wird auch eine Installation von [VirtualBox](https://www.virtualbox.org/wiki/Downloads) benötigt.

<https://www.virtualbox.org/wiki/Downloads>

### GitHub Repository clonen

Das Vagrantfile, mit dem die VM gestartet wird, sowie alle benötigten Dateien für die Challenge befinden sich in diesem GitHub-Repository.

https://github.com/gepardec/container-application-challenge

Um die Challenge zu starten, forken Sie das Repository.

Navigieren Sie zum lokalen Ordner, wo sie die Challenge ausführen wollen, und clonen Sie Ihren Fork.

### Starten und Konfiguration von Vagrant

Navigieren Sie zu Ihrem lokalen Repository.

```bash
cd container-application-challenge
```

Führen Sie dort `vagrant up` in einem Terminal Ihrer Wahl aus. Die VM sollte starten und sich automatisch konfigurieren. Der Projekt-Ordner wird in der VM unter dem Pfad /vagrant gemountet.

Falls Sie unter Windows Probleme mit dem Starten der VM haben, kann es notwendig sein, die Hyper-V Virtualisierung auf Ihrem System zu deaktivieren. Dokumentation dazu finden Sie in den [Microsoft Hyper-V Docs](https://docs.microsoft.com/en-us/troubleshoot/windows-client/application-management/virtualization-apps-not-work-with-hyper-v).

Dies kann einige Zeit in Anspruch nehmen, die hauptsächlich von Ihrer Downloadgeschwindigkeit abhängt. Bei 20 MBit/s können Sie mit ungefähr 30 Minuten rechnen. Der Konsolenoutput weist Sie darauf hin, wenn das Setup fertig ist.

Überprüfen Sie, ob Ihr Setup erfolgreich war, indem Sie die challenge website in einem Webbrowser auf Ihrem lokalen System öffnen ([http://localhost:3000](http://localhost:3000)).

Um sich mit der VM zu verbinden und darin zu arbeiten, führen Sie folgenden Befehl aus:

```bash
vagrant ssh
```

Alle nachfolgenden Kommandos müssen in der virtuellen Maschine ausgeführt werden.

### Setup von Docker Compose

Eine fertig kompilierte Java-Applikation ist im Repository enthalten, um das Setup einfacher und schneller zu gestalten.

1. Führen Sie `docker-compose up --build` im Ordner /vagrant aus. Dieses Kommando baut die benötigten Docker-Container und läuft im aktuellen Terminal. Wenn Sie den Prozess in Ihrem Terminal stoppen, werden auch die Container gestoppt.
2. Die Applikation läuft nun innerhalb der VM unter [http://localhost:443](http://localhost:443)

Wenn Sie Änderungen an der Docker-Konfiguration vorgenommen haben, führen Sie folgendes Kommando aus, um die Container neu zu bauen:
`docker-compose up --build`

Mit diesem Setup sind Sie bereit, den ersten Teil der Challenge zu starten. Die Anleitung hierfür finden Sie auf der [challenge website](http://localhost:3000/compose-challenges-1.html).
Sie können aber auch gleich mit dem Kubernetes-Setup weitermachen.

### Starten und Konfigurieren von minikube

Dieser Teil des Setup wird nur für den Kubernetes-Teil der Challenge benötigt.

Um das Kubernetes-Cluster zu starten, führen Sie folgenden Befehl aus:

```bash
minikube start
```

Nach dem Starten von minikube müssen einige Konfigurationen am Cluster vorgenommen werden. Hierfür wird ein Skript bereitgestellt.
Führen Sie das Skript mit diesem Befehl aus:

```bash
/vagrant/minikube-setup.sh
```

Das Skript umfasst die folgenden Schritte:

1. Aktivieren des minikube ingress addon.
2. Deaktivieren der TLS CA Verifikation, um ein selbstgezeichnetes Zertifikat zu erlauben.
3. Anwenden von mehreren k8s Konfigurationsdateien.
4. Erstellung des TLS secret.

Die folgenden Dateien sind nach dem Setup nicht sofort anwendbar und müssen zuerst korrekt konfiguriert werden.

- ingress.yaml
- api.service.yaml
- database-credentials.yaml

Das Setup sollte jetzt fertig sein, und Sie können mit der Challenge starten.
Folgen Sie den Anweisungen auf der [challenge website](http://localhost:3000/).
Änderungen an den Konfigurationsdateien können außerhalb der Vagrant-VM gemacht werden, da der Ordner in der VM gemountet ist.

## Challenges

Die Challenge-Anleitungen finden Sie in [docs/challenges](docs/challenges) oder auf der [challenge website](http://localhost:3000/).

Es gibt momentan 3 Challenge-Anleitungen:

1. [Setup mit Docker-Compose](docs/challenges/1_Setup-Mit-Docker-Compose.md)
2. [K8s Deployment ohne Downtime](docs/challenges/2_K8s-Deployment-Ohne-Downtime.md)
3. [Cluster Setup](docs/challenges/3_Cluster-Setup.md)

## Abgeben Ihrer Lösung

Wenn Sie mit der Challenge fertig sind, erstellen Sie einen pull request von Ihrem Fork auf das Hauptrepository.
In Ihrem Interview mit gepardec haben Sie die Möglichkeit, auf Ihre Lösung einzugehen.

## Cleanup

Mit dem Kommando `vagrant destroy` wird die Vagrant-VM von ihrem lokalen System entfernt.