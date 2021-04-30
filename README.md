# container-application-challenge
SPR4G1 Studienprojekt für gepardec

## How to start REST API with HAProxy
1. Run `mvnw package` in ./app
2. Run `docker-compose up --build` in root directory
3. Import the self-signed ssl certificate on your local system
    - [Windows](https://support.securly.com/hc/en-us/articles/360026808753-How-to-manually-install-the-Securly-SSL-certificate-on-Windows)
    -  [MacOS](https://superuser.com/questions/1359755/trust-self-signed-cert-in-chrome-macos-10-13)
    - [Linux](https://tarunlalwani.com/post/self-signed-certificates-trusting-them/)
4. The application is now running under [https://localhost:443](https://localhost:443)
5. If the backend has not changed, running `docker-compose up` is enough
