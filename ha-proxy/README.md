# HA-Proxy

Configurations and more for running the HAProxy container in our application challenge.

# Run the container

You can run the haproxy container using the docker-compose.yml file provided.

```sh
# Make sure that you are in the parent folder of this directory
$ docker-compose up

# Verify that you can reach the API through the proxy
# An automatic https upgrade will also be forced using a 301 redirect
$ curl "http://localhost/hello-resteasy" -v -L
```

HTTP request logs will be shown in stdout of the container.

# HTTPS

As the self-signed certificate we use is not verified by a known Certificate Authority (CA) you need to add it to your local trusted certificates manually. Check out the following links to find out how it works on your OS:
- [Windows](https://support.securly.com/hc/en-us/articles/360026808753-How-to-manually-install-the-Securly-SSL-certificate-on-Windows)
- [MacOS](https://superuser.com/questions/1359755/trust-self-signed-cert-in-chrome-macos-10-13)
- [Linux](https://tarunlalwani.com/post/self-signed-certificates-trusting-them/)

If you want to generate a new certificate please see [generate-ssl-certificate.sh](./generate-ssl-certificate.sh) on how this can be scripted.

## Explainations

### server.key

The private key used for encryption with this corresponding certificate. This key __must never be publicly available__ in a production environment.

### server.crt

This is the actual certificate file generated using the [server.key](./server.key) as an input. It contains information about  the certificate owner including its Issuer and the domain its valid for.

To see plaintext information in your console run:
```sh
$ openssl x509 -text -noout -in server.crt
```

### server.pem

This file is the result of concatenating the [server.key](./server.key) and [server.crt](./server.crt). It is referenced by the HAProxy configuration.
