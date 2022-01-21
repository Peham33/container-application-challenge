# Vorbereitung
Bevor sie den zweiten Teil starten führen Sie alle Schritte, die in der [README](../../README.md) Datei beschrieben sind, durch. Danach können Sie sich mit ihrem Hostsystem auf <http://localhost:3000> verbinden, dort finden Sie die Validierungen für die einzelnen Schritte und können somit Ihr Ergebnis nach jedem Teilschritt überprüfen.

Falls Sie eine Aufgabe erfolgreich erfüllt haben, die Tests aber trotzdem fehlschlagen, dann fahren sie einfach mit der nächsten Aufgabe fort.

Falls Sie die Challenge nicht abschließen können, folgen Sie diesem Link [Abgabe](./4_Abgabe.md) für Instruktionen zur Abgabe und den weiteren Schritten.

# Kubernetes Cluster Szenario

Sehr gut! Wie wir sehen haben Sie das Training erfolgreich abgeschlossen. Da Sie nun die Grundlagen beherrschen können wir uns sicher sein, dass Sie auch diese wichtige Mission für uns erfolgreich abschließen können.

In letzter Zeit bestanden einige Differenzen zu einem anderen Geheimdienst. Dieser hat einen Doppelagenten bei uns eingeschleust, um an wichtige Informationen von unseren Missionen zu kommen. Um seine Spuren zu verwischen, hat er unsere Infrastruktur beschädigt.

Den Doppelagenten konnten wir inzwischen ausfindig machen, die Schäden bestehen allerdings weiter. Nun liegt es an Ihnen die Infrastruktur so gut wie möglich wieder herzustellen, damit wir unsere Arbeiten wieder aufnehmen können. Bei diesen Aufgaben lassen wir Sie nicht alleine. Sie werden immer wieder Hinweise von uns bekommen.

Viel Glück, wir zählen auf Sie!

# API

Bei dem Versuch die API zu erreichen, wird immer ein 503 Error Service Temporarily unavailable geliefert.

Um den Fehler zu beheben, müssen Sie ein API Service in der api.service.yaml Datei konfigurieren, welches über den Port 8080 erreichbar ist. (<https://kubernetes.io/docs/concepts/services-networking/service/>)

Der Doppelagent hat außerdem Sicherheitslücken in unseren Konfigurationen hinterlassen. Um unser System sicherer zu machen, sollten Sie unsere Applikation mit Datenbank-Credentials erweitern. Übernehmen Sie dafür die Key-Value Pairs DB_USERNAME und DB_PASSWORD aus der Api Configmap in ein Kubernetes Secret und binden Sie dieses als Umgebungvariable in die Deployments ein. (<https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/>)

# Ingress

Scheinbar haben unsere Feinde ganze Arbeit geleistet. Die angerichteten Schäden sind doch schlimmer als befürchtet.

Konfigurieren Sie den Ingress Server so, dass dieser wieder erreichbar ist.

Jeder Versuch sich mit dem Ingress zu verbinden scheitert. Konfigurieren Sie die ingress.yaml Datei so, dass es wieder möglich ist sich mit dem Host challenge.test über den API Service, den Sie zuvor konfiguriert haben, zu verbinden. (<https://kubernetes.io/docs/concepts/services-networking/ingress/>)
Die Api soll auf dem Path '/' erreichbar sein.

Außerdem soll ein https Upgrade durchgeführt werden. Verwende dazu das vorkonfiguriertes TLS Secret `challenge-test-tls`. (<https://kubernetes.io/docs/concepts/services-networking/ingress/#tls>)

# Datenbank

Ausgezeichnet! Unsere Applikation funktioniert und unsere Agenten können Ihre Informationen wieder sicher und verlässlich teilen.

Allerdings gibt es noch ein Problem: Mehrere Nutzer haben berichtet, dass Ihre Daten nach einem Wartungsfenster verschwunden sind!

Bitte helfen Sie uns ein letztes Mal, Agent!

Sorgen Sie dafür, dass bei einem Neustart der Datenbank keine Daten mehr verloren gehen!

Ergänzen Sie dazu das Datenbank Deployment um einen Volume Claim. ([Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/))

# Abschluss

Gratulation, Sie haben die Challenge abgeschlossen!
Wenn Sie bereit sind ihre Ergebnisse mit uns zu teilen, folgen sie den Anweisungen [hier](./4_Abgabe.md).