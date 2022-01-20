# Vorbereitung
Bevor sie den zweiten Teil starten führen Sie alle Schritte, die in der [README](../../README.md) Datei beschrieben sind, durch. Danach können Sie sich mit ihrem Hostsystem auf <http://localhost:3000> verbinden, dort finden Sie die Validierungen für die einzelnen Schritte und können somit Ihr Ergebnis nach jedem Teilschritt überprüfen.


# Docker Compose Szenario

## API

> Willkommen, Agent!
> 
> Hier startet Ihre erste Trainings-Mission. Wir beginnen mit einer Aufgabe zu [docker-compose](https://docs.docker.com/compose/).
> 
> Sie arbeiten dabei auf einer Testinstanz unseres **Agenten-Verwaltung-Systems**. Es speichert und verwaltet unsere Agenten sowie deren Missionen in einer Datenbank und ermöglicht den Zugriff über eine REST-API.
> Damit ein sicherer Zugriff möglich ist, verwenden wir einen Reverse-Proxy zur Terminierung von SSL Verbindungen, der Aufrufe anschließend an unsere API weiterleitet.

![Zugriffs Ablauf](../access-flow-diagram.svg)

- Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen. Stellen Sie dafür mithilfe einer Umgebungsvariable den richtigen Backend-Port für die API ein. Den Backend-Port finden Sie im Dockerfile der API ([app/src/main/docker/Dockerfile.jvm](../../app/src/main/docker/Dockerfile.jvm)). Machen Sie diesen von dem Port 80 von außen erreichbar. (<https://www.haproxy.com/de/blog/the-four-essential-sections-of-an-haproxy-configuration/>)

Zum Testen rufen Sie das folgende Kommando in der VM auf: 

```curl -L -i "http://localhost:80/missions"```

Der Aufruf sollte ein leeres Ergebnis mit dem Status Code 504 enthalten.

## HA Proxy

> Sehr gut, Agent. Die erste Hürde haben Sie gemeistert.
> 
> Sie verstehen sicherlich, dass Sicherheit für unsere Agenten unsere höchste Priorität hat. Stellen Sie daher sicher, dass jede Kommunikation verschlüsselt stattfindet, auch wenn sie versehentlich unverschlüsselt begonnen wird.

Implementieren Sie einen http auf https Redirect für den HAProxy auf den Port 443. Der Redirect sollte den http-Code 301 zurückgeben. Passen Sie dafür die HAProxy Konfigurationen an ([/ha-proxy/haproxy.cfg](../../ha-proxy/haproxy.cfg)).

Zum Testen rufen Sie wieder das folgende Kommando in der VM auf:

```curl -L -i "http://localhost:80/missions"```

Es sollte ein 301 Moved Permanently zurückgegeben werden. (<https://www.haproxy.com/de/blog/redirect-http-to-https-with-haproxy/>)

## Datenbank

> Nun, da Sie eine sichere Verbindung garantiert haben, können wir endlich Daten über unsere Agenten und Missionen ausliefern.

Als letzte Trainingseinheit sollen Sie Daten auf dem Server anzeigen lassen. Verwenden Sie dafür die im Pfad ([/vagrant/db/postgres/initdb](../../db/postgres/initdb)) vorhandenen SQL-Scripts.

Die Testdaten sollen automatisch eingespielt werden, wenn die Datenbank das erste Mal gestartet wird. (<https://onexlab-io.medium.com/docker-compose-postgres-initdb-ba0021deef76>)

Zum Testen rufen Sie abermals das folgende Kommando in der VM auf:

```curl -L -i "http://localhost:80/missions"``` 

Nun sollten Sie die Missionsdaten der Datenbank angezeigt bekommen.

## Erfolg

> Herzlichen Glückwunsch, Agent!
> 
> Sie haben das Training herausragend gemeistert und sind bereit, unser Produktivsystem zu konfigurieren.
> 
> Begeben Sie sich nun zum [Kubernetes-System](./3_Cluster-Setup.md).
