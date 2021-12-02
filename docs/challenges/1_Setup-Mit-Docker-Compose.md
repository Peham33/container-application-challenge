# Docker-Compose Setup

## Vorbereitung und Infos

- Um Ihr Setup überprüfen zu können folgen Sie den Anweisungen unter __"How to start REST API with HAProxy"__ in der [README.md](./README.md). Nach dem Abschluss des Tutorials sollten Sie beim Aufruf des Servers den Code 503 erhalten.
- Wenn docker-compose Fehlschlägt -> container löschen, Docker neustarten und README Schritt 1 und 2 erneut durchführen.
- Um Probleme zu verhindern, sollte der Container nach jeder Aufgabe gelöscht und neu gebuildet werden.



## Mission Teil 1

Willkommen zu Ihrer ersten Mission, starten wir mit einem kleinen Training im docker-compose File:

- Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen, stellen Sie dafür beim docker-compose File den richtigen Backend Port für die API ein, diesen finden Sie in der haproxy.cfg (ha-proxy/haproxy.cfg) und machen Sie diesen von dem Port 80 von außen erreichbar. (<https://www.haproxy.com/de/blog/the-four-essential-sections-of-an-haproxy-configuration/>) 
Zum Testen rufen sie localhost/missions mit einem Browser auf. Der Aufruf sollte ein leeres Ergebnis enthalten.

- Können Sie nun den Server erreichen, stellen Sie die Sicherheit der Kommunikation sicher. Dafür implementieren Sie einen http auf https redirect für den HAProxy auf dem port 443. Passen sie dafür die HAProxy Konfigurationen an (/ha-proxy/haproxy.cfg).
Zum Testen rufen Sie [http://localhost:443/missions]() mit ihrem Browser auf. Sie sollten automatisch auf eine https Verbindung umgeleitet werden. (<https://www.haproxy.com/de/blog/redirect-http-to-https-with-haproxy/>)


- Als letzte Trainingseinheit sollen Sie nun Daten auf den Server anzeigen lassen. Verwenden sie dafür die im Pfad "\db\postgres\initdb" vorhandenen SQL-Scripts.
Zum Testen rufen Sie [http://localhost/missions]() mit ihrem Browser auf. Nun sollten Sie die Missionsdaten der Datenbank angezeigt bekommen. (<https://dev.to/darkmavis1980/how-to-persist-data-with-docker-compose-ik8>)