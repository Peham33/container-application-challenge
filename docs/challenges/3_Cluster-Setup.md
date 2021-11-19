# Vorbereitung
Bevor sie den zweiten Teil starten führen Sie alle Schritte, die in der README Datei beschrieben sind, durch. Danach können Sie sich mit ihrem Hostsystem auf http://localhost:5000 verbinden, dort finden sie die Validierungen für die einzelnen Schritte und können somit Ihr Ergebniss überprüfen. 

# Kubernetes Cluster Szenario

Sehr gut! Wie wir sehen haben Sie das Training erfolgreich abgeschlossen. Da Sie nun die Grundlagen beherrschen können wir uns sicher sein, dass Sie auch eine wichtige Mission für uns erfolgreich abschließen können.

In letzter Zeit bestanden einige Differenzen zu einem anderen Geheimdienst. Dieser hat einen Doppelagenten bei uns eingeschleust, um an wichtige Informationen von unseren Missionen zu kommen. Um seine Spuren zu verwischen, hat er unsere Infrastruktur beschädigt. 

Den Doppelagenten konnten wir inzwischen ausfindig machen, die Schäden bestehen allerdings weiter. Nun liegt es an Ihnen die Infrastruktur so gut wie möglich wieder herzustellen, damit wir unsere Arbeiten wieder aufnehmen können. Bei diesen Aufgaben lassen wir Sie nicht alleine. Sie werden immer wieder Hinweise von uns bekommen. 

Viel Glück, wir zählen auf Sie!

# Ingress

Jeder Versuch sich mit dem Ingress zu verbinden scheitert, konfigurieren Sie die Datei so, dass dies wieder möglich ist.

# API

## API reparieren

Nicht nur der Ingress konnte nicht mehr erreicht werden, sondern auch die API wurde in Mitleidenschaft gezogen. Bei dem Versuch die Schnittstelle zu erreichen wird immer ein 503 Error Service Temporarily unavailable geliefert. Um den Fehler zu beheben müssen Sie einen Service erstellen.   

Der Doppelagent hat Sicherheitslücken in unseren Konfigurationen hinterlassen. Finden Sie einen Weg wie man die Datenbankzugangsdaten sicher verwalten kann ohne diese nach außen sichtbar zu machen.

# Datenbank

Ausgezeichnet! Unsere Applikation funktioniert wieder und unsere Agenten können Ihre Informationen wieder sicher und verlässlich teilen.

Allerdings gibt es noch ein Problem: Mehrere Nutzer haben berichtet, dass Ihre Daten nach einem Wartungsfenster verschwunden sind. Untersuchen Sie dieses Phänomen und sorgen Sie dafür, dass bei einem Neustart der Datenbank keine Daten mehr verloren gehen!

# Interne Anmerkungen
***Vor fertigstellung entfernen***

### SSL Redirect - Bonuspunkt??

Tests zeigen, dass Probleme mit der Verbindungsverschlüsselung existieren. Die Verbindung läuft nicht auf https, sondern nur auf http. Finden Sie eine Lösung ein http zu https Upgrade durchzuführen.