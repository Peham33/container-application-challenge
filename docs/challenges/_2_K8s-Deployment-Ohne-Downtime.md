# Kubernetes - Deployment ohne Downtime

## Szenario

Der Kubernetes Cluster mit der Applikation läuft einwandfrei und unsere Spione absolvieren jede Ihrer Missionen erfolgreich.

Es steht eine neue Version der API zur Verfügung, die den Spionen dringend benötigte Funktionalität bietet. Wir wollen sie so schnell wie möglich upgraden ohne den laufenden Betrieb zu stören.

## Aufgabenstellung

__Beantworte:__ Wie kann man ein Deployment ohne Downtime in Kubernetes realisieren? Was sind Vor- und Nachteile der einzelnen Möglichkeiten?

Ergänze deine Antwort hier:

```
Zwei gängige Methoden für Deployment ohne Downtime sind einerseits ein Blue/Green-Deployment oder ein Rolling-Update.

Ein Blue/Green-Deployment dupliziert eine bestehende Deployment-Konfiguration und aktualisiert dabei die Version der Applikation. 
Nachdem Healthchecks erfolgreich durchlaufen und alle Pods gestartet sind, kann das Service auf das neue Deployment umgestellt werden (zB durch Änderung des selection Labels auf den neuen Commit Hash).

Vorteile sind, dass alle Pods auf einmal umgestellt werden und, wenn das alte Deployment noch nicht gelöscht wurde, jederzeit zurückgewechselt werden kann. Dafür ist ein höherer Ressourcenaufwand notwendig.

Beim Rolling-Update wird eine bestehende Deployment-Konfiguration aktualisiert und auf den Cluster angewandt.
Nach und nach werden neue Pods gestartet und alte abgeschaltet, bis ausschließlich neue Pods laufen. 

Ein Vorteil ist, dass das Deployment ressourcenschonender ist und automatisiert abläuft. Dafür muss unbedingt auf Rückwärtskompatibilität geachtet werden, denn alte und neue Versionen laufen gleichzeitig.
```

---
**Hinweis:**

Für die Bewältigung dieser Challenge ist nicht notwendigerweise eine Implementierung gefordert. Es reicht eine theoretische Beantwortung.

---
