# Vorbereitung
Bevor sie den zweiten Teil starten führen Sie alle Schritte, die in der [README](../../README.md) Datei beschrieben sind, durch. Danach können Sie sich mit ihrem Hostsystem auf <http://localhost:5000> verbinden, dort finden sie die Validierungen für die einzelnen Schritte und können somit Ihr Ergebniss nach jedem Teilschritt überprüfen. 

# Kubernetes Cluster Szenario

Sehr gut! Wie wir sehen haben Sie das Training erfolgreich abgeschlossen. Da Sie nun die Grundlagen beherrschen können wir uns sicher sein, dass Sie auch eine wichtige Mission für uns erfolgreich abschließen können.

In letzter Zeit bestanden einige Differenzen zu einem anderen Geheimdienst. Dieser hat einen Doppelagenten bei uns eingeschleust, um an wichtige Informationen von unseren Missionen zu kommen. Um seine Spuren zu verwischen, hat er unsere Infrastruktur beschädigt. 

Den Doppelagenten konnten wir inzwischen ausfindig machen, die Schäden bestehen allerdings weiter. Nun liegt es an Ihnen die Infrastruktur so gut wie möglich wieder herzustellen, damit wir unsere Arbeiten wieder aufnehmen können. Bei diesen Aufgaben lassen wir Sie nicht alleine. Sie werden immer wieder Hinweise von uns bekommen. 

Viel Glück, wir zählen auf Sie!
# API

Nicht nur der Ingress konnte nicht mehr erreicht werden, sondern auch die API wurde in Mitleidenschaft gezogen. Bei dem Versuch die Schnittstelle zu erreichen wird immer ein 503 Error Service Temporarily unavailable geliefert. Um den Fehler zu beheben müssen Sie einen API Service erstellen, welcher über den Port 8080 erreichbar ist.  

Der Doppelagent hat außerdem Sicherheitslücken in unseren Konfigurationen hinterlassen. Um unser System sicherer zu machen, sollten Sie unsere Applikation 
mit Datenbank credentials erweitern.

# Ingress

Jeder Versuch sich mit dem Ingress zu verbinden scheitert, konfigurieren Sie die ingress.yaml Datei so, dass es wieder möglich ist sich mit dem Host challenge.test über den API Service den Sie zuvor konfiguriert haben zu verbinden. 
Außerdem soll ein https Upgrade durchgeführt werden.

# Datenbank

Ausgezeichnet! Unsere Applikation funktioniert wieder und unsere Agenten können Ihre Informationen wieder sicher und verlässlich teilen.

Allerdings gibt es noch ein Problem: Mehrere Nutzer haben berichtet, dass Ihre Daten nach einem Wartungsfenster verschwunden sind. Sorgen Sie dafür, dass bei einem Neustart der Datenbank keine Daten mehr verloren gehen! Ergänzen Sie dazu das Datenbank Deployment um einen Volume Claim. 