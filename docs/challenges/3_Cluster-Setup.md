# Kubernetes Cluster Setup

## Szenario

Sehr gut, wie wir sehen haben Sie das Training erfolgreich abgeschlossen, da Sie nun anscheinend die Grundlagen beherrschen können wir uns sicher sein das Sie auch eine wichtige Mission für uns erfolgreich abschließen können.
In letzter Zeit bestanden einige Differenzen zu einem anderen Geheimdienst. Dieser hat einen Doppelagenten bei uns eingeschleust um an wichtige Informationen von unseren Missionen zu kommen. Um seine Spuren zu verwischen hat er unsere Infrastruktur beschädigt. Den Doppelagenten konnten wir inzwischen ausfindig machen, die Schäden bestehen allerdings weiter, nun liegt es an Ihnen die Infrastruktur so gut wie möglich wieder herzustellen damit wir unsere Arbeiten wieder aufnehmen können. Bei dieser Aufgabe lassen wir Sie  nicht alleine, Sie werden immer wieder Hinweise von uns bekommen, viel Glück, wir zählen auf Sie!

## Aufgabenstellung

***Diese Aufgabenstellung verbessern***

Jeder Versuch sich mit dem Ingress zu verbinden scheitert, wir glauben, dass der Doppelagent hier wichtige Codestücke entfernt hat und somit die Funktion zerstört hat.

### API reparieren

Der Eindringling hat einen Weg gefunden, Schadsoftware auf unserem System auszuführen. Diese hat die Konfiguration der API geändert.

### API Verbindung herstellen mit Ingress

Die API ist nicht mehr ansprechbar, es muss eine Möglichkeit geboten werden, diese von außerhalb des Clusters zu erreichen. Dafür sollte ein Ingress konfiguriert werden, welcher auf die API verweist. In der ingress.yaml File gibt es ein paar Einstellungen, die vorgenommen werden müssen, um die Verbindung wieder herzustellen.

### SSL Redirect - Bonuspunkt??

***Möglicherweise nicht hier?***

Tests zeigen, dass Probleme mit der Verbindungsverschlüsselung existieren. Die Verbindung läuft nicht auf https, sondern nur auf http. Finden Sie eine Lösung ein http zu https Upgrade durchzuführen.
