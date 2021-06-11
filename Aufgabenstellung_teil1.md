# Container Challenge

## Vorbereitung und Infos
<br>
<li> Um Ihr Setup überprüfen zu können folgen Sie den Anweisungen unter <b>"How to start REST API with HAProxy"</b> in der README Datei im Rootdirectory. Nach dem Abschluss des Tutorials sollten Sie beim Aufruf des Servers den Code 503 erhalten.<br>
<li> Wenn docker-compose Fehlschlägt -> container löschen, Docker neustarten und README Schritt 1 und 2 erneut durchführen.<br>
<li> Um Probleme zu verhindern, sollte der Container nach jeder Aufgabe gelöscht und neu gebuildet werden. <br>
<li> <b>Bei der Verwendung von Firefox kann es zu Problemen kommen. Wenn vorhanden Testen Sie das Ergebnis mit einen andern Browser (z.B.: Edge/Chrome)</b><br><br>

## Mission Teil 1
<br>
Willkommen zu Ihrer ersten Mission, starten wir mit einem kleinen Training im docker-compose File: <br><br>

<li> Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen, stellen Sie dafür beim HAProxy den richtigen Backend Port für die API ein und machen Sie diesen von dem Port 80 von außen erreichbar. <br> 
Zum Testen rufen sie localhost/missions mit einem Browser auf. Der Aufruf sollte ein leeres Ergebnis enthalten.<br><br>

<li> Können Sie nun den Server erreichen, stellen Sie die Sicherheit der Kommunikation sicher. Dafür implementieren Sie einen http auf https redirect für den HAProxy auf dem port 443. Passen sie dafür die HAProxy Konfigurationen an. <br>
Zum Testen rufen Sie localhost:443/missions mit ihrem Browser auf. Sie sollten automatisch auf eine https Verbindung umgeleitet werden.<br><br>

<li>Als letzte Trainingseinheit sollen Sie nun Daten auf den Server anzeigen lassen. Verwenden sie dafür die im Pfad "\db\postgres\initdb" vorhandenen SQL-Scripts. 
<br>Zum Testen rufen Sie localhost/missions mit ihrem Browser auf. Nun sollten Sie die Missionsdaten der Datenbank angezeigt bekommen.<br><br>

# Interne Anmerkungen
(Beschreibung wo welche Datein/Komponenten zu finden sind) evtl. später hinzufügen