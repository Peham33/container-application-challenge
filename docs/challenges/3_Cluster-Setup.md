# Kubernetes Cluster Setup

## Szenario

Sehr gut! Wie wir sehen haben Sie das Training erfolgreich abgeschlossen. Da Sie nun die Grundlagen beherrschen können wir uns sicher sein, dass Sie auch eine wichtige Mission für uns erfolgreich abschließen können.

In letzter Zeit bestanden einige Differenzen zu einem anderen Geheimdienst. Dieser hat einen Doppelagenten bei uns eingeschleust, um an wichtige Informationen von unseren Missionen zu kommen. Um seine Spuren zu verwischen, hat er unsere Infrastruktur beschädigt. 

Den Doppelagenten konnten wir inzwischen ausfindig machen, die Schäden bestehen allerdings weiter. Nun liegt es an Ihnen die Infrastruktur so gut wie möglich wieder herzustellen, damit wir unsere Arbeiten wieder aufnehmen können. Bei dieser Aufgabe lassen wir Sie nicht alleine. Sie werden immer wieder Hinweise von uns bekommen. 

Viel Glück, wir zählen auf Sie!

## Aufgabenstellung

***Diese Aufgabenstellung verbessern***

Jeder Versuch sich mit dem Ingress zu verbinden scheitert, wir glauben, dass der Doppelagent hier wichtige Codestücke entfernt hat und somit die Funktion zerstört hat.

### API reparieren

Der Eindringling hat einen Weg gefunden, Schadsoftware auf unserem System auszuführen. Diese hat einen Teil unserer Konfiguration gelöscht.

### API Verbindung herstellen mit Ingress

Die API ist nicht mehr ansprechbar, es muss eine Möglichkeit geboten werden, diese von außerhalb des Clusters zu erreichen. Dafür sollte ein Ingress konfiguriert werden, welcher auf die API verweist. In der ingress.yaml File gibt es ein paar Einstellungen, die vorgenommen werden müssen, um die Verbindung wieder herzustellen.

### SSL Redirect - Bonuspunkt??

***Möglicherweise nicht hier?***

Tests zeigen, dass Probleme mit der Verbindungsverschlüsselung existieren. Die Verbindung läuft nicht auf https, sondern nur auf http. Finden Sie eine Lösung ein http zu https Upgrade durchzuführen.

### Daten Persistenz ist korrupt

Ausgezeichnet! Unsere Applikation funktioniert wieder und unsere Agenten können Ihre Informationen wieder sicher und verlässlich teilen.

Allerdings gibt es noch ein Problem: Mehrere Nutzer haben berichtet, dass Ihre Daten nach einem Wartungsfenster verschwunden sind. Untersuchen Sie dieses Phänomen und sorgen Sie dafür, dass bei einem Neustart der Datenbank keine Daten mehr verloren gehen!

### Sicherheit
Die Konfigurationen unserer API und Datenbank haben eine Sicherheitslücke. Sie dir genau an, wie die Datenbankzugangsdaten in den Deployments gemountet werden und versuche dies besser zu gestalten. 