# Docker-Compose Setup

## Vorbereitung und Infos

- Um Ihr Setup überprüfen zu können folgen Sie den Anweisungen unter __"How to start REST API with HAProxy"__ in der [README.md](./README.md). Nach dem Abschluss des Tutorials sollten Sie beim Aufruf des Servers den Code 503 erhalten.
- Wenn docker-compose Fehlschlägt -> container löschen, Docker neustarten und README Schritt 1 und 2 erneut durchführen.
- Um Probleme zu verhindern, sollte der Container nach jeder Aufgabe gelöscht und neu gebuildet werden.
- __Bei der Verwendung von Firefox kann es zu Problemen kommen. Wenn vorhanden, testen Sie das Ergebnis mit einem anderen Browser (z.B.: Edge/Chrome)__


## Mission Teil 1

Willkommen zu Ihrer ersten Mission, starten wir mit einem kleinen Training im docker-compose File:

- Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen, stellen Sie dafür beim HAProxy den richtigen Backend Port für die API ein und machen Sie diesen von dem Port 80 von außen erreichbar.
Zum Testen rufen sie localhost/missions mit einem Browser auf. Der Aufruf sollte ein leeres Ergebnis enthalten.

- Können Sie nun den Server erreichen, stellen Sie die Sicherheit der Kommunikation sicher. Dafür implementieren Sie einen http auf https redirect für den HAProxy auf dem port 443. Passen sie dafür die HAProxy Konfigurationen an.
Zum Testen rufen Sie [http://localhost:443/missions]() mit ihrem Browser auf. Sie sollten automatisch auf eine https Verbindung umgeleitet werden.

- Als letzte Trainingseinheit sollen Sie nun Daten auf den Server anzeigen lassen. Verwenden sie dafür die im Pfad "\db\postgres\initdb" vorhandenen SQL-Scripts.
Zum Testen rufen Sie [http://localhost/missions]() mit ihrem Browser auf. Nun sollten Sie die Missionsdaten der Datenbank angezeigt bekommen.

# Interne Anmerkungen
(TODO: Beschreibung wo welche Datein/Komponenten zu finden sind) evtl. später hinzufügen
